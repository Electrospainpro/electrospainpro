import { categories } from "@/data/categories";

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find(
    (category) => category.slug === slug
  );
}