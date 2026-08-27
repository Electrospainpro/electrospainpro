/**
 * Tiendas / marketplaces.
 */
export type Merchant =
  | "amazon"
  | "pccomponentes"
  | "manomano"
  | "leroymerlin"
  | "rs"
  | "farnell";

/**
 * Estado de la oferta.
 */
export type OfferStatus =
  | "pending"
  | "verified"
  | "inactive";

/**
 * Tratamiento fiscal del precio.
 */
export type PriceTaxStatus =
  | "included"
  | "excluded"
  | "unknown";

/**
 * Oferta comercial de un producto.
 */
export interface ProductOffer {
  /**
   * Identificador único de la oferta.
   */
  id: string;

  /**
   * Producto del catálogo.
   *
   * Ejemplo:
   * P004
   */
  productId: string;

  /**
   * Merchant.
   */
  merchant: Merchant;

  /**
   * SKU / referencia de la tienda.
   */
  sku?: string;

  /**
   * Referencia del fabricante.
   */
  mpn?: string;

  /**
   * EAN / GTIN.
   */
  ean?: string;

  /**
   * Precio publicado por el merchant.
   */
  price?: number;

  /**
   * Indica si el precio incluye impuestos.
   */
  priceTaxStatus?: PriceTaxStatus;

  /**
   * Tipo impositivo indicado por el merchant.
   *
   * Ejemplo:
   * 21 para IVA 21 %.
   */
  taxRate?: number;

  /**
   * Gastos de envío.
   */
  shippingCost?: number;

  /**
   * Estado fiscal del gasto de envío.
   */
  shippingTaxStatus?: PriceTaxStatus;

  /**
   * Moneda.
   */
  currency: "EUR";

  /**
   * Stock.
   */
  inStock?: boolean;

  /**
   * Información de entrega.
   */
  delivery?: string;

  /**
   * URL normal.
   */
  productUrl: string;

  /**
   * URL de afiliación.
   */
  affiliateUrl?: string;

  /**
   * Comisión de afiliación.
   */
  commission?: number;

  /**
   * Fecha de comprobación.
   */
  checkedAt?: string;

  /**
   * Estado de la oferta.
   */
  status: OfferStatus;

  /**
   * Fuente utilizada para comprobarla.
   */
  source?: string;
}