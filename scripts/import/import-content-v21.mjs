import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const CATALOG_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V21.xlsx",
);

const PRODUCTS_PATH = path.join(
  ROOT,
  "data",
  "products.ts",
);

const GUIDES_PATH = path.join(
  ROOT,
  "data",
  "guides.ts",
);

const COMPARISONS_PATH = path.join(
  ROOT,
  "data",
  "comparisons.ts",
);

const BACKUP_DIR = path.join(
  ROOT,
  "catalog",
  "backups",
);

const DRY_RUN =
  process.argv.includes("--dry-run");

const VALID_TYPES = new Set([
  "guia",
  "comparativa",
]);

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeSlug(value) {
  return normalizeText(value)
    .replace(/\s+/g, "-");
}

function readExcelContent() {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(
      `No existe el catálogo maestro: ${CATALOG_PATH}`,
    );
  }

  const workbook =
    XLSX.readFile(CATALOG_PATH);

  const sheet =
    workbook.Sheets["IMPORT_CONTENT"];

  if (!sheet) {
    throw new Error(
      'No existe la hoja "IMPORT_CONTENT" en el catálogo maestro.',
    );
  }

  return XLSX.utils
    .sheet_to_json(sheet, {
      defval: "",
    })
    .map((row) => ({
      contentId: String(
        row.content_id ?? "",
      ).trim(),

      type: String(
        row.type ?? "",
      )
        .trim()
        .toLowerCase(),

      slug: String(
        row.slug ?? "",
      ).trim(),

      title: String(
        row.title ?? "",
      ).trim(),

      vertical: String(
        row.vertical ?? "",
      ).trim(),

      products: String(
        row.products ?? "",
      )
        .split(",")
        .map((value) =>
          value.trim(),
        )
        .filter(Boolean),

      monetization: String(
        row.monetization ?? "",
      ).trim(),

      status: String(
        row.status ?? "",
      )
        .trim()
        .toLowerCase(),
    }));
}

function extractCatalogIds(
  productsTs,
) {
  const ids = new Set();

  const regex =
    /catalogId\s*:\s*["']([^"']+)["']/g;

  let match;

  while (
    (match = regex.exec(productsTs)) !==
    null
  ) {
    ids.add(match[1]);
  }

  return ids;
}

function extractObjectBlocks(
  content,
) {
  const objects = [];

  let depth = 0;
  let start = -1;

  let inString = false;
  let quote = "";
  let escaped = false;

  for (
    let i = 0;
    i < content.length;
    i++
  ) {
    const char = content[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        inString = false;
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) {
        start = i;
      }

      depth++;
      continue;
    }

    if (char === "}") {
      depth--;

      if (
        depth === 0 &&
        start !== -1
      ) {
        objects.push(
          content.slice(
            start,
            i + 1,
          ),
        );

        start = -1;
      }
    }
  }

  return objects;
}

function extractField(
  object,
  field,
) {
  const regex = new RegExp(
    `${field}\\s*:\\s*["']([^"']*)["']`,
  );

  const match =
    object.match(regex);

  return match
    ? match[1].trim()
    : "";
}

function extractProductIdsFromObject(
  object,
) {
  const ids = new Set();

  const regex =
    /catalogId\s*===\s*["']([^"']+)["']/g;

  let match;

  while (
    (match = regex.exec(object)) !==
    null
  ) {
    ids.add(match[1]);
  }

  return ids;
}

function extractExistingContent(
  content,
) {
  return extractObjectBlocks(content)
    .map((object) => ({
      object,
      slug: extractField(
        object,
        "slug",
      ),
      title: extractField(
        object,
        "title",
      ),
      products:
        extractProductIdsFromObject(
          object,
        ),
    }))
    .filter(
      (item) =>
        item.slug ||
        item.title,
    );
}

function sameProductSet(
  a,
  b,
) {
  if (a.size !== b.size) {
    return false;
  }

  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }

  return true;
}

function findExistingContent(
  row,
  existing,
) {
  const normalizedSlug =
    normalizeSlug(row.slug);

  const normalizedTitle =
    normalizeText(row.title);

  // 1. Slug exacto/normalizado
  const bySlug =
    existing.find(
      (item) =>
        normalizeSlug(item.slug) ===
        normalizedSlug,
    );

  if (bySlug) {
    return {
      match: bySlug,
      reason: "slug",
    };
  }

  // 2. Título normalizado
  const byTitle =
    existing.find(
      (item) =>
        normalizeText(item.title) ===
        normalizedTitle,
    );

  if (byTitle) {
    return {
      match: byTitle,
      reason: "título",
    };
  }

  // 3. Para comparativas:
  // mismos productos = mismo contenido
  if (
    row.type === "comparativa"
  ) {
    const excelProducts =
      new Set(row.products);

    const byProducts =
      existing.find((item) =>
        sameProductSet(
          item.products,
          excelProducts,
        ),
      );

    if (byProducts) {
      return {
        match: byProducts,
        reason:
          "productos comparados",
      };
    }
  }

  return null;
}

function validateRows(
  rows,
  productIds,
) {
  const errors = [];

  const contentIds = new Set();

  for (const row of rows) {
    if (!row.contentId) {
      errors.push(
        "Existe un contenido sin content_id.",
      );
    } else if (
      contentIds.has(row.contentId)
    ) {
      errors.push(
        `content_id duplicado: ${row.contentId}`,
      );
    } else {
      contentIds.add(row.contentId);
    }

    if (
      !VALID_TYPES.has(row.type)
    ) {
      errors.push(
        `${row.contentId}: type inválido "${row.type}".`,
      );
    }

    if (!row.slug) {
      errors.push(
        `${row.contentId}: slug vacío.`,
      );
    }

    if (!row.title) {
      errors.push(
        `${row.contentId}: title vacío.`,
      );
    }

    if (!row.vertical) {
      errors.push(
        `${row.contentId}: vertical vacío.`,
      );
    }

    for (const productId of row.products) {
      if (
        !productIds.has(productId)
      ) {
        errors.push(
          `${row.contentId}: producto ${productId} no existe en data/products.ts.`,
        );
      }
    }
  }

  return errors;
}

function escapeTs(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

function buildProductReference(
  productId,
) {
  return `products.find((product) => product.catalogId === "${escapeTs(
    productId,
  )}")!`;
}

function getExistingNumericIds(
  content,
) {
  const ids = [];

  const regex =
    /\bid\s*:\s*(\d+)/g;

  let match;

  while (
    (match = regex.exec(content)) !==
    null
  ) {
    ids.push(
      Number(match[1]),
    );
  }

  return ids;
}

function getNextId(
  content,
) {
  const ids =
    getExistingNumericIds(
      content,
    );

  if (!ids.length) {
    return 1;
  }

  return (
    Math.max(...ids) + 1
  );
}

function buildGuideObject(
  row,
  id,
) {
  const productReferences =
    row.products.map(
      buildProductReference,
    );

  return `  {
    id: ${id},
    title: "${escapeTs(row.title)}",
    slug: "${escapeTs(row.slug)}",
    category: "${escapeTs(row.vertical)}",
    summary: "${escapeTs(
      `${row.title}. Contenido editorial pendiente de desarrollo.`,
    )}",
    content:
      "Contenido editorial pendiente de desarrollo.",
    relatedProducts: [
${productReferences
  .map(
    (reference) =>
      `      ${reference}`,
  )
  .join(",\n")}
    ],
    relatedComparisons: [],
    publishedAt: "",
  }`;
}

function buildComparisonObject(
  row,
  id,
) {
  const productReferences =
    row.products.map(
      buildProductReference,
    );

  return `  {
    id: ${id},
    title: "${escapeTs(row.title)}",
    slug: "${escapeTs(row.slug)}",
    category: "${escapeTs(row.vertical)}",
    summary: "${escapeTs(
      `${row.title}. Contenido editorial pendiente de desarrollo.`,
    )}",
    introduction:
      "Contenido editorial pendiente de desarrollo.",
    products: [
${productReferences
  .map(
    (reference) =>
      `      ${reference}`,
  )
  .join(",\n")}
    ],
    specifications: [],
    criteria: [],
    productAPros: [],
    productACons: [],
    productBPros: [],
    productBCons: [],
    recommendations: [],
    status: "candidate",
    publishedAt: "",
  }`;
}

function findArrayClosingBracket(
  content,
  exportName,
) {
  const declarationRegex =
    new RegExp(
      `export const ${exportName}: [^=]+ = \\[`,
    );

  const declaration =
    declarationRegex.exec(
      content,
    );

  if (!declaration) {
    throw new Error(
      `No se encontró export const ${exportName}.`,
    );
  }

  const start =
    declaration.index +
    declaration[0].length;

  let depth = 1;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (
    let i = start;
    i < content.length;
    i++
  ) {
    const char = content[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        inString = false;
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") {
      depth++;
      continue;
    }

    if (char === "]") {
      depth--;

      if (depth === 0) {
        return i;
      }
    }
  }

  throw new Error(
    `No se encontró el cierre del array ${exportName}.`,
  );
}

function appendObjectsToArray(
  content,
  exportName,
  objects,
) {
  if (!objects.length) {
    return content;
  }

  const closingIndex =
    findArrayClosingBracket(
      content,
      exportName,
    );

  const before =
    content.slice(
      0,
      closingIndex,
    );

  const after =
    content.slice(
      closingIndex,
    );

  const trimmedBefore =
    before.trimEnd();

  const needsComma =
    !trimmedBefore.endsWith("[") &&
    !trimmedBefore.endsWith(",");

  return `${trimmedBefore}${
    needsComma ? "," : ""
  }\n${objects.join(",\n")}\n${after}`;
}

function createBackup(
  filePath,
) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  fs.mkdirSync(
    BACKUP_DIR,
    {
      recursive: true,
    },
  );

  const timestamp =
    new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

  const baseName =
    path.basename(
      filePath,
      ".ts",
    );

  const backupPath =
    path.join(
      BACKUP_DIR,
    `${baseName}-${timestamp}.ts.bak`,
    );

  fs.copyFileSync(
    filePath,
    backupPath,
  );

  return backupPath;
}

function main() {
  console.log("");
  console.log(
    "==============================================",
  );
  console.log(
    " ElectroSpainPro — IMPORT_CONTENT V21",
  );
  console.log(
    "==============================================",
  );
  console.log("");

  if (DRY_RUN) {
    console.log(
      "🟡 MODO DRY-RUN — no se modificarán archivos.",
    );
    console.log("");
  }

  const rows =
    readExcelContent();

  if (!fs.existsSync(PRODUCTS_PATH)) {
    throw new Error(
      `No existe ${PRODUCTS_PATH}`,
    );
  }

  const productsTs =
    fs.readFileSync(
      PRODUCTS_PATH,
      "utf8",
    );

  const guidesTs =
    fs.readFileSync(
      GUIDES_PATH,
      "utf8",
    );

  const comparisonsTs =
    fs.readFileSync(
      COMPARISONS_PATH,
      "utf8",
    );

  const productIds =
    extractCatalogIds(
      productsTs,
    );

  const errors =
    validateRows(
      rows,
      productIds,
    );

  if (errors.length) {
    console.log(
      "🔴 ERRORES DE VALIDACIÓN:",
    );

    for (const error of errors) {
      console.log(
        `   - ${error}`,
      );
    }

    console.log("");
    process.exit(1);
  }

  const existingGuides =
    extractExistingContent(
      guidesTs,
    );

  const existingComparisons =
    extractExistingContent(
      comparisonsTs,
    );

  const guideRows =
    rows.filter(
      (row) =>
        row.type === "guia",
    );

  const comparisonRows =
    rows.filter(
      (row) =>
        row.type === "comparativa",
    );

  const newGuides = [];
  const newComparisons = [];

  let existingCount = 0;

  console.log(
    `📚 Registros Excel: ${rows.length}`,
  );

  console.log(
    `📖 Guías Excel: ${guideRows.length}`,
  );

  console.log(
    `⚖️ Comparativas Excel: ${comparisonRows.length}`,
  );

  console.log("");

  for (const row of rows) {
    const existing =
      row.type === "guia"
        ? findExistingContent(
            row,
            existingGuides,
          )
        : findExistingContent(
            row,
            existingComparisons,
          );

    console.log(
      `${row.contentId} | ${row.type} | ${row.slug}`,
    );

    if (existing) {
      existingCount++;

      console.log(
        `   🟡 EXISTENTE — coincidencia por ${existing.reason}.`,
      );

      console.log(
        "   🔒 Se conservará el contenido editorial actual.",
      );
    } else {
      console.log(
        "   🆕 NUEVO — se preparará estructura editorial.",
      );

      if (row.type === "guia") {
        newGuides.push(row);
      } else {
        newComparisons.push(row);
      }
    }

    console.log("");
  }

  console.log(
    "----------------------------------------------",
  );
  console.log("RESUMEN");
  console.log(
    "----------------------------------------------",
  );

  console.log(
    `Guías:                 ${guideRows.length}`,
  );

  console.log(
    `Comparativas:          ${comparisonRows.length}`,
  );

  console.log(
    `Ya existentes:         ${existingCount}`,
  );

  console.log(
    `Nuevos:                ${
      newGuides.length +
      newComparisons.length
    }`,
  );

  console.log(
    `Errores:               0`,
  );

  console.log("");

  if (DRY_RUN) {
    console.log(
      "🟢 Dry-run finalizado correctamente.",
    );

    console.log(
      "No se ha modificado ningún archivo.",
    );

    console.log("");
    return;
  }

  if (
    !newGuides.length &&
    !newComparisons.length
  ) {
    console.log(
      "ℹ️ No hay contenido nuevo que importar.",
    );

    console.log("");
    return;
  }

  let newGuidesTs =
    guidesTs;

  let newComparisonsTs =
    comparisonsTs;

  const nextGuideId =
    getNextId(guidesTs);

  const guideObjects =
    newGuides.map(
      (row, index) =>
        buildGuideObject(
          row,
          nextGuideId + index,
        ),
    );

  const nextComparisonId =
    getNextId(
      comparisonsTs,
    );

  const comparisonObjects =
    newComparisons.map(
      (row, index) =>
        buildComparisonObject(
          row,
          nextComparisonId + index,
        ),
    );

  newGuidesTs =
    appendObjectsToArray(
      guidesTs,
      "guides",
      guideObjects,
    );

  newComparisonsTs =
    appendObjectsToArray(
      comparisonsTs,
      "comparisons",
      comparisonObjects,
    );

  if (guideObjects.length) {
    const backup =
      createBackup(
        GUIDES_PATH,
      );

    console.log(
      `💾 Backup guías: ${backup}`,
    );
  }

  if (comparisonObjects.length) {
    const backup =
      createBackup(
        COMPARISONS_PATH,
      );

    console.log(
      `💾 Backup comparativas: ${backup}`,
    );
  }

  if (guideObjects.length) {
    fs.writeFileSync(
      GUIDES_PATH,
      newGuidesTs,
      "utf8",
    );

    console.log(
      `📄 Guías actualizadas: ${GUIDES_PATH}`,
    );
  }

  if (comparisonObjects.length) {
    fs.writeFileSync(
      COMPARISONS_PATH,
      newComparisonsTs,
      "utf8",
    );

    console.log(
      `📄 Comparativas actualizadas: ${COMPARISONS_PATH}`,
    );
  }

  console.log("");
  console.log(
    "🟢 IMPORT_CONTENT V21 completado correctamente.",
  );
  console.log("");
}

main();