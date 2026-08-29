import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

import {
  normalizeCatalogProduct,
} from "../../lib/catalog-normalizer.mjs";

const ROOT = process.cwd();

const CATALOG_PATH = path.join(
  ROOT,
  "catalog",
  "ElectroSpainPro_Catalogo_IMPLANTABLE_V21.xlsx"
);

const PRODUCTS_PATH = path.join(
  ROOT,
  "data",
  "products.ts"
);

const BACKUP_DIR = path.join(
  ROOT,
  "catalog",
  "backups"
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

function getRows(
  workbook,
  sheetName
) {
  const worksheet =
    workbook.Sheets[sheetName];

  if (!worksheet) {
    return [];
  }

  return XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: "",
    }
  );
}

function escapeString(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

/*
 * Lee los productos existentes de
 * data/products.ts.
 *
 * Solamente extraemos los campos
 * necesarios para comparar.
 */
function extractProductsTs() {
  if (
    !fs.existsSync(PRODUCTS_PATH)
  ) {
    console.error(
      `❌ No existe ${PRODUCTS_PATH}`
    );

    process.exit(1);
  }

  const source =
    fs.readFileSync(
      PRODUCTS_PATH,
      "utf8"
    );

  const products = [];

  const catalogMatches =
    source.matchAll(
      /catalogId:\s*"([^"]+)"/g
    );

  for (
    const match
    of catalogMatches
  ) {
    const catalogId =
      normalize(match[1]);

    const start =
      Math.max(
        0,
        match.index - 1000
      );

    const end =
      Math.min(
        source.length,
        match.index + 3000
      );

    const context =
      source.slice(
        start,
        end
      );

    const brandMatch =
      context.match(
        /brand:\s*"([^"]+)"/
      );

    const mpnMatch =
      context.match(
        /mpn:\s*"([^"]+)"/
      );

    const nameMatch =
      context.match(
        /name:\s*"([^"]+)"/
      );

    const categoryMatch =
      context.match(
        /category:\s*"([^"]+)"/
      );

    const subcategoryMatch =
      context.match(
        /subcategory:\s*"([^"]+)"/
      );

    const eanMatch =
      context.match(
        /ean:\s*"([^"]+)"/
      );

    products.push({
      catalogId,

      brand: normalize(
        brandMatch?.[1]
      ),

      mpn: normalize(
        mpnMatch?.[1]
      ),

      name: normalize(
        nameMatch?.[1]
      ),

      category: normalize(
        categoryMatch?.[1]
      ),

      subcategory: normalize(
        subcategoryMatch?.[1]
      ),

      ean: normalize(
        eanMatch?.[1]
      ),
    });
  }

  return products;
}

/*
 * Convierte las filas de Excel en
 * productos normalizados.
 */
function buildExcelProducts(
  workbook
) {
  const rows =
    getRows(
      workbook,
      "IMPORT_PRODUCTS_TS"
    );

  return rows
    .filter((row) =>
      Object.values(row).some(
        (value) =>
          normalize(value) !== ""
      )
    )
    .map((row) =>
      normalizeCatalogProduct({
        catalogId:
          row.product_id,

        brand:
          row.brand,

        mpn:
          row.mpn,

        name:
          row.name,

        category:
          row.category,

        subcategory:
          row.subcategory,

        ean:
          row.ean,

        status:
          row.status,
      })
    );
}

/*
 * Localiza TODOS los bloques de productos
 * de data/products.ts.
 *
 * Buscamos bloques que empiezan por:
 *
 *   {
 *
 * y terminan en:
 *
 *   },
 *
 * justo antes del siguiente producto
 * o del cierre del array.
 *
 * Esto evita depender de que haya
 * exactamente una línea en blanco
 * entre propiedades.
 */
function getProductBlocks(source) {
  const blocks = [];

  const pattern =
    /\n  \{[\s\S]*?\n  \},(?=\n\n  \{|\n\];)/g;

  for (
    const match
    of source.matchAll(pattern)
  ) {
    blocks.push({
      text: match[0],
      index: match.index,
    });
  }

  return blocks;
}

/*
 * Busca el bloque exacto por catalogId.
 */
function findProductBlock(
  source,
  catalogId
) {
  const blocks =
    getProductBlocks(source);

  for (
    const block
    of blocks
  ) {
    const match =
      block.text.match(
        /catalogId:\s*"([^"]+)"/
      );

    if (
      match &&
      match[1] === catalogId
    ) {
      return block;
    }
  }

  return null;
}

function replaceField(
  block,
  field,
  value
) {
  const escaped =
    escapeString(value);

  const pattern =
    new RegExp(
      `(\\n    ${field}:\\s*)"[^"]*"`,
      "m"
    );

  if (
    !pattern.test(block)
  ) {
    return block;
  }

  return block.replace(
    pattern,
    `$1"${escaped}"`
  );
}

function addFieldAfter(
  block,
  afterField,
  field,
  value
) {
  const escaped =
    escapeString(value);

  const pattern =
    new RegExp(
      `(\\n    ${afterField}:\\s*"[^"]*",)`,
      "m"
    );

  if (
    !pattern.test(block)
  ) {
    return block;
  }

  return block.replace(
    pattern,
    `$1\n    ${field}: "${escaped}",`
  );
}

/*
 * MERGE
 *
 * Solo modifica campos maestros.
 *
 * NO modifica:
 * - slug
 * - image
 * - price
 * - rating
 * - affiliateLinks
 * - descriptions
 * - pros
 * - cons
 * - specifications
 * - espScore
 * - relations
 * - seo
 * - verification
 */
function mergeProductBlock(
  block,
  excelProduct,
  currentProduct
) {
  let result =
    block;

  /*
   * MARCA
   */
  if (
    excelProduct.brand &&
    excelProduct.brand !==
      currentProduct.brand
  ) {
    result =
      replaceField(
        result,
        "brand",
        excelProduct.brand
      );
  }

  /*
   * MPN
   */
  if (
    excelProduct.mpn &&
    excelProduct.mpn !==
      currentProduct.mpn
  ) {
    result =
      replaceField(
        result,
        "mpn",
        excelProduct.mpn
      );
  }

  /*
   * CATEGORÍA
   *
   * Ya llega normalizada desde
   * catalog-normalizer.mjs.
   */
  if (
    excelProduct.category &&
    excelProduct.category !==
      currentProduct.category
  ) {
    result =
      replaceField(
        result,
        "category",
        excelProduct.category
      );
  }

  /*
   * SUBCATEGORÍA
   */
  if (
    excelProduct.subcategory &&
    excelProduct.subcategory !==
      currentProduct.subcategory
  ) {
    result =
      replaceField(
        result,
        "subcategory",
        excelProduct.subcategory
      );
  }

  /*
   * EAN
   *
   * Regla conservadora:
   *
   * - si TS ya tiene EAN → conservar
   * - si V21 tiene EAN y TS no → añadir
   * - nunca sobrescribir automáticamente
   */
  if (
    excelProduct.ean &&
    !currentProduct.ean
  ) {
    if (
      /ean:\s*"[^"]*"/.test(
        result
      )
    ) {
      result =
        replaceField(
          result,
          "ean",
          excelProduct.ean
        );
    } else {
      result =
        addFieldAfter(
          result,
          "mpn",
          "ean",
          excelProduct.ean
        );
    }
  }

  return result;
}

function createBackup() {
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
      `products-${timestamp}.ts`
    );

  fs.copyFileSync(
    PRODUCTS_PATH,
    backupPath
  );

  return backupPath;
}

if (
  !fs.existsSync(
    CATALOG_PATH
  )
) {
  console.error(
    "❌ No se encuentra el catálogo V21."
  );

  process.exit(1);
}

if (
  !fs.existsSync(
    PRODUCTS_PATH
  )
) {
  console.error(
    "❌ No existe data/products.ts."
  );

  process.exit(1);
}

const workbook =
  XLSX.readFile(
    CATALOG_PATH
  );

const excelProducts =
  buildExcelProducts(
    workbook
  );

const currentProducts =
  extractProductsTs();

const currentById =
  new Map(
    currentProducts.map(
      (product) => [
        product.catalogId,
        product,
      ]
    )
  );

let source =
  fs.readFileSync(
    PRODUCTS_PATH,
    "utf8"
  );

let productsFound = 0;
let productsUpdated = 0;
let productsUnchanged = 0;
let productsMissing = 0;
let conflicts = 0;

const changes = [];

console.log("");

console.log(
  "========================================"
);

console.log(
  " ElectroSpainPro — V21 Import Engine"
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
  `Productos V21: ${excelProducts.length}`
);

console.log(
  `Productos TS: ${currentProducts.length}`
);

console.log("");

for (
  const excelProduct
  of excelProducts
) {
  const catalogId =
    excelProduct.catalogId;

  console.log(
    "────────────────────────────────────────"
  );

  console.log(
    `${catalogId} — ${excelProduct.brand} ${excelProduct.mpn}`
  );

  const currentProduct =
    currentById.get(
      catalogId
    );

  if (!currentProduct) {
    console.log(
      "🆕 Producto no encontrado en Data Engine."
    );

    productsMissing += 1;

    continue;
  }

  productsFound += 1;

  const block =
    findProductBlock(
      source,
      catalogId
    );

  if (!block) {
    console.log(
      "🔴 No se pudo localizar el bloque TypeScript."
    );

    conflicts += 1;

    continue;
  }

  const mergedBlock =
    mergeProductBlock(
      block.text,
      excelProduct,
      currentProduct
    );

  if (
    mergedBlock ===
    block.text
  ) {
    console.log(
      "🟢 Sin cambios necesarios."
    );

    productsUnchanged += 1;

    continue;
  }

  const fieldChanges = [];

  if (
    excelProduct.brand &&
    excelProduct.brand !==
      currentProduct.brand
  ) {
    fieldChanges.push(
      `brand: ${currentProduct.brand} → ${excelProduct.brand}`
    );
  }

  if (
    excelProduct.mpn &&
    excelProduct.mpn !==
      currentProduct.mpn
  ) {
    fieldChanges.push(
      `mpn: ${currentProduct.mpn} → ${excelProduct.mpn}`
    );
  }

  if (
    excelProduct.category &&
    excelProduct.category !==
      currentProduct.category
  ) {
    fieldChanges.push(
      `category: ${currentProduct.category} → ${excelProduct.category}`
    );
  }

  if (
    excelProduct.subcategory &&
    excelProduct.subcategory !==
      currentProduct.subcategory
  ) {
    fieldChanges.push(
      `subcategory: ${currentProduct.subcategory} → ${excelProduct.subcategory}`
    );
  }

  if (
    excelProduct.ean &&
    !currentProduct.ean
  ) {
    fieldChanges.push(
      `ean: vacío → ${excelProduct.ean}`
    );
  }

  /*
   * Si el bloque cambia pero no hay
   * ningún campo maestro que cambiar,
   * lo consideramos sin cambios.
   */
  if (
    fieldChanges.length === 0
  ) {
    console.log(
      "🟢 Diferencias fuera de campos importables."
    );

    productsUnchanged += 1;

    continue;
  }

  console.log(
    "🟡 Cambios detectados:"
  );

  for (
    const change
    of fieldChanges
  ) {
    console.log(
      `   ${change}`
    );
  }

  productsUpdated += 1;

  changes.push({
    catalogId,
    block,
    mergedBlock,
    fieldChanges,
  });
}

console.log("");

console.log(
  "========================================"
);

console.log(
  " RESUMEN"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `Productos encontrados: ${productsFound}`
);

console.log(
  `Productos a actualizar: ${productsUpdated}`
);

console.log(
  `Productos sin cambios: ${productsUnchanged}`
);

console.log(
  `Productos nuevos: ${productsMissing}`
);

console.log(
  `Conflictos: ${conflicts}`
);

console.log("");

/*
 * DRY RUN
 */
if (isDryRun) {
  console.log(
    "⚠️ DRY RUN"
  );

  console.log(
    "No se ha modificado data/products.ts."
  );

  console.log("");

  process.exit(
    conflicts > 0
      ? 1
      : 0
  );
}

/*
 * IMPORTACIÓN REAL
 */
if (
  conflicts > 0
) {
  console.error(
    "❌ Hay conflictos. Se cancela la importación."
  );

  console.error(
    "No se ha modificado data/products.ts."
  );

  process.exit(1);
}

if (
  changes.length === 0
) {
  console.log(
    "🟢 No hay cambios que importar."
  );

  process.exit(0);
}

/*
 * BACKUP
 */
const backupPath =
  createBackup();

console.log(
  `💾 Backup creado: ${backupPath}`
);

/*
 * Aplicamos los cambios.
 */
let updatedSource =
  source;

for (
  const change
  of changes
) {
  updatedSource =
    updatedSource.replace(
      change.block.text,
      change.mergedBlock
    );
}

fs.writeFileSync(
  PRODUCTS_PATH,
  updatedSource,
  "utf8"
);

console.log("");

console.log(
  "========================================"
);

console.log(
  " IMPORTACIÓN COMPLETADA"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `🟢 Productos actualizados: ${changes.length}`
);

console.log(
  `💾 Backup: ${backupPath}`
);

console.log(
  `📄 Archivo actualizado: ${PRODUCTS_PATH}`
);

console.log("");