export const CATEGORY_MAP = {
  herramientas: {
    multimetros: "instrumentacion",
    "pinzas-amperimetricas": "instrumentacion",
  },
};

export function normalizeCategory(
  category,
  subcategory
) {
  const categoryValue = String(
    category ?? ""
  ).trim();

  const subcategoryValue = String(
    subcategory ?? ""
  ).trim();

  const mappedCategory =
    CATEGORY_MAP[categoryValue]?.[
      subcategoryValue
    ];

  if (mappedCategory) {
    return mappedCategory;
  }

  return categoryValue;
}

export function normalizeProductName(
  name,
  brand
) {
  const productName = String(
    name ?? ""
  ).trim();

  const brandName = String(
    brand ?? ""
  ).trim();

  if (!productName) {
    return "";
  }

  if (
    brandName &&
    productName
      .toLowerCase()
      .startsWith(
        brandName.toLowerCase()
      )
  ) {
    return productName;
  }

  return productName;
}

export function normalizeEAN(value) {
  const ean = String(
    value ?? ""
  )
    .trim()
    .replace(/\s+/g, "");

  if (!ean) {
    return "";
  }

  return ean;
}

export function normalizeCatalogProduct(
  product
) {
  return {
    catalogId: String(
      product.catalogId ?? ""
    ).trim(),

    brand: String(
      product.brand ?? ""
    ).trim(),

    mpn: String(
      product.mpn ?? ""
    ).trim(),

    name: normalizeProductName(
      product.name,
      product.brand
    ),

    category: normalizeCategory(
      product.category,
      product.subcategory
    ),

    subcategory: String(
      product.subcategory ?? ""
    ).trim(),

    ean: normalizeEAN(
      product.ean
    ),

    status: String(
      product.status ?? ""
    ).trim(),
  };
}