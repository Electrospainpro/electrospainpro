export interface CatalogFilters {
  search: string;

  category: string;

  subcategory: string;

  brand: string;

  sort:
    | "featured"
    | "rating"
    | "price-asc"
    | "price-desc"
    | "name";
}