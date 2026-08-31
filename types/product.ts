import type { ProductOffer } from "@/types/offer";
import type { ESPScore } from "@/types/esp";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductAffiliateLinks {
  amazon?: string;
  manomano?: string;
  leroymerlin?: string;
  rs?: string;
  farnell?: string;
  pccomponentes?: string;
}

/**
 * Distintivos editoriales.
 */
export interface ProductBadge {
  label: string;
}

/**
 * Relaciones del producto.
 */
export interface ProductRelations {
  compatible?: string[];
  alternatives?: string[];
  accessories?: string[];
  guides?: string[];
  comparisons?: string[];
}

/**
 * Información SEO.
 */
export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

/**
 * Estado de verificación del producto.
 *
 * verified:
 * Datos principales comprobados.
 *
 * review:
 * Producto incorporado pero pendiente de revisión
 * antes de considerarlo completamente publicado.
 *
 * candidate:
 * Producto candidato todavía no preparado.
 */
export type ProductVerificationStatus =
  | "verified"
  | "review"
  | "candidate";

/**
 * Producto ElectroSpainPro.
 */
export interface Product {
  /**
   * Identificador numérico interno.
   */
  id: number;

  /**
   * Identificador canónico utilizado por el Data Engine.
   *
   * Ejemplo: P001, P002...
   */
  catalogId: string;

  /**
   * Nombre comercial.
   */
  name: string;

  /**
   * URL amigable.
   */
  slug: string;

  /**
   * Marca.
   */
  brand: string;

  /**
   * Referencia del fabricante / MPN.
   */
  mpn: string;

  /**
   * Código EAN / GTIN.
   */
  ean?: string;

  /**
   * Categoría principal.
   */
  category: string;

  /**
   * Subcategoría.
   */
  subcategory: string;

  /**
   * Imagen principal.
   */
  image: string;

  /**
   * Precio antiguo / legacy.
   *
   * El precio comercial real deberá proceder de offers.
   */
  price: string;

  /**
   * Valoración editorial o externa.
   *
   * Se mantiene por compatibilidad con el catálogo actual.
   */
  rating: number;

  /**
   * Enlaces antiguos de afiliación.
   *
   * Se mantienen durante la migración al nuevo sistema de ofertas.
   */
  affiliateLinks: ProductAffiliateLinks;

  /**
   * Ofertas comerciales.
   */
  offers?: ProductOffer[];

  /**
   * Descripción corta.
   */
  shortDescription: string;

  /**
   * Descripción completa.
   */
  description: string;

  /**
   * Ventajas.
   */
  pros: string[];

  /**
   * Inconvenientes.
   */
  cons: string[];

  /**
   * Especificaciones técnicas.
   */
  specifications: ProductSpecification[];

  /**
   * Sistema ESP Score.
   *
   * La valoración utiliza la metodología definida
   * en types/esp.ts.
   *
   * Será opcional hasta que el producto haya pasado
   * la correspondiente valoración editorial.
   */
  espScore?: ESPScore;

  /**
   * Distintivos editoriales.
   */
  badges?: ProductBadge[];

  /**
   * Relaciones con otros contenidos o productos.
   */
  relations?: ProductRelations;

  /**
   * Información SEO.
   */
  seo?: ProductSEO;

  /**
   * Estado de verificación del producto.
   */
  verificationStatus?: ProductVerificationStatus;

  /**
   * Fuente principal de verificación.
   *
   * Normalmente será la ficha oficial del fabricante.
   */
  verificationSource?: string;

  /**
   * Fecha de última revisión de los datos.
   *
   * Formato YYYY-MM-DD.
   */
  verifiedAt?: string;
}