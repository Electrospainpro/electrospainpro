export interface SinglePhasePowerInput {
  voltage: number;
  current?: number;
  power?: number;
  powerFactor?: number;
}

export interface SinglePhasePowerResult {
  voltage: number;
  current: number;
  power: number;
  apparentPower: number;
  powerFactor: number;
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

function assertPowerFactor(
  value: number,
): void {
  if (
    !Number.isFinite(value) ||
    value <= 0 ||
    value > 1
  ) {
    throw new Error(
      "El factor de potencia debe estar entre 0 y 1.",
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

export function calculateSinglePhasePower(
  input: SinglePhasePowerInput,
): SinglePhasePowerResult {
  assertPositive(
    input.voltage,
    "La tensión",
  );

  const powerFactor =
    input.powerFactor ?? 1;

  assertPowerFactor(powerFactor);

  const hasCurrent =
    input.current !== undefined;

  const hasPower =
    input.power !== undefined;

  if (hasCurrent === hasPower) {
    throw new Error(
      "Debes introducir exactamente una de estas magnitudes: intensidad o potencia.",
    );
  }

  let current: number;
  let power: number;
  let formula: string;

  if (hasCurrent) {
    assertPositive(
      input.current as number,
      "La intensidad",
    );

    current =
      input.current as number;

    power =
      input.voltage *
      current *
      powerFactor;

    formula =
      "P = V × I × cos φ";
  } else {
    assertPositive(
      input.power as number,
      "La potencia",
    );

    power =
      input.power as number;

    current =
      power /
      (input.voltage * powerFactor);

    formula =
      "I = P / (V × cos φ)";
  }

  const apparentPower =
    input.voltage * current;

  return {
    voltage: round(
      input.voltage,
      4,
    ),

    current: round(
      current,
      4,
    ),

    power: round(
      power,
      4,
    ),

    apparentPower: round(
      apparentPower,
      4,
    ),

    powerFactor: round(
      powerFactor,
      4,
    ),

    formula,

    warning:
      "Resultado orientativo. En instalaciones reales deben comprobarse las condiciones de carga, características de los equipos, protecciones y normativa aplicable.",
  };
}