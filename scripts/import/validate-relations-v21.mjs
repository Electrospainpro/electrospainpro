import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const PRODUCTS_PATH = path.join(
  ROOT,
  "data",
  "products.ts"
);

const RELATIONS_PATH = path.join(
  ROOT,
  "data",
  "relations.ts"
);

function extractIds(content, pattern) {
  return [
    ...content.matchAll(pattern),
  ].map((match) => match[1]);
}

if (!fs.existsSync(PRODUCTS_PATH)) {
  console.error(
    "❌ No existe data/products.ts"
  );
  process.exit(1);
}

if (!fs.existsSync(RELATIONS_PATH)) {
  console.error(
    "❌ No existe data/relations.ts"
  );
  process.exit(1);
}

const productsSource =
  fs.readFileSync(
    PRODUCTS_PATH,
    "utf8"
  );

const relationsSource =
  fs.readFileSync(
    RELATIONS_PATH,
    "utf8"
  );

const productIds = new Set(
  extractIds(
    productsSource,
    /catalogId:\s*"([^"]+)"/g
  )
);

const relations = [
  ...relationsSource.matchAll(
    /sourceId:\s*"([^"]+)"[\s\S]*?targetId:\s*"([^"]+)"[\s\S]*?type:\s*"([^"]+)"/g
  ),
].map((match) => ({
  sourceId: match[1],
  targetId: match[2],
  type: match[3],
}));

const errors = [];

for (const relation of relations) {
  if (
    !productIds.has(
      relation.sourceId
    )
  ) {
    errors.push(
      `${relation.sourceId} no existe en data/products.ts`
    );
  }

  if (
    !productIds.has(
      relation.targetId
    )
  ) {
    errors.push(
      `${relation.targetId} no existe en data/products.ts`
    );
  }
}

console.log("");

console.log(
  "========================================"
);

console.log(
  " ElectroSpainPro — Relations Validator"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `Productos encontrados: ${productIds.size}`
);

console.log(
  `Relaciones encontradas: ${relations.length}`
);

console.log("");

console.log(
  "────────────────────────────────────────"
);

console.log(
  "VALIDACIÓN"
);

console.log(
  "────────────────────────────────────────"
);

console.log("");

for (const relation of relations) {
  console.log(
    `🟢 ${relation.sourceId} → ${relation.targetId} (${relation.type})`
  );
}

console.log("");

if (errors.length > 0) {
  console.log(
    `🔴 Errores: ${errors.length}`
  );

  for (const error of errors) {
    console.log(
      `  - ${error}`
    );
  }

  console.log("");

  process.exit(1);
}

console.log(
  "Errores: 0"
);

console.log("");

console.log(
  "✅ Todas las relaciones apuntan a productos existentes."
);

console.log("");