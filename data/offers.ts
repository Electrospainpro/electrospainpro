import type { ProductOffer } from "@/types/offer";

/**
 * Ofertas comerciales de ElectroSpainPro.
 *
 * Solo se incorporan ofertas cuya identidad del producto
 * haya podido comprobarse mediante MPN/EAN u otros datos
 * inequívocos.
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

    priceTaxStatus: "unknown",

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

  {
    id: "O-P004-FARNELL",

    productId: "P004",

    merchant: "farnell",

    sku: "1274602",

    mpn: "FLUKE 117",

    ean: "0095969344852",

    /*
     * Farnell publica actualmente este precio
     * SIN IVA.
     */
    price: 341.05,

    priceTaxStatus: "excluded",

    taxRate: 21,

    shippingCost: undefined,

    shippingTaxStatus: "unknown",

    currency: "EUR",

    inStock: true,

    delivery: "1-2 días laborables",

    productUrl:
      "https://es.farnell.com/fluke/fluke-117/multimeter-digital-hand-held-6000/dp/1274602",

    /*
     * Pendiente de integración del programa
     * de afiliación correspondiente.
     */
    affiliateUrl: undefined,

    commission: undefined,

    checkedAt: "2026-08-27",

    status: "verified",

    source:
      "Farnell España - código 1274602",
  },
];