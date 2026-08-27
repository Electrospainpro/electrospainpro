import { products } from "@/data/products";
import { offers } from "@/data/offers";

import type { ProductOffer } from "@/types/offer";

/**
 * Devuelve todos los productos.
 */
export function getAllProducts() {
  return products;
}

/**
 * Devuelve un producto mediante su slug.
 */
export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug
  );
}

/**
 * Devuelve productos pertenecientes a una categoría.
 */
export function getProductsByCategory(category: string) {
  return products.filter(
    (product) => product.category === category
  );
}

/**
 * Devuelve productos pertenecientes a una subcategoría.
 */
export function getProductsBySubcategory(
  subcategory: string
) {
  return products.filter(
    (product) => product.subcategory === subcategory
  );
}

/**
 * Devuelve productos de una marca.
 */
export function getProductsByBrand(brand: string) {
  return products.filter(
    (product) => product.brand === brand
  );
}

/**
 * Devuelve todas las ofertas del sistema.
 *
 * Actualmente las ofertas se almacenan en data/offers.ts.
 */
export function getAllOffers(): ProductOffer[] {
  return offers;
}

/**
 * Devuelve las ofertas de un merchant concreto.
 */
export function getOffersByMerchant(
  merchant: ProductOffer["merchant"]
): ProductOffer[] {
  return offers.filter(
    (offer) => offer.merchant === merchant
  );
}

/**
 * Devuelve ofertas que tienen precio disponible.
 */
export function getPricedOffers(): ProductOffer[] {
  return offers.filter(
    (offer) => offer.price !== undefined
  );
}

/**
 * Devuelve ofertas actualmente disponibles.
 */
export function getAvailableOffers(): ProductOffer[] {
  return offers.filter(
    (offer) => offer.inStock !== false
  );
}

/**
 * Devuelve la oferta más barata.
 *
 * El coste total incluye el envío cuando está definido.
 */
export function getBestOffer(): ProductOffer | undefined {
  const availableOffers = getAvailableOffers().filter(
    (offer) => offer.price !== undefined
  );

  if (availableOffers.length === 0) {
    return undefined;
  }

  return availableOffers.reduce(
    (best, current) => {
      const bestTotal =
        (best.price ?? 0) +
        (best.shippingCost ?? 0);

      const currentTotal =
        (current.price ?? 0) +
        (current.shippingCost ?? 0);

      return currentTotal < bestTotal
        ? current
        : best;
    }
  );
}