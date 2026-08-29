import fs from "node:fs";

const PRODUCTS_FILE = "data/products.ts";
const RELATIONS_FILE = "data/relations.ts";

const productsSource = fs.readFileSync(
  PRODUCTS_FILE,
  "utf8"
);

const relationsSource = fs.readFileSync(
  RELATIONS_FILE,
  "utf8"
);

/**
 * El preview es una herramienta de CLI.
 *
 * Aquí convertimos los archivos TS existentes
 * en datos mínimos para mostrar el preview.
 *
 * La lógica editorial de resolución queda
 * separada de esta presentación.
 */

const products = [
  ...productsSource.matchAll(
    /catalogId:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?brand:\s*"([^"]+)"[\s\S]*?mpn:\s*"([^"]+)"/g
  ),
].map((match) => ({
  catalogId: match[1],
  name: match[2],
  brand: match[3],
  mpn: match[4],
}));

const relations = [
  ...relationsSource.matchAll(
    /sourceId:\s*"([^"]+)"[\s\S]*?targetId:\s*"([^"]+)"[\s\S]*?type:\s*"([^"]+)"[\s\S]*?editorialReason:\s*"([^"]+)"/g
  ),
].map((match) => ({
  sourceId: match[1],
  targetId: match[2],
  type: match[3],
  editorialReason: match[4],
}));

function getProduct(catalogId) {
  return products.find(
    (product) =>
      product.catalogId === catalogId
  );
}

const candidates = relations
  .filter(
    (relation) =>
      relation.type === "comparison"
  )
  .map((relation) => {
    const sourceProduct =
      getProduct(relation.sourceId);

    const targetProduct =
      getProduct(relation.targetId);

    if (
      !sourceProduct ||
      !targetProduct
    ) {
      return null;
    }

    return {
      sourceId: relation.sourceId,
      targetId: relation.targetId,
      sourceProduct,
      targetProduct,
      editorialReason:
        relation.editorialReason,
      status: "candidate",
    };
  })
  .filter(Boolean);

console.log("");
console.log(
  "========================================"
);
console.log(
  " ElectroSpainPro — V21 Comparison Candidates"
);
console.log(
  "========================================"
);
console.log("");

console.log(
  `Candidatos encontrados: ${candidates.length}`
);
console.log("");

console.log(
  "────────────────────────────────────────"
);
console.log(
  "CANDIDATOS A REVISIÓN EDITORIAL"
);
console.log(
  "────────────────────────────────────────"
);

for (const candidate of candidates) {
  const {
    sourceId,
    targetId,
    sourceProduct,
    targetProduct,
    editorialReason,
  } = candidate;

  console.log("");

  console.log(
    `${sourceId} vs ${targetId}`
  );

  console.log(
    `  Producto A: ${sourceProduct.brand} ${sourceProduct.mpn}`
  );

  console.log(
    `  Nombre A: ${sourceProduct.name}`
  );

  console.log(
    `  Producto B: ${targetProduct.brand} ${targetProduct.mpn}`
  );

  console.log(
    `  Nombre B: ${targetProduct.name}`
  );

  console.log(
    `  Motivo V21: ${editorialReason}`
  );

  console.log(
    `  Estado: ${candidate.status.toUpperCase()}`
  );
}

console.log("");
console.log(
  "────────────────────────────────────────"
);
console.log("");

console.log(
  "ℹ️ PREVIEW SOLAMENTE"
);
console.log(
  "No se ha modificado data/comparisons.ts."
);
console.log("");