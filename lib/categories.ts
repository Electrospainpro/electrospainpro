import { categories } from "@/data/categories";

export function getCategories() {
  return categories;
}

export function getCategory(
  slug: string
) {
  return categories.find(
    (category) => category.slug === slug
  );
}