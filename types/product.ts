import type { ProductOffer } from "@/types/offer";

export interface ProductSpecification {
  label: string;
  value: string;
}

/**
 * Sistema antiguo de enlaces de afiliación.
 *
 * Se mantiene temporalmente por compatibilidad con los
 * productos existentes mientras migramos al nuevo sistema
 * ProductOffer.
 */
export interface ProductAffiliateLinks {
  amazon?: string;
  manomano?: string;
  leroymerlin?: string;
  rs?: string;
  farnell?: string;
  pccomponentes?: string;
}

/**
 * Puntuación propia de ElectroSpainPro.
 *
 * Cada criterio se valora de 0 a 10.
 */
export interface ProductESPScore {
  quality: number;
  reliability: number;
  valueForMoney: number;
  installation: number;
  durability: number;
  availability: number;
  warranty: number;
  overall: number;
}

/**
 * Distintivos editoriales.
 *
 * Se utilizarán en el catálogo y comparativas.
 */
export interface ProductBadge {
  label: string;
}

/**
 * Productos relacionados.
 *
 * De momento utilizaremos slugs para mantener compatibilidad
 * con la arquitectura actual.
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
 * Producto ElectroSpainPro.
 */
export interface Product {
  /**
   * Identificador interno.
   */
  id: number;

  /**
   * Nombre comercial del producto.
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
   * Precio antiguo.
   *
   * Se mantiene temporalmente por compatibilidad.
   *
   * El precio definitivo del comparador procederá
   * de ProductOffer.
   */
  price: string;

  /**
   * Valoración editorial / externa actual.
   */
  rating: number;

  /**
   * Sistema antiguo de enlaces de afiliación.
   *
   * Se mantiene durante la migración.
   */
  affiliateLinks: ProductAffiliateLinks;

  /**
   * Nuevo sistema de ofertas comerciales.
   *
   * Un producto puede tener múltiples ofertas.
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
   * Sistema de valoración ElectroSpainPro.
   */
  espScore?: ProductESPScore;

  /**
   * Distintivos editoriales.
   */
  badges?: ProductBadge[];

  /**
   * Relaciones entre productos,
   * guías y comparativas.
   */
  relations?: ProductRelations;

  /**
   * Información SEO.
   */
  seo?: ProductSEO;
}