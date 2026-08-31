import type { Product } from "./product";

/**
 * Especificación técnica utilizada
 * en una comparativa.
 */
export interface ComparisonSpecification {
  label: string;

  productA: string;

  productB: string;
}

/**
 * Criterio utilizado para valorar una comparativa.
 */
export interface ComparisonCriterion {
  label: string;

  winner?: string;

  explanation?: string;
}

/**
 * Pregunta frecuente de una comparativa.
 */
export interface ComparisonFAQ {
  question: string;

  answer: string;
}

/**
 * Estado editorial de una comparativa.
 */
export type ComparisonStatus =
  | "candidate"
  | "review"
  | "published";

/**
 * Información SEO de una comparativa.
 */
export interface ComparisonSEO {
  metaTitle?: string;

  metaDescription?: string;

  keywords?: string[];
}

/**
 * Recomendación de una comparativa.
 */
export interface ComparisonRecommendation {
  profile: string;

  product: string;

  reason: string;
}

/**
 * Comparativa profesional de ElectroSpainPro.
 */
export interface Comparison {
  /**
   * Identificador interno.
   */
  id: number;

  /**
   * Título visible.
   */
  title: string;

  /**
   * URL amigable.
   */
  slug: string;

  /**
   * Categoría principal.
   */
  category: string;

  /**
   * Resumen corto.
   */
  summary: string;

  /**
   * Introducción editorial.
   */
  introduction?: string;

  /**
   * Productos comparados.
   */
  products: Product[];

  /**
   * Especificaciones técnicas comparadas.
   */
  specifications?: ComparisonSpecification[];

  /**
   * Criterios utilizados en la comparativa.
   */
  criteria: ComparisonCriterion[];

  /**
   * Preguntas frecuentes.
   */
  faq?: ComparisonFAQ[];

  /**
   * Ganador global.
   */
  winner?: string;

  /**
   * Veredicto editorial.
   */
  verdict?: string;

  /**
   * Puntos fuertes del producto A.
   */
  productAPros?: string[];

  /**
   * Puntos débiles del producto A.
   */
  productACons?: string[];

  /**
   * Puntos fuertes del producto B.
   */
  productBPros?: string[];

  /**
   * Puntos débiles del producto B.
   */
  productBCons?: string[];

  /**
   * Recomendaciones según perfil.
   */
  recommendations?: ComparisonRecommendation[];

  /**
   * Estado editorial.
   */
  status?: ComparisonStatus;

  /**
   * Información SEO.
   */
  seo?: ComparisonSEO;

  /**
   * Fecha de publicación.
   */
  publishedAt: string;
}