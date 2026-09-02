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

const isDryRun = process.argv.includes("--dry-run");

/**
 * Normaliza valores procedentes de Excel/TypeScript.
 */
function normalize(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value).trim();
}

/**
 * Obtiene las filas de una hoja Excel.
 */
function getRows(workbook, sheetName) {
  const worksheet = workbook.Sheets[sheetName];

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

/**
 * Escapa valores para introducirlos
 * como strings TypeScript.
 */
function escapeString(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

/**
 * Lee data/products.ts y extrae los campos
 * maestros necesarios para comparar.
 *
 * IMPORTANTE:
 * No intenta reconstruir el objeto completo.
 * El objeto completo puede contener:
 * - espScore
 * - specifications
 * - affiliateLinks
 * - seo
 * - relaciones
 * - etc.
 *
 * Solo extraemos los campos que controla
 * directamente IMPORT_PRODUCTS_TS.
 */
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

  const catalogMatches = source.matchAll(
    /catalogId\s*:\s*"([^"]+)"/g
  );

  for (const match of catalogMatches) {
    const catalogId = normalize(match[1]);

    const block = findProductBlock(
      source,
      catalogId
    );

    if (!block) {
      continue;
    }

    const productSource = block.text;

    const brandMatch = productSource.match(
      /\bbrand\s*:\s*"([^"]*)"/
    );

    const mpnMatch = productSource.match(
      /\bmpn\s*:\s*"([^"]*)"/
    );

    const nameMatch = productSource.match(
      /\bname\s*:\s*"([^"]*)"/
    );

    const categoryMatch = productSource.match(
      /\bcategory\s*:\s*"([^"]*)"/
    );

    const subcategoryMatch = productSource.match(
      /\bsubcategory\s*:\s*"([^"]*)"/
    );

    const eanMatch = productSource.match(
      /\bean\s*:\s*"([^"]*)"/
    );

    products.push({
      catalogId,
      brand: normalize(brandMatch?.[1]),
      mpn: normalize(mpnMatch?.[1]),
      name: normalize(nameMatch?.[1]),
      category: normalize(categoryMatch?.[1]),
      subcategory: normalize(subcategoryMatch?.[1]),
      ean: normalize(eanMatch?.[1]),
    });
  }

  return products;
}

/**
 * Convierte las filas de Excel en productos
 * normalizados.
 */
function buildExcelProducts(workbook) {
  const rows = getRows(
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

/**
 * ------------------------------------------------------------------
 * PARSER ESTRUCTURAL DE PRODUCTOS
 * ------------------------------------------------------------------
 *
 * El parser anterior utilizaba una expresión regular para localizar
 * bloques completos:
 *
 *   {
 *      ...
 *   },
 *
 * Eso deja de ser fiable cuando los productos contienen objetos,
 * arrays, strings complejos, affiliateLinks, espScore, etc.
 *
 * Aquí localizamos el objeto por catalogId y calculamos su cierre
 * real respetando:
 *
 * - objetos {}
 * - arrays []
 * - strings ""
 * - strings ''
 * - template literals ``
 * - comentarios // ...
 * - comentarios /* ... *\/
 *
 * De esta forma el contenido interno del producto puede crecer
 * libremente sin romper el importador.
 * ------------------------------------------------------------------
 */

/**
 * Determina si estamos ante un carácter escapado.
 */
function isEscaped(source, index) {
  let backslashes = 0;
  let cursor = index - 1;

  while (
    cursor >= 0 &&
    source[cursor] === "\\"
  ) {
    backslashes += 1;
    cursor -= 1;
  }

  return backslashes % 2 === 1;
}

/**
 * Encuentra el objeto TypeScript que contiene
 * un catalogId determinado.
 */
function findProductBlock(source, catalogId) {
  const catalogPattern = new RegExp(
    `\\bcatalogId\\s*:\\s*"${escapeRegExp(catalogId)}"`
  );

  const catalogMatch =
    catalogPattern.exec(source);

  if (!catalogMatch) {
    return null;
  }

  const catalogIndex =
    catalogMatch.index;

  /**
   * Buscamos hacia atrás el { que abre
   * el objeto del producto.
   *
   * No basta con buscar el primer { anterior:
   * debemos encontrar el último { que pueda
   * contener este catalogId.
   */
  const openingBrace =
    findOpeningBraceForCatalog(
      source,
      catalogIndex
    );

  if (openingBrace === -1) {
    return null;
  }

  const closingBrace =
    findMatchingBrace(
      source,
      openingBrace
    );

  if (closingBrace === -1) {
    return null;
  }

  /**
   * Incluimos la coma posterior al objeto
   * cuando existe.
   *
   * Ejemplo:
   *
   * {
   *   catalogId: "P001",
   *   ...
   * },
   *
   * Esto permite conservar exactamente
   * la estructura del array.
   */
  let end = closingBrace + 1;

  while (
    end < source.length &&
    /\s/.test(source[end])
  ) {
    end += 1;
  }

  if (source[end] === ",") {
    end += 1;
  }

  const start = openingBrace;

  return {
    text: source.slice(start, end),
    start,
    end,
  };
}

/**
 * Escapa un valor para utilizarlo dentro
 * de una expresión regular.
 */
function escapeRegExp(value) {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

/**
 * Busca hacia atrás el { que corresponde
 * al objeto que contiene catalogId.
 *
 * Utilizamos un análisis estructural desde
 * el inicio de la fuente para evitar errores
 * provocados por objetos anidados.
 */
function findOpeningBraceForCatalog(
  source,
  catalogIndex
) {
  const stack = [];

  let stringQuote = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (
    let index = 0;
    index < catalogIndex;
    index += 1
  ) {
    const char = source[index];
    const next = source[index + 1];

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }

      continue;
    }

    if (inBlockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        inBlockComment = false;
        index += 1;
      }

      continue;
    }

    if (stringQuote) {
      if (
        char === stringQuote &&
        !isEscaped(source, index)
      ) {
        stringQuote = null;
      }

      continue;
    }

    if (
      char === "/" &&
      next === "/"
    ) {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      stringQuote = char;
      continue;
    }

    if (
      char === "{" ||
      char === "["
    ) {
      stack.push({
        char,
        index,
      });

      continue;
    }

    if (
      char === "}" ||
      char === "]"
    ) {
      if (stack.length === 0) {
        continue;
      }

      const expected =
        char === "}"
          ? "{"
          : "[";

      if (
        stack[stack.length - 1].char ===
        expected
      ) {
        stack.pop();
      }
    }
  }

  /**
   * El último { abierto antes de catalogId
   * es el candidato al objeto del producto.
   *
   * Debemos comprobar que no esté dentro
   * de un array/objeto anidado.
   */
  for (
    let index = stack.length - 1;
    index >= 0;
    index -= 1
  ) {
    if (
      stack[index].char === "{"
    ) {
      return stack[index].index;
    }
  }

  return -1;
}

/**
 * Encuentra la llave } que cierra el objeto
 * abierto en openingIndex.
 */
function findMatchingBrace(
  source,
  openingIndex
) {
  let depth = 0;

  let stringQuote = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (
    let index = openingIndex;
    index < source.length;
    index += 1
  ) {
    const char = source[index];
    const next = source[index + 1];

    if (inLineComment) {
      if (char === "\n") {
        inLineComment = false;
      }

      continue;
    }

    if (inBlockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        inBlockComment = false;
        index += 1;
      }

      continue;
    }

    if (stringQuote) {
      if (
        char === stringQuote &&
        !isEscaped(source, index)
      ) {
        stringQuote = null;
      }

      continue;
    }

    if (
      char === "/" &&
      next === "/"
    ) {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      stringQuote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

/**
 * Reemplaza un campo string existente.
 */
function replaceField(
  block,
  field,
  value
) {
  const escaped =
    escapeString(value);

  const pattern = new RegExp(
    `(\\n[ \\t]+${escapeRegExp(field)}\\s*:\\s*)"[^"]*"`,
    "m"
  );

  if (!pattern.test(block)) {
    return block;
  }

  return block.replace(
    pattern,
    `$1"${escaped}"`
  );
}

/**
 * Añade un campo string después de
 * otro campo existente.
 */
function addFieldAfter(
  block,
  afterField,
  field,
  value
) {
  const escaped =
    escapeString(value);

  const pattern = new RegExp(
    `(\\n[ \\t]+${escapeRegExp(afterField)}\\s*:\\s*"[^"]*",)`,
    "m"
  );

  if (!pattern.test(block)) {
    return block;
  }

  return block.replace(
    pattern,
    `$1\n    ${field}: "${escaped}",`
  );
}

/**
 * MERGE
 *
 * El Excel V21 controla los campos maestros.
 *
 * No eliminamos ni reconstruimos el resto
 * del objeto TypeScript.
 *
 * Por tanto se conservan:
 *
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
 * - cualquier campo futuro
 *
 * que no pertenezca a IMPORT_PRODUCTS_TS.
 */
function mergeProductBlock(
  block,
  excelProduct,
  currentProduct
) {
  let result = block;

  /**
   * MARCA
   */
  if (
    excelProduct.brand &&
    excelProduct.brand !==
      currentProduct.brand
  ) {
    result = replaceField(
      result,
      "brand",
      excelProduct.brand
    );
  }

  /**
   * MPN
   */
  if (
    excelProduct.mpn &&
    excelProduct.mpn !==
      currentProduct.mpn
  ) {
    result = replaceField(
      result,
      "mpn",
      excelProduct.mpn
    );
  }

  /**
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
    result = replaceField(
      result,
      "category",
      excelProduct.category
    );
  }

  /**
   * SUBCATEGORÍA
   */
  if (
    excelProduct.subcategory &&
    excelProduct.subcategory !==
      currentProduct.subcategory
  ) {
    result = replaceField(
      result,
      "subcategory",
      excelProduct.subcategory
    );
  }

  /**
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
      /(?:\n[ \t]+)ean\s*:\s*"[^"]*"/.test(
        result
      )
    ) {
      result = replaceField(
        result,
        "ean",
        excelProduct.ean
      );
    } else {
      result = addFieldAfter(
        result,
        "mpn",
        "ean",
        excelProduct.ean
      );
    }
  }

  return result;
}

/**
 * Crea backup de products.ts antes
 * de una importación real.
 */
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

/**
 * ------------------------------------------------------------------
 * VALIDACIONES INICIALES
 * ------------------------------------------------------------------
 */

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

/**
 * ------------------------------------------------------------------
 * CARGA
 * ------------------------------------------------------------------
 */

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

/**
 * ------------------------------------------------------------------
 * PROCESAMIENTO
 * ------------------------------------------------------------------
 */

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

  /**
   * Detectamos únicamente cambios
   * en campos realmente importables.
   */
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

  /**
   * Si no hay cambios maestros,
   * no hacemos nada.
   */
  if (
    fieldChanges.length === 0
  ) {
    console.log(
      "🟢 Sin cambios necesarios."
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

/**
 * ------------------------------------------------------------------
 * RESUMEN
 * ------------------------------------------------------------------
 */

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

/**
 * ------------------------------------------------------------------
 * DRY RUN
 * ------------------------------------------------------------------
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

/**
 * ------------------------------------------------------------------
 * IMPORTACIÓN REAL
 * ------------------------------------------------------------------
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

/**
 * ------------------------------------------------------------------
 * BACKUP
 * ------------------------------------------------------------------
 */

const backupPath =
  createBackup();

console.log(
  `💾 Backup creado: ${backupPath}`
);

/**
 * ------------------------------------------------------------------
 * APLICACIÓN
 * ------------------------------------------------------------------
 *
 * Importante:
 *
 * Aplicamos los cambios desde el final
 * hacia el principio.
 *
 * Así las posiciones de los bloques
 * anteriores no se ven afectadas por
 * modificaciones de longitud.
 * ------------------------------------------------------------------
 */

const orderedChanges =
  [...changes].sort(
    (a, b) =>
      b.block.start -
      a.block.start
  );

let updatedSource =
  source;

for (
  const change
  of orderedChanges
) {
  updatedSource =
    updatedSource.slice(
      0,
      change.block.start
    ) +
    change.mergedBlock +
    updatedSource.slice(
      change.block.end
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