export type SearchEntityType =
  | "product"
  | "brand"
  | "category"
  | "subcategory"
  | "comparison"
  | "guide"
  | "article";

export interface SearchResult {
  id: string | number;

  type: SearchEntityType;

  title: string;

  slug: string;

  description?: string;

  category?: string;

  brand?: string;

  score?: number;
}

export interface SearchFilters {
  query: string;

  category?: string;

  subcategory?: string;

  brand?: string;
}