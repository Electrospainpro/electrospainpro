import { offers } from "@/data/offers";
import type {
  Merchant,
  ProductOffer,
} from "@/types/offer";

/**
 * Devuelve todas las ofertas del catálogo.
 */
export function getAllOffers(): ProductOffer[] {
  return offers;
}

/**
 * Devuelve todas las ofertas asociadas a un producto.
 */
export function getOffersByProduct(
  productId: string
): ProductOffer[] {
  return offers.filter(
    (offer) => offer.productId === productId
  );
}

/**
 * Devuelve únicamente ofertas verificadas.
 */
export function getVerifiedOffers(): ProductOffer[] {
  return offers.filter(
    (offer) => offer.status === "verified"
  );
}

/**
 * Devuelve ofertas verificadas de un producto.
 */
export function getVerifiedOffersByProduct(
  productId: string
): ProductOffer[] {
  return getOffersByProduct(productId).filter(
    (offer) => offer.status === "verified"
  );
}

/**
 * Devuelve todas las ofertas de un merchant.
 */
export function getOffersByMerchant(
  merchant: Merchant
): ProductOffer[] {
  return offers.filter(
    (offer) => offer.merchant === merchant
  );
}

/**
 * Devuelve ofertas verificadas de un merchant.
 */
export function getVerifiedOffersByMerchant(
  merchant: Merchant
): ProductOffer[] {
  return getOffersByMerchant(merchant).filter(
    (offer) => offer.status === "verified"
  );
}

/**
 * Devuelve únicamente ofertas que tienen
 * una URL de afiliación.
 */
export function getAffiliateOffers(): ProductOffer[] {
  return offers.filter(
    (offer) =>
      offer.status === "verified" &&
      Boolean(offer.affiliateUrl)
  );
}

/**
 * Devuelve las ofertas afiliadas de un producto.
 */
export function getAffiliateOffersByProduct(
  productId: string
): ProductOffer[] {
  return getOffersByProduct(productId).filter(
    (offer) =>
      offer.status === "verified" &&
      Boolean(offer.affiliateUrl)
  );
}

/**
 * Devuelve ofertas comerciales verificadas
 * que todavía no tienen afiliación.
 */
export function getCommercialOffers(): ProductOffer[] {
  return offers.filter(
    (offer) =>
      offer.status === "verified" &&
      !offer.affiliateUrl
  );
}

/**
 * Devuelve ofertas comerciales verificadas
 * de un producto.
 */
export function getCommercialOffersByProduct(
  productId: string
): ProductOffer[] {
  return getOffersByProduct(productId).filter(
    (offer) =>
      offer.status === "verified" &&
      !offer.affiliateUrl
  );
}

/**
 * Devuelve el mejor precio comparable.
 *
 * Solo compara ofertas cuyo precio:
 * - existe
 * - está marcado como impuestos incluidos
 *
 * No compara precios con fiscalidad desconocida
 * o excluida.
 */
export function getBestComparableOffer(
  productId: string
): ProductOffer | undefined {
  const comparableOffers =
    getVerifiedOffersByProduct(productId)
      .filter(
        (offer) =>
          offer.price !== undefined &&
          offer.priceTaxStatus === "included"
      )
      .sort(
        (a, b) =>
          (a.price ?? Infinity) -
          (b.price ?? Infinity)
      );

  return comparableOffers[0];
}

/**
 * Devuelve la mejor oferta afiliada comparable.
 *
 * Esta función será especialmente importante
 * para la monetización del proyecto.
 */
export function getBestAffiliateOffer(
  productId: string
): ProductOffer | undefined {
  const affiliateOffers =
    getAffiliateOffersByProduct(productId)
      .filter(
        (offer) =>
          offer.price !== undefined &&
          offer.priceTaxStatus === "included"
      )
      .sort(
        (a, b) =>
          (a.price ?? Infinity) -
          (b.price ?? Infinity)
      );

  return affiliateOffers[0];
}

/**
 * Cuenta las ofertas verificadas de un producto.
 */
export function countVerifiedOffers(
  productId: string
): number {
  return getVerifiedOffersByProduct(productId).length;
}

/**
 * Cuenta las ofertas afiliadas de un producto.
 */
export function countAffiliateOffers(
  productId: string
): number {
  return getAffiliateOffersByProduct(productId).length;
}