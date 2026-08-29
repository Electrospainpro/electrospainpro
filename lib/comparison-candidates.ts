import { products } from "@/data/products";
import { relations } from "@/data/relations";

import type {
  ComparisonCandidate,
} from "@/types/comparison-candidate";

/**
 * Devuelve todos los candidatos a comparativa
 * definidos explícitamente por el catálogo V21.
 *
 * Este resolver:
 *
 * - no publica comparativas
 * - no inventa criterios
 * - no calcula ganadores
 * - no genera contenido editorial
 * - no modifica ningún archivo
 */
export function getComparisonCandidates(): ComparisonCandidate[] {
  const candidates: ComparisonCandidate[] = [];

  for (const relation of relations) {
    if (relation.type !== "comparison") {
      continue;
    }

    const sourceProduct =
      products.find(
        (product) =>
          product.catalogId ===
          relation.sourceId
      );

    const targetProduct =
      products.find(
        (product) =>
          product.catalogId ===
          relation.targetId
      );

    if (
      !sourceProduct ||
      !targetProduct
    ) {
      continue;
    }

    candidates.push({
      sourceId: relation.sourceId,

      targetId: relation.targetId,

      sourceProduct,

      targetProduct,

      editorialReason:
        relation.editorialReason ??
        "Comparación definida en el catálogo V21.",

      status: "candidate",
    });
  }

  return candidates;
}