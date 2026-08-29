import type { Product } from "./product";

/**
 * Criterio utilizado para comparar productos.
 *
 * winner es opcional porque una comparativa puede
 * mostrar información sin declarar todavía un ganador.
 */
export interface ComparisonCriterion {
  label: string;

  productA?: string;

  productB?: string;

  winner?: string;
}

/**
 * Fila de la tabla técnica comparativa.
 */
export interface ComparisonSpecification {
  label: string;

  productA: string;

  productB: string;
}

/**
 * Pregunta frecuente de una comparativa.
 */
export interface ComparisonFAQItem {
  question: string;

  answer: string;
}

/**
 * Información SEO de la comparativa.
 */
export interface ComparisonSEO {
  metaTitle?: string;

  metaDescription?: string;

  keywords?: string[];
}

/**
 * Comparativa editorial de ElectroSpainPro.
 *
 * Una Comparison representa contenido que puede
 * publicarse en /comparativa/[slug].
 */
export interface Comparison {
  id: number;

  title: string;

  slug: string;

  category: string;

  summary: string;

  products: Product[];

  specifications?: ComparisonSpecification[];

  criteria: ComparisonCriterion[];

  faq?: ComparisonFAQItem[];

  winner?: string;

  verdict?: string;

  seo?: ComparisonSEO;

  publishedAt: string;
}