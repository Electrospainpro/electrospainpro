import {
  type ElectricalSystem,
  type ConductorMaterial,
  getResistivity,
} from "./constants";

export interface VoltageDropInput {
  system: ElectricalSystem;
  voltage: number;
  length: number;
  current: number;
  section: number;
  material: ConductorMaterial;
  limitPercent?: number;
}

export interface VoltageDropResult {
  voltageDrop: number;
  voltageDropPercent: number;
  finalVoltage: number;
  resistance: number;
  limitPercent?: number;
  withinLimit?: boolean;
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

export function calculateVoltageDrop(
  input: VoltageDropInput,
): VoltageDropResult {
  assertPositive(input.voltage, "La tensión");
  assertPositive(input.length, "La longitud");
  assertPositive(input.current, "La intensidad");
  assertPositive(input.section, "La sección");

  if (
    input.limitPercent !== undefined &&
    (!Number.isFinite(input.limitPercent) ||
      input.limitPercent <= 0)
  ) {
    throw new Error(
      "El límite de caída debe ser mayor que 0.",
    );
  }

  const resistivity = getResistivity(input.material);

  const resistance =
    (resistivity * input.length) /
    input.section;

  const systemFactor =
    input.system === "single-phase"
      ? 2
      : Math.sqrt(3);

  const voltageDrop =
    systemFactor *
    input.current *
    resistance;

  const voltageDropPercent =
    (voltageDrop / input.voltage) * 100;

  const finalVoltage =
    input.voltage - voltageDrop;

  const result: VoltageDropResult = {
    voltageDrop: round(voltageDrop, 4),
    voltageDropPercent: round(
      voltageDropPercent,
      4,
    ),
    finalVoltage: round(finalVoltage, 4),
    resistance: round(resistance, 6),
  };

  if (input.limitPercent !== undefined) {
    result.limitPercent = input.limitPercent;
    result.withinLimit =
      voltageDropPercent <=
      input.limitPercent;
  }

  return result;
}

function round(
  value: number,
  decimals: number,
): number {
  const factor = 10 ** decimals;

  return (
    Math.round(
      (value + Number.EPSILON) * factor,
    ) / factor
  );
}