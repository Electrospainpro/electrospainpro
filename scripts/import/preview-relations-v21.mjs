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
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value).trim();
}

if (!fs.existsSync(CATALOG_PATH)) {
  console.error(
    "❌ No se encuentra el catálogo V21."
  );

  process.exit(1);
}

const workbook =
  XLSX.readFile(CATALOG_PATH);

const worksheet =
  workbook.Sheets["IMPORT_RELATIONS"];

if (!worksheet) {
  console.error(
    "❌ No existe la hoja IMPORT_RELATIONS."
  );

  process.exit(1);
}

const rows =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: "",
    }
  );

const validRows =
  rows.filter(
    (row) =>
      normalize(row.source_id) &&
      normalize(row.target_id) &&
      normalize(row.type)
  );

console.log("");

console.log(
  "========================================"
);

console.log(
  " ElectroSpainPro — V21 Relations Preview"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `Relaciones encontradas: ${rows.length}`
);

console.log(
  `Relaciones válidas: ${validRows.length}`
);

console.log("");

console.log(
  "────────────────────────────────────────"
);

console.log(
  "RELACIONES V21"
);

console.log(
  "────────────────────────────────────────"
);

console.log("");

for (
  const row of validRows
) {
  const sourceId =
    normalize(row.source_id);

  const targetId =
    normalize(row.target_id);

  const type =
    normalize(row.type);

  const reason =
    normalize(
      row.editorial_reason
    );

  console.log(
    `${sourceId} → ${targetId}`
  );

  console.log(
    `  Tipo: ${type}`
  );

  console.log(
    `  Motivo: ${
      reason || "(sin motivo)"
    }`
  );

  console.log("");
}

const invalidRows =
  rows.length -
  validRows.length;

if (invalidRows > 0) {
  console.log(
    `⚠️ Relaciones inválidas: ${invalidRows}`
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
  "No se ha modificado ningún archivo."
);

console.log("");