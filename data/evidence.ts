import type {
  ESPFieldExperience,
} from "@/types/evidence";

/**
 * Evidencias profesionales de ElectroSpainPro.
 *
 * Este archivo centraliza experiencias de campo que pueden
 * utilizarse como evidencia contextual en valoraciones ESP.
 *
 * IMPORTANTE:
 * Una experiencia de marca no implica experiencia directa
 * con todos los modelos de esa marca.
 */

/**
 * Experiencia profesional contextual con herramientas Fluke.
 *
 * Esta evidencia no corresponde específicamente a un modelo
 * concreto. Puede utilizarse como evidencia contextual cuando
 * se valore la fiabilidad o durabilidad de productos Fluke.
 */
export const flukeBrandFieldExperience: ESPFieldExperience = {
  type: "field-experience",

  level: 5,

  title:
    "Experiencia profesional con herramientas Fluke",

  description:
    "Experiencia profesional acumulada durante aproximadamente 20 años en el sector de instalaciones eléctricas. Se han utilizado distintas herramientas de la marca Fluke, con una percepción profesional positiva respecto a su fiabilidad y durabilidad. No se ha utilizado específicamente el modelo Fluke 323, por lo que esta evidencia no se considera experiencia directa con dicho producto.",

  sourceName:
    "Experiencia profesional de instalador",

  confidence: "medium",

  date: "2026-08-31",

  productSpecific: false,

  experienceScope: "brand",

  application:
    "Uso profesional y experiencia de campo",
};