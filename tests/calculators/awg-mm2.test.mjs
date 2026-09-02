import assert from "node:assert/strict";
import test from "node:test";

const AWG_TABLE = [
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

function findByAwg(awg) {
  return AWG_TABLE.find(
    (entry) => entry.awg === awg,
  );
}

function findNearestByMm2(mm2) {
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

function convertAwgMm2(input) {
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
    if (
      !Number.isFinite(input.awg) ||
      input.awg <= 0
    ) {
      throw new Error("AWG inválido");
    }

    const entry =
      findByAwg(input.awg);

    if (!entry) {
      throw new Error(
        "AWG no disponible",
      );
    }

    return {
      awg: entry.awg,
      mm2: entry.mm2,
      direction: "awg-to-mm2",
    };
  }

  if (
    !Number.isFinite(input.mm2) ||
    input.mm2 <= 0
  ) {
    throw new Error(
      "Sección inválida",
    );
  }

  const nearest =
    findNearestByMm2(input.mm2);

  return {
    mm2: input.mm2,
    nearestAwg: nearest.awg,
    nearestMm2: nearest.mm2,
    direction: "mm2-to-awg",
  };
}

test(
  "convierte AWG 12 a mm²",
  () => {
    const result =
      convertAwgMm2({
        awg: 12,
      });

    assert.equal(
      result.awg,
      12,
    );

    assert.equal(
      result.mm2,
      3.31,
    );

    assert.equal(
      result.direction,
      "awg-to-mm2",
    );
  },
);

test(
  "convierte AWG 10 a mm²",
  () => {
    const result =
      convertAwgMm2({
        awg: 10,
      });

    assert.equal(
      result.mm2,
      5.26,
    );
  },
);

test(
  "encuentra el AWG más próximo desde mm²",
  () => {
    const result =
      convertAwgMm2({
        mm2: 3.3,
      });

    assert.equal(
      result.nearestAwg,
      12,
    );

    assert.equal(
      result.nearestMm2,
      3.31,
    );
  },
);

test(
  "convierte una sección cercana a AWG 14",
  () => {
    const result =
      convertAwgMm2({
        mm2: 2,
      });

    assert.equal(
      result.nearestAwg,
      14,
    );
  },
);

test(
  "rechaza introducir AWG y mm² simultáneamente",
  () => {
    assert.throws(
      () =>
        convertAwgMm2({
          awg: 12,
          mm2: 3.31,
        }),
    );
  },
);

test(
  "rechaza no introducir ningún valor",
  () => {
    assert.throws(
      () =>
        convertAwgMm2({}),
    );
  },
);

test(
  "rechaza valores AWG inválidos",
  () => {
    assert.throws(
      () =>
        convertAwgMm2({
          awg: 0,
        }),
    );
  },
);

test(
  "rechaza secciones negativas",
  () => {
    assert.throws(
      () =>
        convertAwgMm2({
          mm2: -2,
        }),
    );
  },
);