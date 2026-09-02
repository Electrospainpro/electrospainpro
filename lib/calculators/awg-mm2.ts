export interface AwgMm2Input {
  awg?: number;
  mm2?: number;
}

export interface AwgMm2Result {
  awg?: number;
  mm2?: number;
  nearestAwg?: number;
  nearestMm2?: number;
  direction: "awg-to-mm2" | "mm2-to-awg";
  warning: string;
}

interface AwgEntry {
  awg: number;
  mm2: number;
}

/**
 * Equivalencias comerciales aproximadas
 * entre AWG y sección métrica.
 *
 * La tabla se utiliza para seleccionar
 * la equivalencia comercial más próxima.
 */
const AWG_TABLE: AwgEntry[] = [
  { awg: 20, mm2: 0.518 },
  { awg: 18, mm2: 0.823 },
  { awg: 16, mm2: 1.31 },
  { awg: 14, mm2: 2.08 },
  { awg: 12, mm2: 3.31 },
  { awg: 10, mm2: 5.26 },
  { awg: 8, mm2: 8.37 },
  { awg: 6, mm2: 13.3 },
  { awg: 4, mm2: 21.2 },
  { awg: 3, mm2: 26.7 },
  { awg: 2, mm2: 33.6 },
  { awg: 1, mm2: 42.4 },
  { awg: 0, mm2: 53.5 },
  { awg: -1, mm2: 67.4 },
  { awg: -2, mm2: 85.0 },
  { awg: -3, mm2: 107 },
  { awg: -4, mm2: 135 },
  { awg: -5, mm2: 170 },
  { awg: -6, mm2: 214 },
  { awg: -7, mm2: 268 },
  { awg: -8, mm2: 336 },
];

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

function findByAwg(
  awg: number,
): AwgEntry | undefined {
  return AWG_TABLE.find(
    (entry) => entry.awg === awg,
  );
}

function findNearestByMm2(
  mm2: number,
): AwgEntry {
  return AWG_TABLE.reduce(
    (nearest, entry) => {
      const currentDistance =
        Math.abs(entry.mm2 - mm2);

      const nearestDistance =
        Math.abs(nearest.mm2 - mm2);

      return currentDistance <
        nearestDistance
        ? entry
        : nearest;
    },
  );
}

export function convertAwgMm2(
  input: AwgMm2Input,
): AwgMm2Result {
  const hasAwg =
    input.awg !== undefined;

  const hasMm2 =
    input.mm2 !== undefined;

  if (hasAwg === hasMm2) {
    throw new Error(
      "Debes introducir AWG o mm², pero no ambos.",
    );
  }

  if (hasAwg) {
    assertPositive(
      input.awg as number,
      "El AWG",
    );

    const awg =
      input.awg as number;

    const entry =
      findByAwg(awg);

    if (!entry) {
      throw new Error(
        "El valor AWG no está disponible en la tabla de equivalencias.",
      );
    }

    return {
      awg: entry.awg,
      mm2: entry.mm2,
      direction: "awg-to-mm2",
      warning:
        "La equivalencia AWG ↔ mm² es orientativa. Para seleccionar un conductor deben comprobarse también la sección normalizada, intensidad admisible, método de instalación y normativa aplicable.",
    };
  }

  const mm2 =
    input.mm2 as number;

  assertPositive(
    mm2,
    "La sección",
  );

  const nearest =
    findNearestByMm2(mm2);

  return {
    mm2: round(mm2, 3),
    nearestAwg: nearest.awg,
    nearestMm2: nearest.mm2,
    direction: "mm2-to-awg",
    warning:
      "La equivalencia AWG ↔ mm² es orientativa. Para seleccionar un conductor deben comprobarse también la sección normalizada, intensidad admisible, método de instalación y normativa aplicable.",
  };
}