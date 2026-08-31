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
 *
 * Una puntuación null significa que el criterio
 * todavía está pendiente y no genera un error.
 */
function validateScore(
  criterion: ESPScoreCriterion,
  criterionName: string
): ESPScoreCriterion {
  if (criterion.score === null) {
    return criterion;
  }

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
 * Comprueba si todos los criterios tienen
 * una puntuación válida.
 */
export function isCompleteESPScoreCriteria(
  criteria: ESPScoreCriteria
): boolean {
  return (
    criteria.quality.score !== null &&
    criteria.reliability.score !== null &&
    criteria.valueForMoney.score !== null &&
    criteria.installation.score !== null &&
    criteria.durability.score !== null &&
    criteria.availability.score !== null &&
    criteria.warranty.score !== null
  );
}

/**
 * Calcula la puntuación global ESP.
 *
 * Si falta algún criterio, devuelve un ESP Score
 * con overall null y estado pending.
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

  const complete =
    isCompleteESPScoreCriteria({
      quality,
      reliability,
      valueForMoney,
      installation,
      durability,
      availability,
      warranty,
    });

  if (!complete) {
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

      overall: null,

      confidence:
        options?.confidence ??
        "low",

      status: "pending",

      evaluatedAt:
        options?.evaluatedAt,

      methodologyVersion:
        options?.methodologyVersion ??
        "1.0",
    };
  }

  /**
   * Después de comprobar que todos los criterios
   * están completos, TypeScript no puede deducir
   * automáticamente que sus valores ya no son null.
   *
   * Por eso los valores se comprueban explícitamente.
   */
  if (
    quality.score === null ||
    reliability.score === null ||
    valueForMoney.score === null ||
    installation.score === null ||
    durability.score === null ||
    availability.score === null ||
    warranty.score === null
  ) {
    throw new Error(
      "ESP Score inválido: faltan criterios para calcular la puntuación."
    );
  }

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
 */
export function isValidESPScore(
  score: ESPScore
): boolean {
  try {
    if (
      score.overall === null
    ) {
      return false;
    }

    if (
      !isCompleteESPScoreCriteria(
        score.criteria
      )
    ) {
      return false;
    }

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
 * Exigimos:
 *
 * - puntuación completa
 * - cálculo válido
 * - confianza alta
 * - estado published
 */
export function isPublishableESPScore(
  score: ESPScore
): boolean {
  return (
    score.overall !== null &&
    isValidESPScore(score) &&
    score.confidence ===
      "high" &&
    score.status ===
      "published"
  );
}