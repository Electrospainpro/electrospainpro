import { Product } from "./product";
import { Brand } from "./brand";
import { Comparison } from "./comparison";
import { Guide } from "./guide";

export interface Catalog {
  products: Product[];

  brands: Brand[];

  comparisons: Comparison[];

  guides: Guide[];
}