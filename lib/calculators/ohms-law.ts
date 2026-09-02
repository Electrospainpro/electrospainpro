export type OhmsLawVariable =
  | "voltage"
  | "current"
  | "resistance";

export interface OhmsLawInput {
  voltage?: number;
  current?: number;
  resistance?: number;
}

export interface OhmsLawResult {
  calculated: OhmsLawVariable;
  voltage: number;
  current: number;
  resistance: number;
  formula: string;
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

export function calculateOhmsLaw(
  input: OhmsLawInput,
): OhmsLawResult {
  const hasVoltage =
    input.voltage !== undefined;

  const hasCurrent =
    input.current !== undefined;

  const hasResistance =
    input.resistance !== undefined;

  const providedValues =
    Number(hasVoltage) +
    Number(hasCurrent) +
    Number(hasResistance);

  if (providedValues !== 2) {
    throw new Error(
      "Debes introducir exactamente dos valores para calcular el tercero.",
    );
  }

  if (hasVoltage) {
    assertPositive(
      input.voltage as number,
      "La tensión",
    );
  }

  if (hasCurrent) {
    assertPositive(
      input.current as number,
      "La intensidad",
    );
  }

  if (hasResistance) {
    assertPositive(
      input.resistance as number,
      "La resistencia",
    );
  }

  let voltage: number;
  let current: number;
  let resistance: number;
  let calculated: OhmsLawVariable;
  let formula: string;

  if (
    hasCurrent &&
    hasResistance
  ) {
    current = input.current as number;
    resistance = input.resistance as number;
    voltage = current * resistance;

    calculated = "voltage";
    formula = "V = I × R";
  } else if (
    hasVoltage &&
    hasResistance
  ) {
    voltage = input.voltage as number;
    resistance = input.resistance as number;
    current = voltage / resistance;

    calculated = "current";
    formula = "I = V / R";
  } else {
    voltage = input.voltage as number;
    current = input.current as number;
    resistance = voltage / current;

    calculated = "resistance";
    formula = "R = V / I";
  }

  assertPositive(
    voltage,
    "La tensión calculada",
  );

  assertPositive(
    current,
    "La intensidad calculada",
  );

  assertPositive(
    resistance,
    "La resistencia calculada",
  );

  return {
    calculated,
    voltage: round(voltage, 6),
    current: round(current, 6),
    resistance: round(resistance, 6),
    formula,
    warning:
      "Resultado orientativo basado en la Ley de Ohm. En circuitos reales deben considerarse las características y condiciones específicas de los componentes.",
  };
}