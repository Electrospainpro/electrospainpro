import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { comparisons } from "@/data/comparisons";
import { guides } from "@/data/guides";

export function getCatalog() {
  return {
    products,
    brands,
    comparisons,
    guides,
  };
}