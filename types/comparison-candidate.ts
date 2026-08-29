import type { Product } from "./product";

/**
 * Estado editorial de una comparativa candidata.
 *
 * candidate:
 * Detectada automáticamente desde el catálogo V21.
 *
 * review:
 * Seleccionada para revisión editorial.
 *
 * published:
 * Convertida en una comparativa publicada.
 */
export type ComparisonCandidateStatus =
  | "candidate"
  | "review"
  | "published";

/**
 * Candidato a comparativa procedente del catálogo V21.
 *
 * Importante:
 * Un candidato NO es todavía una Comparison publicada.
 */
export interface ComparisonCandidate {
  sourceId: string;
  targetId: string;

  sourceProduct: Product;
  targetProduct: Product;

  editorialReason: string;

  status: ComparisonCandidateStatus;
}