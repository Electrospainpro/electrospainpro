import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const ROOT = process.cwd();

const CATALOG_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V21.xlsx"
);

const RELATIONS_PATH = path.join(
  ROOT,
  "data",
  "relations.ts"
);

const isDryRun =
  process.argv.includes("--dry-run");

function normalize(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value).trim();
}

function escapeString(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

if (!fs.existsSync(CATALOG_PATH)) {
  console.error(
    "❌ No se encuentra el catálogo V21."
  );

  process.exit(1);
}

if (!fs.existsSync(RELATIONS_PATH)) {
  console.error(
    "❌ No existe data/relations.ts."
  );

  process.exit(1);
}

const workbook =
  XLSX.readFile(
    CATALOG_PATH
  );

const worksheet =
  workbook.Sheets[
    "IMPORT_RELATIONS"
  ];

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

const relations =
  rows
    .map((row) => ({
      sourceId:
        normalize(
          row.source_id
        ),

      targetId:
        normalize(
          row.target_id
        ),

      type:
        normalize(
          row.type
        ),

      editorialReason:
        normalize(
          row.editorial_reason
        ),
    }))
    .filter(
      (relation) =>
        relation.sourceId &&
        relation.targetId &&
        relation.type
    );

const invalidTypes =
  relations.filter(
    (relation) =>
      ![
        "variant",
        "comparison",
        "related",
      ].includes(
        relation.type
      )
  );

const duplicateKeys =
  new Set();

const duplicates = [];

for (
  const relation
  of relations
) {
  const key =
    [
      relation.sourceId,
      relation.targetId,
      relation.type,
    ].join("|");

  if (
    duplicateKeys.has(key)
  ) {
    duplicates.push(
      relation
    );
  }

  duplicateKeys.add(key);
}

const sourceIds =
  new Set(
    relations.map(
      (relation) =>
        relation.sourceId
    )
  );

const targetIds =
  new Set(
    relations.map(
      (relation) =>
        relation.targetId
    )
  );

const productIds =
  new Set([
    ...sourceIds,
    ...targetIds,
  ]);

console.log("");

console.log(
  "========================================"
);

console.log(
  " ElectroSpainPro — V21 Relations Import"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `Modo: ${
    isDryRun
      ? "DRY RUN"
      : "IMPORTACIÓN REAL"
  }`
);

console.log(
  `Filas Excel: ${rows.length}`
);

console.log(
  `Relaciones válidas: ${relations.length}`
);

console.log(
  `Productos relacionados: ${productIds.size}`
);

console.log("");

console.log(
  "────────────────────────────────────────"
);

console.log(
  "RELACIONES"
);

console.log(
  "────────────────────────────────────────"
);

console.log("");

for (
  const relation
  of relations
) {
  console.log(
    `${relation.sourceId} → ${relation.targetId}`
  );

  console.log(
    `  Tipo: ${relation.type}`
  );

  console.log(
    `  Motivo: ${
      relation.editorialReason ||
      "(sin motivo)"
    }`
  );

  console.log("");
}

console.log(
  "────────────────────────────────────────"
);

console.log("");

if (
  invalidTypes.length > 0
) {
  console.error(
    `🔴 Tipos inválidos: ${invalidTypes.length}`
  );

  for (
    const relation
    of invalidTypes
  ) {
    console.error(
      `   ${relation.sourceId} → ${relation.targetId}: ${relation.type}`
    );
  }

  console.log("");
}

if (
  duplicates.length > 0
) {
  console.error(
    `🔴 Relaciones duplicadas: ${duplicates.length}`
  );

  console.log("");
}

if (
  invalidTypes.length > 0 ||
  duplicates.length > 0
) {
  console.error(
    "❌ La importación se detiene por errores estructurales."
  );

  process.exit(1);
}

/*
 * Construimos el contenido TypeScript.
 *
 * V21 es la fuente maestra de estas
 * relaciones.
 */
const lines = [];

lines.push(
  'import { CatalogRelation } from "@/types/relations";'
);

lines.push("");

lines.push(
  "/**"
);

lines.push(
  " * Relaciones del catálogo ElectroSpainPro."
);

lines.push(
  " *"
);

lines.push(
  " * Fuente: catálogo implantable V21."
);

lines.push(
  " */"
);

lines.push(
  "export const relations: CatalogRelation[] = ["
);

for (
  const relation
  of relations
) {
  lines.push(
    "  {"
  );

  lines.push(
    `    sourceId: "${escapeString(
      relation.sourceId
    )}",`
  );

  lines.push(
    `    targetId: "${escapeString(
      relation.targetId
    )}",`
  );

  lines.push(
    `    type: "${escapeString(
      relation.type
    )}",`
  );

  if (
    relation.editorialReason
  ) {
    lines.push(
      `    editorialReason: "${escapeString(
        relation.editorialReason
      )}",`
    );
  }

  lines.push(
    "  },"
  );
}

lines.push(
  "];"
);

lines.push("");

const generatedContent =
  lines.join("\n");

if (isDryRun) {
  console.log(
    "⚠️ DRY RUN"
  );

  console.log(
    "No se ha modificado data/relations.ts."
  );

  console.log("");

  process.exit(0);
}

/*
 * Importación real.
 *
 * Antes de modificar data/relations.ts,
 * creamos un backup para poder recuperar
 * el estado anterior del Data Engine.
 */

const BACKUP_DIR = path.join(
  ROOT,
  "catalog",
  "backups"
);

fs.mkdirSync(
  BACKUP_DIR,
  {
    recursive: true,
  }
);

const timestamp =
  new Date()
    .toISOString()
    .replace(
      /[:.]/g,
      "-"
    );

const backupPath =
  path.join(
    BACKUP_DIR,
    `relations-${timestamp}.ts`
  );

fs.copyFileSync(
  RELATIONS_PATH,
  backupPath
);

console.log(
  `💾 Backup creado: ${backupPath}`
);

fs.writeFileSync(
  RELATIONS_PATH,
  generatedContent,
  "utf8"
);

console.log(
  "🟢 Relaciones importadas correctamente."
);

console.log(
  `📄 Archivo actualizado: ${RELATIONS_PATH}`
);

console.log("");

console.log(
  "🟢 Relaciones importadas correctamente."
);

console.log(
  `📄 Archivo actualizado: ${RELATIONS_PATH}`
);

console.log("");