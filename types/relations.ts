/**
 * Tipos de relación definidos por el catálogo V21.
 */
export type CatalogRelationType =
  | "variant"
  | "comparison"
  | "related";

/**
 * Relación entre dos productos del catálogo.
 *
 * sourceId:
 * Producto origen de la relación.
 *
 * targetId:
 * Producto destino.
 *
 * type:
 * Tipo editorial definido por V21.
 *
 * editorialReason:
 * Motivo por el que el catálogo establece
 * esta relación.
 */
export interface CatalogRelation {
  sourceId: string;
  targetId: string;
  type: CatalogRelationType;
  editorialReason?: string;
}