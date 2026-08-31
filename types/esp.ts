/**
 * Metodología ESP Score de ElectroSpainPro.
 *
 * El ESP Score es una valoración editorial propia.
 *
 * Cada criterio se valora de 0 a 10.
 * Mientras un criterio no haya sido evaluado,
 * su puntuación puede permanecer como null.
 */

export interface ESPScoreCriterion {
  /**
   * Puntuación del criterio.
   *
   * Rango permitido: 0 a 10.
   *
   * null significa que el criterio todavía
   * está pendiente de valoración.
   */
  score: number | null;

  /**
   * Justificación editorial de la puntuación.
   *
   * Puede permanecer vacía mientras el criterio
   * esté pendiente.
   */
  reason: string;

  /**
   * Fuentes utilizadas para respaldar la valoración.
   */
  sources?: string[];
}

/**
 * Criterios individuales del ESP Score.
 */
export interface ESPScoreCriteria {
  quality: ESPScoreCriterion;

  reliability: ESPScoreCriterion;

  valueForMoney: ESPScoreCriterion;

  installation: ESPScoreCriterion;

  durability: ESPScoreCriterion;

  availability: ESPScoreCriterion;

  warranty: ESPScoreCriterion;
}

/**
 * Nivel de confianza de la valoración.
 */
export type ESPScoreConfidence =
  | "high"
  | "medium"
  | "low";

/**
 * Estado editorial del ESP Score.
 *
 * pending:
 * Todavía no está valorado completamente.
 *
 * reviewed:
 * La valoración completa ha sido revisada.
 *
 * published:
 * La valoración puede mostrarse como oficial.
 */
export type ESPScoreStatus =
  | "pending"
  | "reviewed"
  | "published";

/**
 * Puntuación completa o pendiente de ElectroSpainPro.
 */
export interface ESPScore {
  /**
   * Criterios individuales.
   */
  criteria: ESPScoreCriteria;

  /**
   * Puntuación global.
   *
   * null mientras no estén disponibles
   * todos los criterios necesarios.
   */
  overall: number | null;

  /**
   * Nivel de confianza.
   */
  confidence: ESPScoreConfidence;

  /**
   * Estado editorial.
   */
  status: ESPScoreStatus;

  /**
   * Fecha de valoración.
   *
   * Formato YYYY-MM-DD.
   */
  evaluatedAt?: string;

  /**
   * Versión de la metodología utilizada.
   *
   * Ejemplo: "1.0"
   */
  methodologyVersion?: string;
}

/**
 * Índice ESP por marca.
 *
 * Se utilizará posteriormente para rankings
 * y páginas de marcas.
 */
export interface ESPIndex {
  brand: string;

  overall: number;

  reviewedProducts: number;
}

/**
 * Pesos oficiales de la metodología ESP Score v1.0.
 *
 * La suma debe ser exactamente 1.
 */
export const ESP_SCORE_WEIGHTS = {
  quality: 0.20,
  reliability: 0.20,
  valueForMoney: 0.15,
  installation: 0.10,
  durability: 0.15,
  availability: 0.10,
  warranty: 0.10,
} as const;