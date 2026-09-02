import type {
  ESPEvidence,
} from "@/types/evidence";

/**
 * Metodología ESP Score de ElectroSpainPro.
 *
 * El ESP Score es una valoración editorial propia.
 *
 * Cada criterio se valora de 0 a 10 y tiene una
 * ponderación específica dentro de la puntuación global.
 */

/**
 * Criterio individual del ESP Score.
 */
export interface ESPScoreCriterion {
  /**
   * Puntuación del criterio.
   *
   * Rango permitido: 0 a 10.
   */
  score: number;

  /**
   * Justificación editorial de la puntuación.
   */
  reason: string;

  /**
   * Fuentes utilizadas para respaldar la valoración.
   *
   * Se mantiene por compatibilidad con los datos
   * actuales del catálogo.
   */
  sources?: string[];

  /**
   * Evidencias estructuradas utilizadas para
   * respaldar la valoración.
   *
   * Permite diferenciar entre información del
   * fabricante, distribuidores, instaladores,
   * experiencia de campo y fuentes independientes.
   */
  evidence?: ESPEvidence[];
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
 *
 * high:
 * Información suficiente y contrastada.
 *
 * medium:
 * Información fiable pero con algunas limitaciones.
 *
 * low:
 * Información insuficiente para una valoración sólida.
 */
export type ESPScoreConfidence =
  | "high"
  | "medium"
  | "low";

/**
 * Estado editorial del ESP Score.
 *
 * pending:
 * Todavía no está valorado.
 *
 * reviewed:
 * La valoración ha sido revisada internamente.
 *
 * published:
 * La valoración puede mostrarse como oficial.
 */
export type ESPScoreStatus =
  | "pending"
  | "reviewed"
  | "published";

/**
 * Puntuación completa de ElectroSpainPro.
 */
export interface ESPScore {
  /**
   * Criterios individuales con puntuación,
   * justificación y evidencias.
   */
  criteria: ESPScoreCriteria;

  /**
   * Puntuación global calculada.
   *
   * Puede ser null cuando todavía no existe
   * una valoración global disponible.
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
 * Pesos oficiales de la metodología ESP Score.
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