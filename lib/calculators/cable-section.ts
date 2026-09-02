import type {
  ConductorMaterial,
  ElectricalSystem,
} from "./constants";

import {
  STANDARD_CABLE_SECTIONS_MM2,
} from "./constants";

import {
  calculateVoltageDrop,
} from "./voltage-drop";

export interface CableSectionInput {
  system: ElectricalSystem;
  voltage: number;
  length: number;

  material: ConductorMaterial;

  power?: number;
  current?: number;

  powerFactor?: number;

  limitPercent: number;
}

export interface CableSectionAlternative {
  section: number;
  voltageDrop: number;
  voltageDropPercent: number;
  finalVoltage: number;
  withinLimit: boolean;
}

export interface CableSectionResult {
  current: number;
  recommendedSection?: number;

  voltageDrop?: number;
  voltageDropPercent?: number;
  finalVoltage?: number;

  alternatives: CableSectionAlternative[];

  calculationMethod:
    | "current-input"
    | "single-phase-power"
    | "three-phase-power";

  warning: string;
}

function assertPositive(
  value: number,
  fieldName: string,
): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      `${fieldName} debe ser un número mayor que 0.`,
    );
  }
}

function calculateCurrent(
  input: CableSectionInput,
): {
  current: number;
  calculationMethod:
    | "current-input"
    | "single-phase-power"
    | "three-phase-power";
} {
  if (
    input.current !== undefined &&
    Number.isFinite(input.current) &&
    input.current > 0
  ) {
    return {
      current: input.current,
      calculationMethod: "current-input",
    };
  }

  if (
    input.power === undefined ||
    !Number.isFinite(input.power) ||
    input.power <= 0
  ) {
    throw new Error(
      "Debes introducir una intensidad válida o una potencia mayor que 0.",
    );
  }

  const powerFactor =
    input.powerFactor ?? 1;

  if (
    !Number.isFinite(powerFactor) ||
    powerFactor <= 0 ||
    powerFactor > 1
  ) {
    throw new Error(
      "El factor de potencia debe estar entre 0 y 1.",
    );
  }

  if (input.system === "single-phase") {
    return {
      current:
        input.power /
        (input.voltage * powerFactor),
      calculationMethod:
        "single-phase-power",
    };
  }

  return {
    current:
      input.power /
      (Math.sqrt(3) *
        input.voltage *
        powerFactor),
    calculationMethod:
      "three-phase-power",
  };
}

export function calculateCableSection(
  input: CableSectionInput,
): CableSectionResult {
  assertPositive(
    input.voltage,
    "La tensión",
  );

  assertPositive(
    input.length,
    "La longitud",
  );

  assertPositive(
    input.limitPercent,
    "El límite de caída",
  );

  const {
    current,
    calculationMethod,
  } = calculateCurrent(input);

  assertPositive(
    current,
    "La intensidad",
  );

  const alternatives =
    STANDARD_CABLE_SECTIONS_MM2
      .map((section) => {
        const result =
          calculateVoltageDrop({
            system: input.system,
            voltage: input.voltage,
            length: input.length,
            current,
            section,
            material: input.material,
            limitPercent:
              input.limitPercent,
          });

        return {
          section,
          voltageDrop:
            result.voltageDrop,
          voltageDropPercent:
            result.voltageDropPercent,
          finalVoltage:
            result.finalVoltage,
          withinLimit:
            result.withinLimit === true,
        };
      });

  const recommended =
    alternatives.find(
      (alternative) =>
        alternative.withinLimit,
    );

  return {
    current: round(current, 4),

    recommendedSection:
      recommended?.section,

    voltageDrop:
      recommended?.voltageDrop,

    voltageDropPercent:
      recommended?.voltageDropPercent,

    finalVoltage:
      recommended?.finalVoltage,

    alternatives,

    calculationMethod,

    warning:
      "Resultado orientativo. La selección definitiva debe comprobarse según las condiciones reales de instalación, intensidad admisible, método de instalación, temperatura, agrupamiento y normativa aplicable.",
  };
}

function round(
  value: number,
  decimals: number,
): number {
  const factor =
    10 ** decimals;

  return (
    Math.round(
      (value + Number.EPSILON) *
        factor,
    ) / factor
  );
}