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

  const workbook = XLSX.readFile(CATALOG_PATH);
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
      content_id: String(
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
        .map((value) => value.trim())
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
      category: extractField(
        object,
        "category",
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

  // 1. Coincidencia exacta de slug
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

  // 2. Coincidencia de título
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

  // 3. Tipo implícito + mismos productos
  //
  // Para comparativas, dos contenidos que
  // comparan exactamente los mismos productos
  // se consideran el mismo contenido editorial.
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

function validateRow(
  row,
  productIds,
) {
  const errors = [];

  if (!row.content_id) {
    errors.push(
      "content_id vacío",
    );
  }

  if (
    !VALID_TYPES.has(row.type)
  ) {
    errors.push(
      `type inválido: "${row.type}"`,
    );
  }

  if (!row.slug) {
    errors.push("slug vacío");
  }

  if (!row.title) {
    errors.push("title vacío");
  }

  if (!row.vertical) {
    errors.push("vertical vacío");
  }

  for (const productId of row.products) {
    if (
      !productIds.has(productId)
    ) {
      errors.push(
        `producto inexistente: ${productId}`,
      );
    }
  }

  return errors;
}

function main() {
  console.log("");
  console.log(
    "==============================================",
  );
  console.log(
    " ElectroSpainPro — PREVIEW IMPORT_CONTENT V21",
  );
  console.log(
    "==============================================",
  );
  console.log("");

  const rows =
    readExcelContent();

  const productsTs =
    fs.readFileSync(
      PRODUCTS_PATH,
      "utf8",
    );

  const guidesTs =
    fs.existsSync(GUIDES_PATH)
      ? fs.readFileSync(
          GUIDES_PATH,
          "utf8",
        )
      : "";

  const comparisonsTs =
    fs.existsSync(
      COMPARISONS_PATH,
    )
      ? fs.readFileSync(
          COMPARISONS_PATH,
          "utf8",
        )
      : "";

  const productIds =
    extractCatalogIds(
      productsTs,
    );

  const existingGuides =
    extractExistingContent(
      guidesTs,
    );

  const existingComparisons =
    extractExistingContent(
      comparisonsTs,
    );

  console.log(
    `📚 Contenidos Excel: ${rows.length}`,
  );

  console.log(
    `📦 Productos disponibles: ${productIds.size}`,
  );

  console.log(
    `📖 Guías existentes: ${existingGuides.length}`,
  );

  console.log(
    `⚖️ Comparativas existentes: ${existingComparisons.length}`,
  );

  console.log("");

  let errors = 0;
  let guides = 0;
  let comparisons = 0;
  let existing = 0;
  let newContent = 0;

  for (const row of rows) {
    const rowErrors =
      validateRow(
        row,
        productIds,
      );

    if (row.type === "guia") {
      guides++;
    }

    if (
      row.type === "comparativa"
    ) {
      comparisons++;
    }

    const existingList =
      row.type === "guia"
        ? existingGuides
        : existingComparisons;

    const existingMatch =
      findExistingContent(
        row,
        existingList,
      );

    if (existingMatch) {
      existing++;
    } else {
      newContent++;
    }

    console.log(
      `${row.content_id} | ${row.type.padEnd(
        11,
      )} | ${row.slug}`,
    );

    console.log(
      `   Título: ${row.title}`,
    );

    console.log(
      `   Vertical: ${row.vertical}`,
    );

    console.log(
      `   Productos: ${
        row.products.join(", ") ||
        "ninguno"
      }`,
    );

    console.log(
      `   Monetización: ${
        row.monetization ||
        "—"
      }`,
    );

    console.log(
      `   Estado Excel: ${
        row.status || "—"
      }`,
    );

    if (existingMatch) {
      console.log(
        `   🟡 Ya existe → coincidencia por ${existingMatch.reason}.`,
      );

      console.log(
        "   🔒 Se conservará el contenido editorial actual.",
      );
    } else {
      console.log(
        "   🆕 Nuevo → se preparará estructura editorial.",
      );
    }

    if (rowErrors.length) {
      errors += rowErrors.length;

      for (const error of rowErrors) {
        console.log(
          `   🔴 ${error}`,
        );
      }
    } else {
      console.log(
        "   🟢 Validación correcta.",
      );
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
    `Guías:                 ${guides}`,
  );

  console.log(
    `Comparativas:          ${comparisons}`,
  );

  console.log(
    `Ya existentes:         ${existing}`,
  );

  console.log(
    `Nuevos:                ${newContent}`,
  );

  console.log(
    `Errores:               ${errors}`,
  );

  console.log("");

  if (errors > 0) {
    console.log(
      "🔴 Preview finalizado con errores.",
    );

    process.exit(1);
  }

  console.log(
    "🟢 IMPORT_CONTENT V21 preparado para importación.",
  );

  console.log("");
}

main();