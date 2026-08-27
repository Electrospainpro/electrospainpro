/**
 * Tiendas / marketplaces donde ElectroSpainPro
 * puede encontrar una oferta de un producto.
 */
export type Merchant =
  | "amazon"
  | "pccomponentes"
  | "manomano"
  | "leroymerlin"
  | "rs"
  | "farnell";

/**
 * Oferta comercial de un producto.
 *
 * Un producto puede tener varias ofertas,
 * una por cada tienda o marketplace.
 */
export interface ProductOffer {
  /**
   * Identificador interno de la oferta.
   */
  id: string;

  /**
   * Tienda o marketplace.
   */
  merchant: Merchant;

  /**
   * Referencia / SKU del producto en la tienda.
   */
  sku?: string;

  /**
   * Código EAN / GTIN del producto.
   */
  ean?: string;

  /**
   * Precio del producto en euros.
   */
  price?: number;

  /**
   * Coste de envío en euros.
   */
  shippingCost?: number;

  /**
   * Moneda de la oferta.
   */
  currency: "EUR";

  /**
   * Indica si el producto aparece disponible.
   */
  inStock?: boolean;

  /**
   * URL normal del producto.
   */
  productUrl: string;

  /**
   * URL utilizada para afiliación.
   */
  affiliateUrl?: string;

  /**
   * Fecha de última comprobación.
   *
   * Formato recomendado:
   * YYYY-MM-DD
   */
  checkedAt?: string;
}