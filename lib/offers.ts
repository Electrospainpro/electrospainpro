import { offers } from "@/data/offers";
import type { ProductOffer } from "@/types/offer";

/*
 * ==========================================================
 * TODAS LAS OFERTAS
 * ==========================================================
 */

export function getAllOffers(): ProductOffer[] {
  return offers;
}

/*
 * ==========================================================
 * OFERTAS POR PRODUCTO
 * ==========================================================
 */

export function getOffersByProductId(
  productId: string,
): ProductOffer[] {
  return offers.filter(
    (offer: ProductOffer) =>
      offer.productId === productId,
  );
}

/*
 * ==========================================================
 * COMPATIBILIDAD
 * ==========================================================
 *
 * Algunos componentes anteriores del proyecto utilizan
 * getOffersByProduct().
 *
 * Mantenemos este alias para no romper esos componentes
 * mientras centralizamos el sistema en
 * getOffersByProductId().
 */

export function getOffersByProduct(
  productId: string,
): ProductOffer[] {
  return getOffersByProductId(productId);
}