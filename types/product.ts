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
}