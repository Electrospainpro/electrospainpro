import { brands } from "@/data/brands";

export function getAllBrands() {
  return brands;
}

export function getBrandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}