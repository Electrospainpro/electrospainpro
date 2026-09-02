import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const EXCEL_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V22_ElectroTools.xlsx",
);

const SHEET_NAME = "TOOL_REGISTRY";

const REQUIRED_COLUMNS = [
  "tool_id",
  "slug",
  "vertical",
  "name",
  "release",
  "priority",
  "monetization",
  "status",
  "seo_title",
  "seo_description",
  "inputs",
  "outputs",
  "formula",
  "units",
  "limitations",
  "related_products",
  "related_guides",
];

const VALID_RELEASES = new Set(["V1", "V2"]);
const VALID_PRIORITIES = new Set([
  "Muy alta",
  "Alta",
  "Media",
  "Baja",
]);
const VALID_STATUSES = new Set([
  "planned",
  "review",
  "published",
  "disabled",
]);

function fail(message) {
  console.error(`🔴 ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(EXCEL_PATH)) {
  fail(`No existe el Excel maestro:\n${EXCEL_PATH}`);
  process.exit();
}

const workbook = XLSX.readFile(EXCEL_PATH);

if (!workbook.SheetNames.includes(SHEET_NAME)) {
  fail(`No existe la hoja ${SHEET_NAME}`);
  process.exit();
}

const worksheet = workbook.Sheets[SHEET_NAME];

const rows = XLSX.utils.sheet_to_json(worksheet, {
  defval: "",
});

if (!rows.length) {
  fail("TOOL_REGISTRY está vacío.");
  process.exit();
}

const headers = Object.keys(rows[0]);

const missingColumns = REQUIRED_COLUMNS.filter(
  (column) => !headers.includes(column),
);

if (missingColumns.length) {
  fail(
    `Faltan columnas obligatorias: ${missingColumns.join(", ")}`,
  );
}

const errors = [];
const warnings = [];

const ids = new Set();
const slugs = new Set();

for (const [index, row] of rows.entries()) {
  const excelRow = index + 2;

  const toolId = String(row.tool_id ?? "").trim();
  const slug = String(row.slug ?? "").trim();
  const name = String(row.name ?? "").trim();
  const release = String(row.release ?? "").trim();
  const priority = String(row.priority ?? "").trim();
  const status = String(row.status ?? "").trim();

  if (!toolId) {
    errors.push(`Fila ${excelRow}: tool_id vacío.`);
  } else if (ids.has(toolId)) {
    errors.push(`Fila ${excelRow}: tool_id duplicado: ${toolId}.`);
  } else {
    ids.add(toolId);
  }

  if (!slug) {
    errors.push(`Fila ${excelRow}: slug vacío.`);
  } else if (slugs.has(slug)) {
    errors.push(`Fila ${excelRow}: slug duplicado: ${slug}.`);
  } else {
    slugs.add(slug);
  }

  if (!name) {
    errors.push(`Fila ${excelRow}: name vacío.`);
  }

  if (!VALID_RELEASES.has(release)) {
    errors.push(
      `Fila ${excelRow} (${toolId}): release inválido: ${release}.`,
    );
  }

  if (!VALID_PRIORITIES.has(priority)) {
    errors.push(
      `Fila ${excelRow} (${toolId}): priority inválida: ${priority}.`,
    );
  }

  if (status && !VALID_STATUSES.has(status)) {
    errors.push(
      `Fila ${excelRow} (${toolId}): status inválido: ${status}.`,
    );
  }

  if (!status) {
    warnings.push(
      `Fila ${excelRow} (${toolId}): status vacío; se normalizará como planned.`,
    );
  }

  if (!String(row.monetization ?? "").trim()) {
    warnings.push(
      `Fila ${excelRow} (${toolId}): monetization vacía.`,
    );
  }

  if (release === "V1") {
    const requiredV1Fields = [
      "seo_title",
      "seo_description",
      "inputs",
      "outputs",
      "formula",
      "units",
      "limitations",
    ];

    for (const field of requiredV1Fields) {
      if (!String(row[field] ?? "").trim()) {
        errors.push(
          `Fila ${excelRow} (${toolId}): campo V1 obligatorio vacío: ${field}.`,
        );
      }
    }
  }
}

console.log("");
console.log("======================================");
console.log(" ELECTROTOOLS — VALIDACIÓN V22");
console.log("======================================");
console.log("");

console.log(`Excel: ${EXCEL_PATH}`);
console.log(`Hoja: ${SHEET_NAME}`);
console.log(`Herramientas: ${rows.length}`);
console.log("");

if (warnings.length) {
  console.log(`🟡 Warnings: ${warnings.length}`);

  for (const warning of warnings) {
    console.log(`  - ${warning}`);
  }

  console.log("");
}

if (errors.length) {
  console.log(`🔴 Errores: ${errors.length}`);

  for (const error of errors) {
    console.log(`  - ${error}`);
  }

  console.log("");
  process.exitCode = 1;
  process.exit();
}

console.log("🟢 Validación correcta.");
console.log("");
console.log("Herramientas:");

for (const row of rows) {
  console.log(
    `  ${row.tool_id} | ${row.name} | ${row.release} | ${row.status || "planned"}`,
  );
}

console.log("");
console.log("======================================");