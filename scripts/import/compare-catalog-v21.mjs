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

function extractProductsTs() {
  if (!fs.existsSync(PRODUCTS_PATH)) {
    console.error(
      `❌ No existe ${PRODUCTS_PATH}`
    );

    process.exit(1);
  }

  const source = fs.readFileSync(
    PRODUCTS_PATH,
    "utf8"
  );

  const products = [];

  const blocks = source.split(/\n\s*\{\n/);

  for (const block of blocks) {
    const catalogMatch = block.match(
      /catalogId:\s*"([^"]+)"/
    );

    if (!catalogMatch) {
      continue;
    }

    const brandMatch = block.match(
      /brand:\s*"([^"]+)"/
    );

    const mpnMatch = block.match(
      /mpn:\s*"([^"]+)"/
    );

    const nameMatch = block.match(
      /name:\s*"([^"]+)"/
    );

    const categoryMatch = block.match(
      /category:\s*"([^"]+)"/
    );

    const subcategoryMatch = block.match(
      /subcategory:\s*"([^"]+)"/
    );

    const eanMatch = block.match(
      /ean:\s*"([^"]+)"/
    );

    products.push({
      catalogId: normalize(
        catalogMatch[1]
      ),
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

function normalizeForComparison(product) {
  return normalizeCatalogProduct({
    catalogId: product.catalogId,
    brand: product.brand,
    mpn: product.mpn,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    ean: product.ean,
    status: product.status,
  });
}

if (!fs.existsSync(CATALOG_PATH)) {
  console.error(
    "❌ No se encuentra el catálogo V21."
  );

  process.exit(1);
}

const workbook = XLSX.readFile(
  CATALOG_PATH
);

const excelRows = getRows(
  workbook,
  "IMPORT_PRODUCTS_TS"
);

const tsProducts = extractProductsTs();

const excelProducts = excelRows
  .filter((row) =>
    Object.values(row).some(
      (value) => normalize(value) !== ""
    )
  )
  .map((row) => ({
    catalogId: normalize(
      row.product_id
    ),
    brand: normalize(
      row.brand
    ),
    mpn: normalize(
      row.mpn
    ),
    name: normalize(
      row.name
    ),
    category: normalize(
      row.category
    ),
    subcategory: normalize(
      row.subcategory
    ),
    ean: normalize(
      row.ean
    ),
    status: normalize(
      row.status
    ),
  }));

const tsById = new Map(
  tsProducts.map((product) => [
    product.catalogId,
    product,
  ])
);

console.log("");
console.log("========================================");
console.log(" ElectroSpainPro — V21 Catalog Compare");
console.log("========================================");
console.log("");

console.log(
  `Excel: ${excelProducts.length} productos`
);

console.log(
  `Data Engine: ${tsProducts.length} productos`
);

console.log("");

let aligned = 0;
let differences = 0;
let missing = 0;

for (const excelProduct of excelProducts) {
  const current = tsById.get(
    excelProduct.catalogId
  );

  console.log(
    "────────────────────────────────────────"
  );

  console.log(
    `${excelProduct.catalogId} — ${excelProduct.brand} ${excelProduct.mpn}`
  );

  if (!current) {
    console.log(
      "🆕 NO EXISTE EN DATA ENGINE"
    );

    missing += 1;

    continue;
  }

  const excelNormalized =
    normalizeForComparison(
      excelProduct
    );

  const tsNormalized =
    normalizeForComparison(
      current
    );

  let productAligned = true;

  /*
   * IDENTIDAD
   *
   * Estos campos sí deben coincidir.
   */
  const identityFields = [
    ["brand", excelNormalized.brand, tsNormalized.brand],
    ["mpn", excelNormalized.mpn, tsNormalized.mpn],
  ];

  /*
   * CLASIFICACIÓN
   *
   * Se compara después de aplicar
   * las reglas del Data Engine.
   */
  const classificationFields = [
    [
      "category",
      excelNormalized.category,
      tsNormalized.category,
    ],
    [
      "subcategory",
      excelNormalized.subcategory,
      tsNormalized.subcategory,
    ],
  ];

  for (const [
    field,
    excelValue,
    tsValue,
  ] of identityFields) {
    if (excelValue === tsValue) {
      console.log(
        `🟢 ${field}: ${tsValue}`
      );
    } else {
      console.log(
        `🔴 ${field}:`
      );

      console.log(
        `   Excel: ${excelValue || "(vacío)"}`
      );

      console.log(
        `   TS:    ${tsValue || "(vacío)"}`
      );

      productAligned = false;
    }
  }

  for (const [
    field,
    excelValue,
    tsValue,
  ] of classificationFields) {
    if (excelValue === tsValue) {
      console.log(
        `🟢 ${field}: ${tsValue}`
      );
    } else {
      console.log(
        `🟠 ${field}:`
      );

      console.log(
        `   Excel normalizado: ${
          excelValue || "(vacío)"
        }`
      );

      console.log(
        `   TS: ${
          tsValue || "(vacío)"
        }`
      );

      productAligned = false;
    }
  }

  /*
   * NOMBRE
   *
   * No se considera conflicto.
   * El Data Engine puede utilizar un nombre
   * editorial más completo.
   */
  console.log(
    `🟢 name: compatible`
  );

  console.log(
    `   Excel: ${excelProduct.name}`
  );

  console.log(
    `   TS:    ${current.name}`
  );

  /*
   * EAN
   *
   * Si existe en ambas fuentes debe coincidir.
   *
   * Si solo existe en TS, lo conservamos.
   * Si solo existe en Excel, lo señalamos
   * para futura incorporación.
   */
  const excelEAN =
    excelNormalized.ean;

  const tsEAN =
    tsNormalized.ean;

  if (
    excelEAN &&
    tsEAN
  ) {
    if (excelEAN === tsEAN) {
      console.log(
        `🟢 ean: ${tsEAN}`
      );
    } else {
      console.log(
        `🔴 ean: conflicto`
      );

      console.log(
        `   Excel: ${excelEAN}`
      );

      console.log(
        `   TS:    ${tsEAN}`
      );

      productAligned = false;
    }
  } else if (
    !excelEAN &&
    tsEAN
  ) {
    console.log(
      `🟢 ean: conservado desde Data Engine`
    );

    console.log(
      `   TS: ${tsEAN}`
    );
  } else if (
    excelEAN &&
    !tsEAN
  ) {
    console.log(
      `🟡 ean: disponible en V21`
    );

    console.log(
      `   Excel: ${excelEAN}`
    );

    console.log(
      `   TS:    (vacío)`
    );
  } else {
    console.log(
      `⚪ ean: no disponible`
    );
  }

  console.log(
    `ℹ️ Estado V21: ${
      excelNormalized.status || "(sin estado)"
    }`
  );

  if (productAligned) {
    console.log(
      `🟢 ${excelProduct.catalogId}: alineado`
    );

    aligned += 1;
  } else {
    console.log(
      `⚠️ ${excelProduct.catalogId}: requiere revisión`
    );

    differences += 1;
  }
}

console.log("");
console.log("========================================");
console.log(" RESULTADO");
console.log("========================================");
console.log("");

console.log(
  `🟢 Productos alineados: ${aligned}`
);

console.log(
  `🟠 Productos con diferencias: ${differences}`
);

console.log(
  `🆕 Productos nuevos: ${missing}`
);

console.log("");

console.log(
  "ℹ️ Este comando SOLO compara."
);

console.log(
  "ℹ️ No modifica data/products.ts."
);

console.log("");