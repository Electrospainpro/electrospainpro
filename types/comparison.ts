import { Product } from "./product";

export interface ComparisonCriterion {
  label: string;

  winner?: string;
}

export interface Comparison {
  id: number;

  title: string;

  slug: string;

  category: string;

  summary: string;

  products: Product[];

  criteria: ComparisonCriterion[];

  winner?: string;

  publishedAt: string;
}