import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const EXCEL_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V23_ElectroTools.xlsx",
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

const VALID_TOOL_TYPES = new Set([
  "calculator",
  "converter",
]);

const VALID_RELEASES = new Set([
  "V1",
  "V2",
]);

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
  if (
    value === undefined ||
    value === null
  ) {
    return [];
  }

  return String(value)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeToolType(value) {
  const normalized =
    cleanString(value).toLowerCase();

  return VALID_TOOL_TYPES.has(normalized)
    ? normalized
    : "calculator";
}

function normalizeRelease(value) {
  return VALID_RELEASES.has(
    cleanString(value),
  )
    ? cleanString(value)
    : "V1";
}

function normalizePriority(value) {
  const normalized =
    cleanString(value);

  if (
    VALID_PRIORITIES.has(normalized)
  ) {
    return normalized;
  }

  return "Media";
}

function normalizeStatus(value) {
  const normalized =
    cleanString(value).toLowerCase();

  if (
    VALID_STATUSES.has(normalized)
  ) {
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

    toolType: normalizeToolType(
      row.tool_type,
    ),

    release: normalizeRelease(
      row.release,
    ),

    priority: normalizePriority(
      row.priority,
    ),

    status: normalizeStatus(
      row.status,
    ),

    monetization: cleanString(
      row.monetization,
    ),

    seoTitle:
      cleanString(row.seo_title) ||
      undefined,

    seoDescription:
      cleanString(
        row.seo_description,
      ) || undefined,

    inputs: splitList(row.inputs),

    outputs: splitList(row.outputs),

    formula:
      cleanString(row.formula) ||
      undefined,

    units: splitList(row.units),

    limitations:
      cleanString(row.limitations) ||
      undefined,

    relatedProducts:
      splitList(
        row.related_products,
      ),

    relatedGuides:
      splitList(
        row.related_guides,
      ),
  };
}

function validateRows(rows) {
  const errors = [];

  const ids = new Set();
  const slugs = new Set();

  rows.forEach((row, index) => {
    const excelRow = index + 2;

    const toolId =
      cleanString(row.tool_id);

    const slug =
      cleanString(row.slug);

    const name =
      cleanString(row.name);

    const toolType =
      cleanString(row.tool_type)
        .toLowerCase();

    const release =
      cleanString(row.release);

    const priority =
      cleanString(row.priority);

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

    if (
      !VALID_TOOL_TYPES.has(toolType)
    ) {
      errors.push(
        `Fila ${excelRow} (${toolId}): tool_type inválido: ${toolType}.`,
      );
    }

    if (
      !VALID_RELEASES.has(release)
    ) {
      errors.push(
        `Fila ${excelRow} (${toolId}): release inválido: ${release}.`,
      );
    }

    if (
      !VALID_PRIORITIES.has(priority)
    ) {
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

      for (
        const field of requiredFields
      ) {
        if (
          !cleanString(row[field])
        ) {
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
  if (
    !fs.existsSync(OUTPUT_PATH)
  ) {
    return [];
  }

  const content =
    fs.readFileSync(
      OUTPUT_PATH,
      "utf8",
    );

  const match =
    content.match(
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

function serializeValue(
  value,
  indent = 2,
) {
  if (value === undefined) {
    return "undefined";
  }

  return JSON.stringify(
    value,
    null,
    indent,
  );
}

function serializeCalculator(
  calculator,
) {
  const lines = [];

  lines.push("  {");

  lines.push(
    `    toolId: ${serializeValue(calculator.toolId)},`,
  );

  lines.push(
    `    slug: ${serializeValue(calculator.slug)},`,
  );

  lines.push(
    `    vertical: ${serializeValue(calculator.vertical)},`,
  );

  lines.push(
    `    name: ${serializeValue(calculator.name)},`,
  );

  lines.push(
    `    toolType: ${serializeValue(calculator.toolType)},`,
  );

  lines.push(
    `    release: ${serializeValue(calculator.release)},`,
  );

  lines.push(
    `    priority: ${serializeValue(calculator.priority)},`,
  );

  lines.push(
    `    status: ${serializeValue(calculator.status)},`,
  );

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
  const blocks =
    calculators.map(
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
  if (
    !fs.existsSync(OUTPUT_PATH)
  ) {
    return null;
  }

  fs.mkdirSync(
    BACKUP_DIR,
    {
      recursive: true,
    },
  );

  const backupPath =
    path.join(
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
  process.argv.includes(
    "--dry-run",
  );

console.log("");
console.log("======================================");
console.log(
  ` ELECTROTOOLS — IMPORT V23${dryRun ? " — DRY RUN" : ""}`,
);
console.log("======================================");
console.log("");

if (
  !fs.existsSync(EXCEL_PATH)
) {
  console.error(
    `🔴 No existe el Excel maestro:\n${EXCEL_PATH}`,
  );

  process.exit(1);
}

const workbook =
  XLSX.readFile(
    EXCEL_PATH,
  );

if (
  !workbook.SheetNames.includes(
    SHEET_NAME,
  )
) {
  console.error(
    `🔴 No existe la hoja ${SHEET_NAME}.`,
  );

  process.exit(1);
}

const worksheet =
  workbook.Sheets[
    SHEET_NAME
  ];

const rows =
  XLSX.utils.sheet_to_json(
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
  `Filas Excel: ${rows.length}`,
);

console.log("");

const validationErrors =
  validateRows(rows);

if (
  validationErrors.length
) {
  console.error(
    `🔴 Errores de validación: ${validationErrors.length}`,
  );

  for (
    const error of validationErrors
  ) {
    console.error(
      `  - ${error}`,
    );
  }

  process.exit(1);
}

const imported =
  rows.map(normalizeRow);

const existing =
  readExistingCalculators();

const existingById =
  new Map(
    existing.map(
      (calculator) => [
        calculator.toolId,
        calculator,
      ],
    ),
  );

const importedById =
  new Map(
    imported.map(
      (calculator) => [
        calculator.toolId,
        calculator,
      ],
    ),
  );

const finalCalculators = [];

let created = 0;
let updated = 0;
let conserved = 0;

for (
  const calculator of imported
) {
  const previous =
    existingById.get(
      calculator.toolId,
    );

  if (!previous) {
    created += 1;
    finalCalculators.push(
      calculator,
    );
    continue;
  }

  const previousSerialized =
    JSON.stringify(previous);

  const currentSerialized =
    JSON.stringify(calculator);

  if (
    previousSerialized ===
    currentSerialized
  ) {
    conserved += 1;
  } else {
    updated += 1;
  }

  finalCalculators.push(
    calculator,
  );
}

/*
 * Conservamos entradas existentes que
 * todavía no estén presentes en Excel.
 *
 * El Excel sigue siendo la fuente de verdad
 * para los registros que sí existen allí,
 * pero no eliminamos datos existentes
 * automáticamente.
 */
for (
  const calculator of existing
) {
  if (
    !importedById.has(
      calculator.toolId,
    )
  ) {
    finalCalculators.push(
      calculator,
    );
  }
}

const excelIds =
  new Set(
    imported.map(
      (calculator) =>
        calculator.toolId,
    ),
  );

const preservedOutsideExcel =
  existing.filter(
    (calculator) =>
      !excelIds.has(
        calculator.toolId,
      ),
  ).length;

console.log(
  `🟢 Nuevos: ${created}`,
);

console.log(
  `🔄 Actualizados: ${updated}`,
);

console.log(
  `⚪ Conservados: ${conserved}`,
);

console.log(
  `📦 Conservados fuera de Excel: ${preservedOutsideExcel}`,
);

console.log(
  `📊 Total final: ${finalCalculators.length}`,
);

console.log("");

const generated =
  generateFile(
    finalCalculators,
  );

if (dryRun) {
  console.log(
    "🟡 DRY RUN: no se ha modificado data/calculators.ts.",
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
  path.dirname(
    OUTPUT_PATH,
  ),
  {
    recursive: true,
  },
);

fs.writeFileSync(
  OUTPUT_PATH,
  generated,
  "utf8",
);

console.log(
  `🟢 Importación completada: ${OUTPUT_PATH}`,
);

console.log("");