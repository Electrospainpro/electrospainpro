import { offers } from "@/data/offers";

import type {
  Merchant,
  ProductOffer,
} from "@/types/offer";

/**
 * Devuelve todas las ofertas.
 */
export function getAllOffers(): ProductOffer[] {
  return offers;
}

/**
 * Devuelve todas las ofertas asociadas a un producto.
 *
 * Ejemplo:
 * getOffersByProduct("P001")
 */
export function getOffersByProduct(
  productId: string
): ProductOffer[] {
  return offers.filter(
    (offer) => offer.productId === productId
  );
}

/**
 * Devuelve las ofertas de un producto
 * pertenecientes a una tienda concreta.
 */
export function getOffersByProductAndMerchant(
  productId: string,
  merchant: Merchant
): ProductOffer[] {
  return offers.filter(
    (offer) =>
      offer.productId === productId &&
      offer.merchant === merchant
  );
}

/**
 * Devuelve todas las ofertas de una tienda.
 */
export function getOffersByMerchant(
  merchant: Merchant
): ProductOffer[] {
  return offers.filter(
    (offer) => offer.merchant === merchant
  );
}

/**
 * Devuelve ofertas verificadas.
 */
export function getVerifiedOffers(): ProductOffer[] {
  return offers.filter(
    (offer) => offer.status === "verified"
  );
}

/**
 * Devuelve ofertas verificadas y disponibles.
 */
export function getAvailableOffers(): ProductOffer[] {
  return offers.filter(
    (offer) =>
      offer.status === "verified" &&
      offer.inStock !== false
  );
}

/**
 * Devuelve ofertas de un producto que tienen
 * precio disponible.
 */
export function getPricedOffersByProduct(
  productId: string
): ProductOffer[] {
  return getOffersByProduct(productId).filter(
    (offer) =>
      offer.price !== undefined &&
      offer.status === "verified"
  );
}

/**
 * Calcula el coste total de una oferta.
 *
 * Precio + envío.
 */
export function getOfferTotalPrice(
  offer: ProductOffer
): number | undefined {
  if (offer.price === undefined) {
    return undefined;
  }

  return (
    offer.price +
    (offer.shippingCost ?? 0)
  );
}

/**
 * Devuelve la oferta más barata de un producto.
 *
 * Solo considera ofertas verificadas con precio.
 */
export function getBestOfferForProduct(
  productId: string
): ProductOffer | undefined {
  const productOffers =
    getPricedOffersByProduct(productId);

  if (productOffers.length === 0) {
    return undefined;
  }

  return productOffers.reduce(
    (best, current) => {
      const bestTotal =
        getOfferTotalPrice(best);

      const currentTotal =
        getOfferTotalPrice(current);

      if (
        bestTotal === undefined ||
        currentTotal === undefined
      ) {
        return best;
      }

      return currentTotal < bestTotal
        ? current
        : best;
    }
  );
}

/**
 * Devuelve las ofertas de un producto ordenadas
 * de menor a mayor coste total.
 */
export function getOffersSortedByPrice(
  productId: string
): ProductOffer[] {
  return [...getPricedOffersByProduct(productId)].sort(
    (a, b) => {
      const priceA =
        getOfferTotalPrice(a) ?? Number.POSITIVE_INFINITY;

      const priceB =
        getOfferTotalPrice(b) ?? Number.POSITIVE_INFINITY;

      return priceA - priceB;
    }
  );
}

/**
 * Devuelve la URL que debemos utilizar para
 * enviar al usuario a comprar.
 *
 * Si existe URL de afiliación utilizamos esa.
 * En caso contrario utilizamos la URL normal.
 */
export function getOfferClickUrl(
  offer: ProductOffer
): string {
  return (
    offer.affiliateUrl ??
    offer.productUrl
  );
}

/**
 * Devuelve si una oferta puede mostrarse
 * como oferta comercial válida.
 */
export function isOfferPublishable(
  offer: ProductOffer
): boolean {
  return (
    offer.status === "verified" &&
    offer.productUrl.trim().length > 0
  );
}