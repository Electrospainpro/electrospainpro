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
 * Estado de una oferta dentro del Data Engine.
 */
export type OfferStatus =
  | "pending"
  | "verified"
  | "inactive";

/**
 * Oferta comercial de un producto.
 *
 * La relación con el producto se realiza mediante
 * productId, que corresponde al Product_ID del
 * catálogo maestro.
 */
export interface ProductOffer {
  /**
   * Identificador único de la oferta.
   *
   * Ejemplo:
   * O-P001-AMAZON
   */
  id: string;

  /**
   * Identificador del producto del catálogo.
   *
   * Ejemplo:
   * P001
   */
  productId: string;

  /**
   * Tienda o marketplace.
   */
  merchant: Merchant;

  /**
   * Referencia / SKU del producto en la tienda.
   */
  sku?: string;

  /**
   * Referencia del fabricante.
   */
  mpn?: string;

  /**
   * Código EAN / GTIN.
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
   * Moneda.
   */
  currency: "EUR";

  /**
   * Disponibilidad.
   */
  inStock?: boolean;

  /**
   * Información de entrega.
   *
   * Ejemplo:
   * "24/48 h"
   */
  delivery?: string;

  /**
   * URL normal del producto.
   */
  productUrl: string;

  /**
   * URL utilizada para afiliación.
   */
  affiliateUrl?: string;

  /**
   * Comisión estimada o registrada.
   *
   * Se expresa como porcentaje.
   *
   * Ejemplo:
   * 3.5 = 3,5 %
   */
  commission?: number;

  /**
   * Fecha de última comprobación.
   *
   * Formato:
   * YYYY-MM-DD
   */
  checkedAt?: string;

  /**
   * Estado de la oferta.
   */
  status: OfferStatus;

  /**
   * Fuente utilizada para verificar la oferta.
   */
  source?: string;
}