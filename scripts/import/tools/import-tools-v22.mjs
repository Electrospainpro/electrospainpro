import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const EXCEL_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V22_ElectroTools.xlsx",
);

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "calculators.ts",
);

const BACKUP_DIR = path.join(
  ROOT,
  "catalog",
  "backups",
);

const SHEET_NAME = "TOOL_REGISTRY";

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

function cleanString(value) {
  return String(value ?? "").trim();
}

function splitList(value) {
  if (value === undefined || value === null) {
    return [];
  }

  return String(value)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeRelease(value) {
  return VALID_RELEASES.has(cleanString(value))
    ? cleanString(value)
    : "V1";
}

function normalizePriority(value) {
  const normalized = cleanString(value);

  if (VALID_PRIORITIES.has(normalized)) {
    return normalized;
  }

  return "Media";
}

function normalizeStatus(value) {
  const normalized = cleanString(value).toLowerCase();

  if (VALID_STATUSES.has(normalized)) {
    return normalized;
  }

  return "planned";
}

function normalizeRow(row) {
  return {
    toolId: cleanString(row.tool_id),
    slug: cleanString(row.slug),
    vertical: cleanString(row.vertical),
    name: cleanString(row.name),

    release: normalizeRelease(row.release),
    priority: normalizePriority(row.priority),
    status: normalizeStatus(row.status),

    monetization: cleanString(row.monetization),

    seoTitle: cleanString(row.seo_title) || undefined,
    seoDescription:
      cleanString(row.seo_description) || undefined,

    inputs: splitList(row.inputs),
    outputs: splitList(row.outputs),

    formula: cleanString(row.formula) || undefined,
    units: splitList(row.units),

    limitations:
      cleanString(row.limitations) || undefined,

    relatedProducts: splitList(row.related_products),
    relatedGuides: splitList(row.related_guides),
  };
}

function validateRows(rows) {
  const errors = [];
  const ids = new Set();
  const slugs = new Set();

  rows.forEach((row, index) => {
    const excelRow = index + 2;

    const toolId = cleanString(row.tool_id);
    const slug = cleanString(row.slug);
    const name = cleanString(row.name);
    const release = cleanString(row.release);
    const priority = cleanString(row.priority);

    if (!toolId) {
      errors.push(
        `Fila ${excelRow}: tool_id vacío.`,
      );
    } else if (ids.has(toolId)) {
      errors.push(
        `Fila ${excelRow}: tool_id duplicado: ${toolId}.`,
      );
    } else {
      ids.add(toolId);
    }

    if (!slug) {
      errors.push(
        `Fila ${excelRow}: slug vacío.`,
      );
    } else if (slugs.has(slug)) {
      errors.push(
        `Fila ${excelRow}: slug duplicado: ${slug}.`,
      );
    } else {
      slugs.add(slug);
    }

    if (!name) {
      errors.push(
        `Fila ${excelRow}: name vacío.`,
      );
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

    if (release === "V1") {
      const requiredFields = [
        "seo_title",
        "seo_description",
        "inputs",
        "outputs",
        "formula",
        "units",
        "limitations",
      ];

      for (const field of requiredFields) {
        if (!cleanString(row[field])) {
          errors.push(
            `Fila ${excelRow} (${toolId}): campo V1 vacío: ${field}.`,
          );
        }
      }
    }
  });

  return errors;
}

function readExistingCalculators() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    return [];
  }

  const content = fs.readFileSync(
    OUTPUT_PATH,
    "utf8",
  );

  const match = content.match(
    /export const calculators:\s*CalculatorDefinition\[\]\s*=\s*(\[[\s\S]*\]);\s*$/,
  );

  if (!match) {
    return [];
  }

  try {
    return Function(
      `"use strict"; return (${match[1]});`,
    )();
  } catch {
    return [];
  }
}

function serializeValue(value, indent = 2) {
  if (value === undefined) {
    return "undefined";
  }

  return JSON.stringify(value, null, indent);
}

function serializeCalculator(calculator) {
  const lines = [];

  lines.push("  {");
  lines.push(`    toolId: ${serializeValue(calculator.toolId)},`);
  lines.push(`    slug: ${serializeValue(calculator.slug)},`);
  lines.push(`    vertical: ${serializeValue(calculator.vertical)},`);
  lines.push(`    name: ${serializeValue(calculator.name)},`);
  lines.push(`    release: ${serializeValue(calculator.release)},`);
  lines.push(`    priority: ${serializeValue(calculator.priority)},`);
  lines.push(`    status: ${serializeValue(calculator.status)},`);
  lines.push(
    `    monetization: ${serializeValue(calculator.monetization)},`,
  );
  lines.push(
    `    seoTitle: ${serializeValue(calculator.seoTitle)},`,
  );
  lines.push(
    `    seoDescription: ${serializeValue(calculator.seoDescription)},`,
  );
  lines.push(
    `    inputs: ${serializeValue(calculator.inputs)},`,
  );
  lines.push(
    `    outputs: ${serializeValue(calculator.outputs)},`,
  );
  lines.push(
    `    formula: ${serializeValue(calculator.formula)},`,
  );
  lines.push(
    `    units: ${serializeValue(calculator.units)},`,
  );
  lines.push(
    `    limitations: ${serializeValue(calculator.limitations)},`,
  );
  lines.push(
    `    relatedProducts: ${serializeValue(calculator.relatedProducts)},`,
  );
  lines.push(
    `    relatedGuides: ${serializeValue(calculator.relatedGuides)},`,
  );
  lines.push("  }");

  return lines.join("\n");
}

function generateFile(calculators) {
  const blocks = calculators.map(
    serializeCalculator,
  );

  return `import type { CalculatorDefinition } from "@/types/calculator";

export const calculators: CalculatorDefinition[] = [
${blocks.join(",\n")}
];
`;
}

function timestamp() {
  return new Date()
    .toISOString()
    .replace(/[:.]/g, "-");
}

function createBackup() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    return null;
  }

  fs.mkdirSync(BACKUP_DIR, {
    recursive: true,
  });

  const backupPath = path.join(
    BACKUP_DIR,
    `calculators-${timestamp()}.ts.bak`,
  );

  fs.copyFileSync(
    OUTPUT_PATH,
    backupPath,
  );

  return backupPath;
}

const dryRun =
  process.argv.includes("--dry-run");

console.log("");
console.log("======================================");
console.log(" ELECTROTOOLS — IMPORT V22");
console.log("======================================");
console.log("");

if (!fs.existsSync(EXCEL_PATH)) {
  console.error(
    `🔴 No existe el Excel maestro:\n${EXCEL_PATH}`,
  );
  process.exit(1);
}

const workbook = XLSX.readFile(
  EXCEL_PATH,
);

if (!workbook.SheetNames.includes(SHEET_NAME)) {
  console.error(
    `🔴 No existe la hoja ${SHEET_NAME}.`,
  );
  process.exit(1);
}

const worksheet =
  workbook.Sheets[SHEET_NAME];

const rows = XLSX.utils.sheet_to_json(
  worksheet,
  {
    defval: "",
  },
);

console.log(
  `Excel: ${EXCEL_PATH}`,
);

console.log(
  `Hoja: ${SHEET_NAME}`,
);

console.log(
  `Registros encontrados: ${rows.length}`,
);

console.log("");

const validationErrors =
  validateRows(rows);

if (validationErrors.length) {
  console.error(
    `🔴 Se encontraron ${validationErrors.length} errores:`,
  );

  for (const error of validationErrors) {
    console.error(`  - ${error}`);
  }

  process.exit(1);
}

const importedCalculators =
  rows.map(normalizeRow);

const existingCalculators =
  readExistingCalculators();

const existingById = new Map(
  existingCalculators.map(
    (calculator) => [
      calculator.toolId,
      calculator,
    ],
  ),
);

const finalCalculators = [];
const created = [];
const conserved = [];
const updated = [];

for (const calculator of importedCalculators) {
  const existing =
    existingById.get(
      calculator.toolId,
    );

  if (!existing) {
    finalCalculators.push(
      calculator,
    );

    created.push(
      calculator.toolId,
    );

    continue;
  }

  const existingJson =
    JSON.stringify(existing);

  const incomingJson =
    JSON.stringify(calculator);

  if (existingJson === incomingJson) {
    finalCalculators.push(
      existing,
    );

    conserved.push(
      calculator.toolId,
    );

    continue;
  }

  finalCalculators.push(
    calculator,
  );

  updated.push(
    calculator.toolId,
  );
}

const incomingIds = new Set(
  importedCalculators.map(
    (calculator) =>
      calculator.toolId,
  ),
);

const orphanedExisting =
  existingCalculators.filter(
    (calculator) =>
      !incomingIds.has(
        calculator.toolId,
      ),
  );

for (const calculator of orphanedExisting) {
  finalCalculators.push(
    calculator,
  );
}

console.log(
  `🟢 Validación: 0 errores`,
);

console.log(
  `🆕 Nuevas: ${created.length}`,
);

console.log(
  `♻️ Conservadas: ${conserved.length}`,
);

console.log(
  `✏️ Actualizadas: ${updated.length}`,
);

console.log(
  `📦 Fuera de Excel / conservadas: ${orphanedExisting.length}`,
);

console.log("");

if (created.length) {
  console.log(
    `Nuevas: ${created.join(", ")}`,
  );
}

if (updated.length) {
  console.log(
    `Actualizadas: ${updated.join(", ")}`,
  );
}

if (orphanedExisting.length) {
  console.log(
    `Conservadas fuera de Excel: ${orphanedExisting
      .map((item) => item.toolId)
      .join(", ")}`,
  );
}

console.log("");

if (dryRun) {
  console.log(
    "🟡 DRY-RUN: no se ha modificado ningún archivo.",
  );
  console.log("");

  process.exit(0);
}

const backupPath =
  createBackup();

if (backupPath) {
  console.log(
    `💾 Backup creado: ${backupPath}`,
  );
}

fs.mkdirSync(
  path.dirname(OUTPUT_PATH),
  {
    recursive: true,
  },
);

const generatedContent =
  generateFile(
    finalCalculators,
  );

fs.writeFileSync(
  OUTPUT_PATH,
  generatedContent,
  "utf8",
);

console.log("");
console.log(
  `🟢 Archivo generado: ${OUTPUT_PATH}`,
);
console.log(
  `🧮 Calculadoras: ${finalCalculators.length}`,
);
console.log("");
console.log(
  "======================================",
);
console.log(
  " IMPORT V22 COMPLETADO",
);
console.log(
  "======================================",
);