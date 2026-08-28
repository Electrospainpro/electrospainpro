import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const CATALOG_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V21.xlsx"
);

const REQUIRED_SHEETS = [
  "IMPORT_PRODUCTS_TS",
  "IMPORT_RELATIONS",
  "IMPORT_CONTENT",
  "TOOL_REGISTRY",
  "IMPLEMENTATION_MAP",
  "DATA_QUALITY_GATE",
  "AFFILIATE_ECONOMICS",
  "IMPLANTATION_CHECKLIST",
];

const REQUIRED_PRODUCT_COLUMNS = [
  "product_id",
  "brand",
  "mpn",
  "name",
  "category",
  "subcategory",
  "cutoff",
  "curve",
  "current",
  "safety",
  "status",
];

const REQUIRED_RELATION_COLUMNS = [
  "source_id",
  "target_id",
  "type",
  "editorial_reason",
];

const REQUIRED_CONTENT_COLUMNS = [
  "content_id",
  "type",
  "slug",
  "title",
  "vertical",
  "products",
  "monetization",
  "status",
];

const REQUIRED_TOOL_COLUMNS = [
  "tool_id",
  "slug",
  "vertical",
  "name",
  "release",
  "priority",
  "monetization",
];

let errors = 0;
let warnings = 0;

function error(message) {
  errors += 1;
  console.error(`❌ ERROR: ${message}`);
}

function warning(message) {
  warnings += 1;
  console.warn(`⚠️ WARNING: ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function normalize(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function getRows(workbook, sheetName) {
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    return [];
  }

  return XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
  });
}

function checkColumns(sheetName, requiredColumns) {
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    error(`No existe la hoja ${sheetName}.`);
    return false;
  }

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: "",
  });

  if (!rows.length) {
    error(`La hoja ${sheetName} está vacía.`);
    return false;
  }

  const headers = rows[0].map((header) =>
    normalize(header)
  );

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      error(
        `La hoja ${sheetName} no contiene la columna obligatoria "${column}".`
      );
    }
  }

  return true;
}

function checkUniqueIds(rows, field, sheetName) {
  const seen = new Set();

  for (const row of rows) {
    const value = normalize(row[field]);

    if (!value) {
      continue;
    }

    if (seen.has(value)) {
      error(
        `${sheetName}: ${field} duplicado "${value}".`
      );
    }

    seen.add(value);
  }
}

function checkProducts(rows) {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("PRODUCTOS");
  console.log("────────────────────────────────────");

  if (!checkColumns(
    "IMPORT_PRODUCTS_TS",
    REQUIRED_PRODUCT_COLUMNS
  )) {
    return;
  }

  const products = rows.filter((row) =>
    Object.values(row).some(
      (value) => normalize(value) !== ""
    )
  );

  success(
    `IMPORT_PRODUCTS_TS contiene ${products.length} registros.`
  );

  checkUniqueIds(
    products,
    "product_id",
    "IMPORT_PRODUCTS_TS"
  );

  for (const product of products) {
    const id = normalize(product.product_id);
    const brand = normalize(product.brand);
    const mpn = normalize(product.mpn);
    const name = normalize(product.name);
    const category = normalize(product.category);
    const subcategory = normalize(product.subcategory);
    const status = normalize(product.status);

    if (!id) {
      error("Producto sin product_id.");
    }

    if (!brand) {
      error(
        `${id || "Producto"} sin marca.`
      );
    }

    if (!mpn) {
      error(
        `${id || "Producto"} sin MPN.`
      );
    }

    if (!name) {
      error(
        `${id || "Producto"} sin nombre.`
      );
    }

    if (!category) {
      error(
        `${id || "Producto"} sin categoría.`
      );
    }

    if (!subcategory) {
      error(
        `${id || "Producto"} sin subcategoría.`
      );
    }

    if (!status) {
      warning(
        `${id || "Producto"} sin status.`
      );
    }

    if (status === "published-ready") {
      success(
        `${id}: preparado para publicación.`
      );
    } else if (status === "review") {
      warning(
        `${id}: requiere revisión antes de publicación.`
      );
    } else if (status === "blocked") {
      error(
        `${id}: está bloqueado.`
      );
    }
  }
}

function checkRelations(rows) {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("RELACIONES");
  console.log("────────────────────────────────────");

  if (!checkColumns(
    "IMPORT_RELATIONS",
    REQUIRED_RELATION_COLUMNS
  )) {
    return;
  }

  const relations = rows.filter((row) =>
    Object.values(row).some(
      (value) => normalize(value) !== ""
    )
  );

  success(
    `IMPORT_RELATIONS contiene ${relations.length} relaciones.`
  );

  const productIds = new Set(
    getRows(workbook, "IMPORT_PRODUCTS_TS")
      .map((row) => normalize(row.product_id))
      .filter(Boolean)
  );

  for (const relation of relations) {
    const source = normalize(
      relation.source_id
    );

    const target = normalize(
      relation.target_id
    );

    if (!source) {
      error(
        "Relación sin source_id."
      );
    }

    if (!target) {
      error(
        "Relación sin target_id."
      );
    }

    if (
      source &&
      !productIds.has(source)
    ) {
      warning(
        `Relación ${source} → ${target}: source_id no aparece en IMPORT_PRODUCTS_TS.`
      );
    }

    if (
      target &&
      !productIds.has(target)
    ) {
      warning(
        `Relación ${source} → ${target}: target_id no aparece en IMPORT_PRODUCTS_TS.`
      );
    }
  }
}

function checkContent(rows) {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("CONTENIDO");
  console.log("────────────────────────────────────");

  if (!checkColumns(
    "IMPORT_CONTENT",
    REQUIRED_CONTENT_COLUMNS
  )) {
    return;
  }

  const content = rows.filter((row) =>
    Object.values(row).some(
      (value) => normalize(value) !== ""
    )
  );

  success(
    `IMPORT_CONTENT contiene ${content.length} registros.`
  );

  checkUniqueIds(
    content,
    "content_id",
    "IMPORT_CONTENT"
  );

  const slugs = new Set();

  for (const item of content) {
    const id = normalize(item.content_id);
    const slug = normalize(item.slug);
    const title = normalize(item.title);
    const type = normalize(item.type);

    if (!id) {
      error("Contenido sin content_id.");
    }

    if (!slug) {
      error(
        `${id || "Contenido"} sin slug.`
      );
    }

    if (!title) {
      error(
        `${id || "Contenido"} sin título.`
      );
    }

    if (!type) {
      error(
        `${id || "Contenido"} sin type.`
      );
    }

    if (slug) {
      if (slugs.has(slug)) {
        error(
          `Slug de contenido duplicado: "${slug}".`
        );
      }

      slugs.add(slug);
    }
  }
}

function checkTools(rows) {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("HERRAMIENTAS");
  console.log("────────────────────────────────────");

  if (!checkColumns(
    "TOOL_REGISTRY",
    REQUIRED_TOOL_COLUMNS
  )) {
    return;
  }

  const tools = rows.filter((row) =>
    Object.values(row).some(
      (value) => normalize(value) !== ""
    )
  );

  success(
    `TOOL_REGISTRY contiene ${tools.length} herramientas.`
  );

  checkUniqueIds(
    tools,
    "tool_id",
    "TOOL_REGISTRY"
  );

  const slugs = new Set();

  for (const tool of tools) {
    const id = normalize(tool.tool_id);
    const slug = normalize(tool.slug);
    const name = normalize(tool.name);

    if (!id) {
      error("Herramienta sin tool_id.");
    }

    if (!slug) {
      error(
        `${id || "Herramienta"} sin slug.`
      );
    }

    if (!name) {
      error(
        `${id || "Herramienta"} sin nombre.`
      );
    }

    if (slug) {
      if (slugs.has(slug)) {
        error(
          `Slug de herramienta duplicado: "${slug}".`
        );
      }

      slugs.add(slug);
    }
  }
}

function checkImplementationMap() {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("IMPLEMENTATION MAP");
  console.log("────────────────────────────────────");

  const rows = getRows(
    workbook,
    "IMPLEMENTATION_MAP"
  );

  if (!rows.length) {
    error(
      "IMPLEMENTATION_MAP está vacía."
    );
    return;
  }

  success(
    `IMPLEMENTATION_MAP contiene ${rows.length} registros.`
  );
}

function checkQualityGate() {
  console.log("");
  console.log("────────────────────────────────────");
  console.log("DATA QUALITY GATE");
  console.log("────────────────────────────────────");

  const rows = getRows(
    workbook,
    "DATA_QUALITY_GATE"
  );

  if (!rows.length) {
    error(
      "DATA_QUALITY_GATE está vacío."
    );
    return;
  }

  success(
    `DATA_QUALITY_GATE contiene ${rows.length} reglas.`
  );

  for (const row of rows) {
    const area = normalize(row.Área);
    const field = normalize(row.Campo);
    const criterion = normalize(row.Criterio);
    const level = normalize(row.Nivel);

    if (!area || !field || !criterion || !level) {
      warning(
        "Existe una regla del DATA_QUALITY_GATE incompleta."
      );
    }
  }
}

if (!fs.existsSync(CATALOG_PATH)) {
  console.error("");
  console.error(
    `❌ No se encuentra el catálogo: ${CATALOG_PATH}`
  );
  console.error("");
  process.exit(1);
}

console.log("");
console.log("========================================");
console.log(" ElectroSpainPro — V21 Catalog Validator");
console.log("========================================");
console.log("");

const workbook = XLSX.readFile(CATALOG_PATH);

console.log(
  `Archivo: ${path.basename(CATALOG_PATH)}`
);

console.log(
  `Hojas encontradas: ${workbook.SheetNames.length}`
);

console.log("");

for (const sheetName of REQUIRED_SHEETS) {
  if (workbook.SheetNames.includes(sheetName)) {
    success(`Hoja encontrada: ${sheetName}`);
  } else {
    error(
      `Falta la hoja obligatoria: ${sheetName}`
    );
  }
}

checkProducts(
  getRows(workbook, "IMPORT_PRODUCTS_TS")
);

checkRelations(
  getRows(workbook, "IMPORT_RELATIONS")
);

checkContent(
  getRows(workbook, "IMPORT_CONTENT")
);

checkTools(
  getRows(workbook, "TOOL_REGISTRY")
);

checkImplementationMap();

checkQualityGate();

console.log("");
console.log("========================================");
console.log(" RESULTADO");
console.log("========================================");
console.log("");

console.log(`Errores: ${errors}`);
console.log(`Warnings: ${warnings}`);

console.log("");

if (errors > 0) {
  console.error(
    "❌ VALIDACIÓN FALLIDA"
  );
  console.error(
    "El catálogo NO está listo para importación."
  );

  process.exit(1);
}

console.log(
  "✅ VALIDACIÓN CORRECTA"
);

console.log(
  "El catálogo supera las comprobaciones estructurales."
);

console.log("");