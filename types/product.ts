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
}

/**
 * Puntuación propia de ElectroSpainPro.
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
 * Se utilizarán en el catálogo y comparativas.
 */
export interface ProductBadge {
  label: string;
}

/**
 * Productos relacionados.
 * De momento utilizaremos slugs.
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

export interface Product {
  id: number;

  name: string;

  slug: string;

  brand: string;

  category: string;

  subcategory: string;

  image: string;

  price: string;

  rating: number;

  affiliateLinks: ProductAffiliateLinks;

  shortDescription: string;

  description: string;

  pros: string[];

  cons: string[];

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
   * Relaciones entre productos.
   */
  relations?: ProductRelations;

  /**
   * Información SEO.
   */
  seo?: ProductSEO;
}