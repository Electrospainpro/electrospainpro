import type { ProductOffer } from "@/types/offer";

/**
 * Devuelve únicamente las ofertas disponibles.
 */
export function getAvailableOffers(
  offers: ProductOffer[] = []
): ProductOffer[] {
  return offers.filter((offer) => offer.inStock !== false);
}

/**
 * Devuelve las ofertas pertenecientes a una tienda concreta.
 */
export function getOffersByMerchant(
  offers: ProductOffer[] = [],
  merchant: ProductOffer["merchant"]
): ProductOffer[] {
  return offers.filter((offer) => offer.merchant === merchant);
}

/**
 * Calcula el coste total estimado de una oferta.
 *
 * Si no existe coste de envío, se considera 0 €.
 */
export function getOfferTotalPrice(
  offer: ProductOffer
): number | undefined {
  if (offer.price === undefined) {
    return undefined;
  }

  return offer.price + (offer.shippingCost ?? 0);
}

/**
 * Devuelve la oferta con el menor coste total.
 *
 * Las ofertas sin precio no se tienen en cuenta.
 */
export function getBestOffer(
  offers: ProductOffer[] = []
): ProductOffer | undefined {
  const availableOffers = getAvailableOffers(offers).filter(
    (offer) => getOfferTotalPrice(offer) !== undefined
  );

  if (availableOffers.length === 0) {
    return undefined;
  }

  return availableOffers.reduce((best, current) => {
    const bestPrice = getOfferTotalPrice(best)!;
    const currentPrice = getOfferTotalPrice(current)!;

    return currentPrice < bestPrice ? current : best;
  });
}

/**
 * Devuelve el precio más bajo disponible.
 */
export function getBestPrice(
  offers: ProductOffer[] = []
): number | undefined {
  const bestOffer = getBestOffer(offers);

  if (!bestOffer) {
    return undefined;
  }

  return getOfferTotalPrice(bestOffer);
}

/**
 * Ordena las ofertas desde la más barata hasta la más cara.
 *
 * Las ofertas sin precio quedan al final.
 */
export function sortOffersByPrice(
  offers: ProductOffer[] = []
): ProductOffer[] {
  return [...offers].sort((a, b) => {
    const priceA = getOfferTotalPrice(a);
    const priceB = getOfferTotalPrice(b);

    if (priceA === undefined && priceB === undefined) {
      return 0;
    }

    if (priceA === undefined) {
      return 1;
    }

    if (priceB === undefined) {
      return -1;
    }

    return priceA - priceB;
  });
}