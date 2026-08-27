/**
 * Tipo de relación comercial que ElectroSpainPro
 * puede tener con un merchant.
 */
export type MerchantType =
  | "affiliate"
  | "commercial"
  | "no_program"
  | "unknown";

/**
 * Tiendas y marketplaces disponibles.
 *
 * El identificador debe mantenerse estable porque
 * se utilizará en ofertas, estadísticas y enlaces.
 */
export type Merchant =
  | "amazon"
  | "pccomponentes"
  | "manomano"
  | "leroymerlin"
  | "rs"
  | "farnell"
  | "latiendadeelectricidad";

/**
 * Estado de una oferta.
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
   * Identificador del producto del catálogo.
   *
   * Ejemplo:
   * P002
   */
  productId: string;

  /**
   * Merchant donde se encuentra la oferta.
   */
  merchant: Merchant;

  /**
   * SKU / referencia interna de la tienda.
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
   * Precio publicado.
   */
  price?: number;

  /**
   * Indica si el precio incluye impuestos.
   */
  priceTaxStatus?: PriceTaxStatus;

  /**
   * Tipo impositivo aplicable al precio publicado.
   */
  taxRate?: number;

  /**
   * Gastos de envío.
   */
  shippingCost?: number;

  /**
   * Tratamiento fiscal del envío.
   */
  shippingTaxStatus?: PriceTaxStatus;

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
   */
  delivery?: string;

  /**
   * URL pública del producto.
   */
  productUrl: string;

  /**
   * URL de afiliación.
   *
   * Puede permanecer vacía hasta disponer
   * de un programa de afiliación válido.
   */
  affiliateUrl?: string;

  /**
   * Comisión estimada o conocida.
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
   * Fuente utilizada para verificar los datos.
   */
  source?: string;
}

/**
 * Información de un merchant.
 */
export interface MerchantInfo {
  id: Merchant;

  name: string;

  type: MerchantType;

  country: string;

  website: string;

  affiliateAvailable: boolean;

  active: boolean;

  notes?: string;
}