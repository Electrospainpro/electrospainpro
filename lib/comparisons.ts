import { comparisons } from "@/data/comparisons";

import {
  getComparisonProducts,
} from "@/lib/relations";

import {
  getComparisonCandidates,
} from "@/lib/comparison-candidates";

/**
 * Devuelve todas las comparativas publicadas.
 */
export function getAllComparisons() {
  return comparisons;
}

/**
 * Busca una comparativa publicada por slug.
 */
export function getComparisonBySlug(
  slug: string
) {
  return comparisons.find(
    (comparison) =>
      comparison.slug === slug
  );
}

/**
 * Devuelve los productos que V21 marca como
 * comparables para un producto.
 *
 * Esto NO crea una Comparison.
 */
export function getComparisonCandidatesForProduct(
  catalogId: string
) {
  return getComparisonProducts(
    catalogId
  );
}

/**
 * Comprueba si dos productos están relacionados
 * como comparación en V21.
 */
export function areProductsComparable(
  sourceId: string,
  targetId: string
) {
  const sourceCandidates =
    getComparisonProducts(sourceId);

  return sourceCandidates.some(
    (item) =>
      item.product.catalogId === targetId
  );
}

/**
 * Devuelve todos los candidatos a comparativa
 * procedentes del catálogo V21.
 */
export function getAllV21ComparisonCandidates() {
  return getComparisonCandidates();
}