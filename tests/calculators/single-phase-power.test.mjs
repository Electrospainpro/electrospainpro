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

function calculateSinglePhasePower(
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
      (input.voltage *
        powerFactor);
  }

  const apparentPower =
    input.voltage * current;

  return {
    voltage: input.voltage,
    current,
    power,
    apparentPower,
    powerFactor,
  };
}

test(
  "calcula potencia monofásica desde tensión e intensidad",
  () => {
    const result =
      calculateSinglePhasePower({
        voltage: 230,
        current: 10,
      });

    assert.equal(
      result.power,
      2300,
    );

    assert.equal(
      result.current,
      10,
    );

    assert.equal(
      result.apparentPower,
      2300,
    );
  },
);

test(
  "calcula intensidad desde potencia monofásica",
  () => {
    const result =
      calculateSinglePhasePower({
        voltage: 230,
        power: 2300,
      });

    assert.equal(
      result.current,
      10,
    );

    assert.equal(
      result.power,
      2300,
    );
  },
);

test(
  "tiene en cuenta el factor de potencia",
  () => {
    const result =
      calculateSinglePhasePower({
        voltage: 230,
        current: 10,
        powerFactor: 0.8,
      });

    assert.equal(
      result.power,
      1840,
    );

    assert.equal(
      result.apparentPower,
      2300,
    );
  },
);

test(
  "calcula correctamente con potencia y cos phi",
  () => {
    const result =
      calculateSinglePhasePower({
        voltage: 230,
        power: 1840,
        powerFactor: 0.8,
      });

    assert.equal(
      result.current,
      10,
    );
  },
);

test(
  "el factor de potencia por defecto es 1",
  () => {
    const result =
      calculateSinglePhasePower({
        voltage: 230,
        current: 16,
      });

    assert.equal(
      result.powerFactor,
      1,
    );

    assert.equal(
      result.power,
      3680,
    );
  },
);

test(
  "rechaza introducir potencia e intensidad simultáneamente",
  () => {
    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
          current: 10,
          power: 2300,
        }),
    );
  },
);

test(
  "rechaza no introducir ni potencia ni intensidad",
  () => {
    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
        }),
    );
  },
);

test(
  "rechaza factor de potencia inválido",
  () => {
    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
          current: 10,
          powerFactor: 0,
        }),
    );

    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
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
        calculateSinglePhasePower({
          voltage: 0,
          current: 10,
        }),
    );

    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
          current: -10,
        }),
    );

    assert.throws(
      () =>
        calculateSinglePhasePower({
          voltage: 230,
          power: 0,
        }),
    );
  },
);