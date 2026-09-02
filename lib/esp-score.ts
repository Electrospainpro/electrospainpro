import type {
  ESPScore,
  ESPScoreCriteria,
  ESPScoreCriterion,
} from "@/types/esp";

import {
  ESP_SCORE_WEIGHTS,
} from "@/types/esp";

const SCORE_MIN = 0;
const SCORE_MAX = 10;

/**
 * Valida una puntuación individual.
 */
function validateScore(
  criterion: ESPScoreCriterion,
  criterionName: string
): ESPScoreCriterion {
  if (
    !Number.isFinite(
      criterion.score
    )
  ) {
    throw new Error(
      `ESP Score inválido en "${criterionName}": la puntuación debe ser numérica.`
    );
  }

  if (
    criterion.score < SCORE_MIN ||
    criterion.score > SCORE_MAX
  ) {
    throw new Error(
      `ESP Score inválido en "${criterionName}": la puntuación debe estar entre ${SCORE_MIN} y ${SCORE_MAX}.`
    );
  }

  if (
    typeof criterion.reason !==
      "string" ||
    criterion.reason.trim()
      .length === 0
  ) {
    throw new Error(
      `ESP Score inválido en "${criterionName}": debe existir una justificación editorial.`
    );
  }

  return criterion;
}

/**
 * Comprueba que los pesos de la metodología
 * sumen exactamente 100 %.
 */
function validateWeights(): void {
  const total =
    ESP_SCORE_WEIGHTS.quality +
    ESP_SCORE_WEIGHTS.reliability +
    ESP_SCORE_WEIGHTS.valueForMoney +
    ESP_SCORE_WEIGHTS.installation +
    ESP_SCORE_WEIGHTS.durability +
    ESP_SCORE_WEIGHTS.availability +
    ESP_SCORE_WEIGHTS.warranty;

  if (
    Math.abs(total - 1) >
    0.000001
  ) {
    throw new Error(
      `ESP Score inválido: los pesos deben sumar 1. Actualmente suman ${total}.`
    );
  }
}

/**
 * Calcula la puntuación global ESP.
 *
 * La puntuación se calcula exclusivamente a partir
 * de los criterios editoriales proporcionados.
 *
 * No se asignan puntuaciones automáticamente.
 */
export function calculateESPScore(
  criteria: ESPScoreCriteria,
  options?: {
    confidence?: ESPScore["confidence"];
    status?: ESPScore["status"];
    evaluatedAt?: string;
    methodologyVersion?: string;
  }
): ESPScore {
  validateWeights();

  const quality =
    validateScore(
      criteria.quality,
      "quality"
    );

  const reliability =
    validateScore(
      criteria.reliability,
      "reliability"
    );

  const valueForMoney =
    validateScore(
      criteria.valueForMoney,
      "valueForMoney"
    );

  const installation =
    validateScore(
      criteria.installation,
      "installation"
    );

  const durability =
    validateScore(
      criteria.durability,
      "durability"
    );

  const availability =
    validateScore(
      criteria.availability,
      "availability"
    );

  const warranty =
    validateScore(
      criteria.warranty,
      "warranty"
    );

  const overall =
    quality.score *
      ESP_SCORE_WEIGHTS.quality +
    reliability.score *
      ESP_SCORE_WEIGHTS.reliability +
    valueForMoney.score *
      ESP_SCORE_WEIGHTS.valueForMoney +
    installation.score *
      ESP_SCORE_WEIGHTS.installation +
    durability.score *
      ESP_SCORE_WEIGHTS.durability +
    availability.score *
      ESP_SCORE_WEIGHTS.availability +
    warranty.score *
      ESP_SCORE_WEIGHTS.warranty;

  return {
    criteria: {
      quality,
      reliability,
      valueForMoney,
      installation,
      durability,
      availability,
      warranty,
    },

    overall:
      Math.round(
        overall * 10
      ) / 10,

    confidence:
      options?.confidence ??
      "low",

    status:
      options?.status ??
      "pending",

    evaluatedAt:
      options?.evaluatedAt,

    methodologyVersion:
      options?.methodologyVersion ??
      "1.0",
  };
}

/**
 * Comprueba si una puntuación ESP
 * cumple la metodología.
 *
 * Un ESP Score con overall null representa
 * una valoración pendiente y no puede
 * considerarse válida como puntuación completa.
 */
export function isValidESPScore(
  score: ESPScore
): boolean {
  if (
    score.overall ===
    null
  ) {
    return false;
  }

  try {
    const calculated =
      calculateESPScore(
        score.criteria,
        {
          confidence:
            score.confidence,

          status:
            score.status,

          evaluatedAt:
            score.evaluatedAt,

          methodologyVersion:
            score.methodologyVersion,
        }
      );

    return (
      calculated.overall ===
      score.overall
    );
  } catch {
    return false;
  }
}

/**
 * Devuelve el peso de un criterio.
 */
export function getESPScoreWeight(
  criterion: keyof ESPScoreCriteria
): number {
  return ESP_SCORE_WEIGHTS[
    criterion
  ];
}

/**
 * Comprueba si un ESP Score puede
 * publicarse oficialmente.
 *
 * Para publicar exigimos:
 *
 * - puntuaciones válidas
 * - confianza alta
 * - estado published
 * - puntuación global calculada
 */
export function isPublishableESPScore(
  score: ESPScore
): boolean {
  return (
    score.overall !==
      null &&
    isValidESPScore(score) &&
    score.confidence ===
      "high" &&
    score.status ===
      "published"
  );
}