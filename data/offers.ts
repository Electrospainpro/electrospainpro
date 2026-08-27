import type { ProductOffer } from "@/types/offer";

/**
 * Ofertas comerciales de ElectroSpainPro.
 *
 * Los datos comerciales se incorporan únicamente cuando
 * la referencia del fabricante ha sido identificada.
 */
export const offers: ProductOffer[] = [
  {
    id: "O-P001-MANOMANO",

    productId: "P001",

    merchant: "manomano",

    sku: "ME9636435",

    mpn: "A9F79116",

    ean: "3606480093142",

    price: 16.26,

    shippingCost: undefined,

    currency: "EUR",

    inStock: true,

    delivery: undefined,

    productUrl:
      "https://www.manomano.fr/p/acti9-ic60n-disjoncteur-1p-2a-courbe-c-a9f74102-67005573?model_id=9636435",

    affiliateUrl: undefined,

    commission: undefined,

    checkedAt: "2026-08-27",

    status: "verified",

    source:
      "ManoMano - referencia ME9636435",
  },
];