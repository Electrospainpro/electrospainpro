import { products } from "@/data/products";
import { relations } from "@/data/relations";
import type { Product } from "@/types/product";
import type { CatalogRelationType } from "@/types/relations";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(
  slug: string
): Product | undefined {
  return products.find(
    (product) => product.slug === slug
  );
}

export function getProductByCatalogId(
  catalogId: string
): Product | undefined {
  return products.find(
    (product) => product.catalogId === catalogId
  );
}

export function getProductsByCategory(
  category: string
): Product[] {
  return products.filter(
    (product) => product.category === category
  );
}

export function getProductsBySubcategory(
  subcategory: string
): Product[] {
  return products.filter(
    (product) => product.subcategory === subcategory
  );
}

export function getProductsByBrand(
  brand: string
): Product[] {
  return products.filter(
    (product) => product.brand === brand
  );
}

/**
 * Obtiene las relaciones editoriales del catálogo
 * para un producto concreto.
 */
export function getProductRelations(
  catalogId: string
) {
  return relations.filter(
    (relation) =>
      relation.sourceId === catalogId
  );
}

/**
 * Obtiene productos relacionados junto con
 * la información editorial de la relación.
 */
export function getRelatedProducts(
  catalogId: string
) {
  return getProductRelations(catalogId)
    .map((relation) => {
      const product = getProductByCatalogId(
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
      ): item is {
        product: Product;
        relation: {
          sourceId: string;
          targetId: string;
          type: CatalogRelationType;
          editorialReason?: string;
        };
      } => item !== null
    );
}