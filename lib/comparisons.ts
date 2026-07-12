import { comparisons } from "@/data/comparisons";

export function getAllComparisons() {
  return comparisons;
}

export function getComparisonBySlug(
  slug: string
) {
  return comparisons.find(
    (comparison) => comparison.slug === slug
  );
}