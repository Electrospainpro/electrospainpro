import { products } from "@/data/products";
import { relations } from "@/data/relations";
import {
  CatalogRelation,
  CatalogRelationType,
} from "@/types/relations";

/**
 * Devuelve un producto por su catalogId.
 */
export function getProductByCatalogId(
  catalogId: string
) {
  return products.find(
    (product) =>
      product.catalogId === catalogId
  );
}

/**
 * Devuelve todas las relaciones de un producto
 * como origen.
 */
export function getRelationsForProduct(
  catalogId: string
): CatalogRelation[] {
  return relations.filter(
    (relation) =>
      relation.sourceId === catalogId
  );
}

/**
 * Devuelve relaciones de un tipo concreto.
 */
export function getRelationsByType(
  catalogId: string,
  type: CatalogRelationType
): CatalogRelation[] {
  return relations.filter(
    (relation) =>
      relation.sourceId === catalogId &&
      relation.type === type
  );
}

/**
 * Devuelve productos relacionados de un tipo concreto
 * junto con la relación editorial que los conecta.
 */
export function getProductRelationsByType(
  catalogId: string,
  type: CatalogRelationType
) {
  return getRelationsByType(
    catalogId,
    type
  )
    .map((relation) => {
      const product =
        getProductByCatalogId(
          relation.targetId
        );

      if (!product) {
        return null;
      }

      return {
        product,
        relation,
      };
    })
    .filter(
      (
        item
      ): item is NonNullable<
        typeof item
      > => Boolean(item)
    );
}

/**
 * Devuelve las variantes del producto.
 */
export function getVariantProducts(
  catalogId: string
) {
  return getProductRelationsByType(
    catalogId,
    "variant"
  );
}

/**
 * Devuelve productos relacionados editorialmente.
 */
export function getRelatedProducts(
  catalogId: string
) {
  return getProductRelationsByType(
    catalogId,
    "related"
  );
}

/**
 * Devuelve productos relacionados mediante
 * una relación de comparación.
 *
 * Esto todavía NO representa una página Comparison.
 * Representa únicamente la relación producto-producto
 * definida en V21.
 */
export function getComparisonProducts(
  catalogId: string
) {
  return getProductRelationsByType(
    catalogId,
    "comparison"
  );
}

/**
 * Devuelve la relación existente entre dos productos.
 */
export function getRelationBetweenProducts(
  sourceId: string,
  targetId: string
): CatalogRelation | undefined {
  return relations.find(
    (relation) =>
      relation.sourceId === sourceId &&
      relation.targetId === targetId
  );
}

/**
 * Devuelve todas las relaciones V21.
 */
export function getAllRelations(): CatalogRelation[] {
  return relations;
}