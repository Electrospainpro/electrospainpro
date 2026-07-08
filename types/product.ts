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
   * Sistema de valoración propio de ElectroSpainPro.
   * De momento es opcional para no romper los productos existentes.
   */
  espScore?: ProductESPScore;
}