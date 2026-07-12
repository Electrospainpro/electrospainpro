import { Product } from "./product";
import { Comparison } from "./comparison";

export interface Guide {
  id: number;

  title: string;

  slug: string;

  category: string;

  summary: string;

  content: string;

  relatedProducts: Product[];

  relatedComparisons: Comparison[];

  publishedAt: string;

  updatedAt?: string;
}