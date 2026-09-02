import assert from "node:assert/strict";
import test from "node:test";

function assertPositive(
  value,
  fieldName,
) {
  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    throw new Error(
      `${fieldName} debe ser un número mayor que 0.`,
    );
  }
}

function assertPowerFactor(
  value,
) {
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

function calculateThreePhasePower(
  input,
) {
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
      "Debes introducir exactamente una magnitud.",
    );
  }

  let current;
  let power;

  if (hasCurrent) {
    assertPositive(
      input.current,
      "La intensidad",
    );

    current = input.current;

    power =
      Math.sqrt(3) *
      input.voltage *
      current *
      powerFactor;
  } else {
    assertPositive(
      input.power,
      "La potencia",
    );

    power = input.power;

    current =
      power /
      (
        Math.sqrt(3) *
        input.voltage *
        powerFactor
      );
  }

  const apparentPower =
    Math.sqrt(3) *
    input.voltage *
    current;

  return {
    voltage: input.voltage,
    current,
    power,
    apparentPower,
    powerFactor,
  };
}

test(
  "calcula potencia trifásica desde tensión e intensidad",
  () => {
    const result =
      calculateThreePhasePower({
        voltage: 400,
        current: 10,
      });

    const expected =
      Math.sqrt(3) *
      400 *
      10;

    assert.equal(
      result.power,
      expected,
    );

    assert.equal(
      result.current,
      10,
    );
  },
);

test(
  "calcula intensidad desde potencia trifásica",
  () => {
    const power =
      Math.sqrt(3) *
      400 *
      10;

    const result =
      calculateThreePhasePower({
        voltage: 400,
        power,
      });

    assert.equal(
      Math.round(
        result.current * 1000000,
      ) / 1000000,
      10,
    );
  },
);

test(
  "tiene en cuenta el factor de potencia",
  () => {
    const result =
      calculateThreePhasePower({
        voltage: 400,
        current: 10,
        powerFactor: 0.8,
      });

    const expected =
      Math.sqrt(3) *
      400 *
      10 *
      0.8;

    assert.equal(
      result.power,
      expected,
    );

    const expectedApparent =
      Math.sqrt(3) *
      400 *
      10;

    assert.equal(
      result.apparentPower,
      expectedApparent,
    );
  },
);

test(
  "calcula correctamente con potencia y cos phi",
  () => {
    const power =
      Math.sqrt(3) *
      400 *
      10 *
      0.8;

    const result =
      calculateThreePhasePower({
        voltage: 400,
        power,
        powerFactor: 0.8,
      });

    assert.equal(
      Math.round(
        result.current * 1000000,
      ) / 1000000,
      10,
    );
  },
);

test(
  "el factor de potencia por defecto es 1",
  () => {
    const result =
      calculateThreePhasePower({
        voltage: 400,
        current: 16,
      });

    assert.equal(
      result.powerFactor,
      1,
    );

    assert.equal(
      Math.round(
        result.power * 100,
      ) / 100,
      Math.round(
        (
          Math.sqrt(3) *
          400 *
          16
        ) * 100,
      ) / 100,
    );
  },
);

test(
  "rechaza introducir potencia e intensidad simultáneamente",
  () => {
    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
          current: 10,
          power: 11085,
        }),
    );
  },
);

test(
  "rechaza no introducir ni potencia ni intensidad",
  () => {
    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
        }),
    );
  },
);

test(
  "rechaza factor de potencia inválido",
  () => {
    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
          current: 10,
          powerFactor: 0,
        }),
    );

    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
          current: 10,
          powerFactor: 1.2,
        }),
    );
  },
);

test(
  "rechaza valores negativos o cero",
  () => {
    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 0,
          current: 10,
        }),
    );

    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
          current: -10,
        }),
    );

    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: 400,
          power: 0,
        }),
    );
  },
);

test(
  "rechaza NaN e Infinity",
  () => {
    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: NaN,
          current: 10,
        }),
    );

    assert.throws(
      () =>
        calculateThreePhasePower({
          voltage: Infinity,
          current: 10,
        }),
    );
  },
);