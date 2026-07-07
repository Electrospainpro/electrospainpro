import { products } from "@/data/products";

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug
  );
}

export function getProductsByCategory(
  category: string
) {
  return products.filter(
    (product) => product.category === category
  );
}

export function getProductsBySubcategory(
  subcategory: string
) {
  return products.filter(
    (product) =>
      product.subcategory === subcategory
  );
}