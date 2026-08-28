import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const CATALOG_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V21.xlsx"
);

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

if (!fs.existsSync(CATALOG_PATH)) {
  console.error(
    `❌ No se encuentra el catálogo: ${CATALOG_PATH}`
  );

  process.exit(1);
}

const workbook = XLSX.readFile(CATALOG_PATH);

const rows = getRows(
  workbook,
  "IMPORT_PRODUCTS_TS"
);

console.log("");
console.log("========================================");
console.log(" ElectroSpainPro — V21 Catalog Preview");
console.log("========================================");
console.log("");

console.log(
  `Archivo: ${path.basename(CATALOG_PATH)}`
);

console.log(
  `Productos encontrados: ${rows.length}`
);

console.log("");

console.log(
  "────────────────────────────────────────"
);

console.log(
  "PRODUCTOS QUE SE IMPORTARÍAN"
);

console.log(
  "────────────────────────────────────────"
);

console.log("");

for (const row of rows) {
  const product = {
    catalogId: normalize(row.product_id),
    brand: normalize(row.brand),
    mpn: normalize(row.mpn),
    name: normalize(row.name),
    category: normalize(row.category),
    subcategory: normalize(row.subcategory),
    cutoff: normalize(row.cutoff),
    curve: normalize(row.curve),
    current: normalize(row.current),
    safety: normalize(row.safety),
    status: normalize(row.status),
  };

  console.log(
    `${product.catalogId} | ${product.brand} | ${product.mpn}`
  );

  console.log(
    `  Nombre: ${product.name}`
  );

  console.log(
    `  Categoría: ${product.category}`
  );

  console.log(
    `  Subcategoría: ${product.subcategory}`
  );

  console.log(
    `  Corte: ${product.cutoff}`
  );

  console.log(
    `  Curva: ${product.curve}`
  );

  console.log(
    `  Intensidad: ${product.current}`
  );

  console.log(
    `  Seguridad: ${product.safety}`
  );

  console.log(
    `  Estado V21: ${product.status}`
  );

  console.log("");
}

console.log(
  "────────────────────────────────────────"
);

console.log("");

console.log(
  "ℹ️ PREVIEW SOLAMENTE"
);

console.log(
  "No se ha modificado ningún archivo de data/."
);

console.log("");