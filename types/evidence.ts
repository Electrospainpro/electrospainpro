/**
 * Sistema de Evidencia ESP de ElectroSpainPro.
 *
 * Permite identificar de dónde procede cada valoración,
 * qué tipo de evidencia la respalda y cuál es su nivel
 * dentro de la metodología editorial.
 */

/**
 * Tipo de fuente utilizada para respaldar información
 * o una valoración editorial.
 */
export type ESPEvidenceSourceType =
  | "manufacturer"
  | "distributor"
  | "installer"
  | "field-experience"
  | "independent"
  | "official-document"
  | "other";

/**
 * Nivel de confianza de una evidencia concreta.
 */
export type ESPEvidenceConfidence =
  | "high"
  | "medium"
  | "low";

/**
 * Nivel metodológico de una evidencia ESP.
 *
 * 1 — Fuente primaria del fabricante.
 * 2 — Documento oficial.
 * 3 — Fuente comercial.
 * 4 — Fuente independiente.
 * 5 — Experiencia profesional.
 * 6 — Experiencia específica del producto.
 */
export type ESPEvidenceLevel =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;

/**
 * Alcance de una experiencia profesional.
 *
 * brand:
 * La experiencia corresponde a productos de la marca,
 * pero no necesariamente al modelo evaluado.
 *
 * product:
 * La experiencia corresponde directamente al producto
 * evaluado.
 */
export type ESPExperienceScope =
  | "brand"
  | "product";

/**
 * Evidencia utilizada por ElectroSpainPro.
 */
export interface ESPEvidence {
  /**
   * Tipo de evidencia.
   */
  type: ESPEvidenceSourceType;

  /**
   * Nivel metodológico de la evidencia.
   */
  level: ESPEvidenceLevel;

  /**
   * Título descriptivo de la evidencia.
   */
  title: string;

  /**
   * Descripción de la evidencia.
   */
  description: string;

  /**
   * Fuente externa cuando exista.
   */
  source?: string;

  /**
   * Nombre del fabricante, distribuidor,
   * instalador o fuente correspondiente.
   */
  sourceName?: string;

  /**
   * Nivel de confianza de esta evidencia.
   */
  confidence: ESPEvidenceConfidence;

  /**
   * Fecha de la evidencia.
   *
   * Formato YYYY-MM-DD.
   */
  date?: string;
}

/**
 * Evidencia profesional procedente de experiencia
 * directa o contextual de instalación.
 */
export interface ESPFieldExperience
  extends ESPEvidence {
  type:
    | "installer"
    | "field-experience";

  /**
   * Indica si la experiencia corresponde exactamente
   * al producto evaluado.
   *
   * false:
   * experiencia contextual o de marca.
   *
   * true:
   * experiencia directa con el producto.
   */
  productSpecific: boolean;

  /**
   * Alcance de la experiencia profesional.
   */
  experienceScope: ESPExperienceScope;

  /**
   * Tipo de experiencia profesional.
   *
   * Ejemplos:
   * - instalación
   * - mantenimiento
   * - avería
   * - puesta en marcha
   * - uso profesional
   */
  application?: string;
}

/**
 * Evidencia asociada a un criterio concreto
 * del ESP Score.
 */
export interface ESPCriterionEvidence {
  /**
   * Criterio del ESP Score.
   */
  criterion:
    | "quality"
    | "reliability"
    | "valueForMoney"
    | "installation"
    | "durability"
    | "availability"
    | "warranty";

  /**
   * Evidencias utilizadas para valorar
   * el criterio.
   */
  evidence: ESPEvidence[];
}