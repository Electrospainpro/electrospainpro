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

function calculateOhmsLaw(input) {
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
      "Debes introducir exactamente dos valores.",
    );
  }

  if (hasVoltage) {
    assertPositive(
      input.voltage,
      "La tensión",
    );
  }

  if (hasCurrent) {
    assertPositive(
      input.current,
      "La intensidad",
    );
  }

  if (hasResistance) {
    assertPositive(
      input.resistance,
      "La resistencia",
    );
  }

  let voltage;
  let current;
  let resistance;
  let calculated;
  let formula;

  if (
    hasCurrent &&
    hasResistance
  ) {
    current = input.current;
    resistance = input.resistance;
    voltage = current * resistance;

    calculated = "voltage";
    formula = "V = I × R";
  } else if (
    hasVoltage &&
    hasResistance
  ) {
    voltage = input.voltage;
    resistance = input.resistance;
    current = voltage / resistance;

    calculated = "current";
    formula = "I = V / R";
  } else {
    voltage = input.voltage;
    current = input.current;
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
    voltage,
    current,
    resistance,
    formula,
  };
}

test(
  "calcula la tensión V = I × R",
  () => {
    const result =
      calculateOhmsLaw({
        current: 2,
        resistance: 10,
      });

    assert.equal(
      result.calculated,
      "voltage",
    );

    assert.equal(
      result.voltage,
      20,
    );

    assert.equal(
      result.formula,
      "V = I × R",
    );
  },
);

test(
  "calcula la intensidad I = V / R",
  () => {
    const result =
      calculateOhmsLaw({
        voltage: 230,
        resistance: 46,
      });

    assert.equal(
      result.calculated,
      "current",
    );

    assert.equal(
      result.current,
      5,
    );

    assert.equal(
      result.formula,
      "I = V / R",
    );
  },
);

test(
  "calcula la resistencia R = V / I",
  () => {
    const result =
      calculateOhmsLaw({
        voltage: 230,
        current: 10,
      });

    assert.equal(
      result.calculated,
      "resistance",
    );

    assert.equal(
      result.resistance,
      23,
    );

    assert.equal(
      result.formula,
      "R = V / I",
    );
  },
);

test(
  "calcula valores decimales correctamente",
  () => {
    const result =
      calculateOhmsLaw({
        current: 1.5,
        resistance: 12.5,
      });

    assert.equal(
      result.voltage,
      18.75,
    );
  },
);

test(
  "rechaza introducir menos de dos valores",
  () => {
    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: 230,
        }),
    );
  },
);

test(
  "rechaza introducir los tres valores",
  () => {
    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: 230,
          current: 10,
          resistance: 23,
        }),
    );
  },
);

test(
  "rechaza valores iguales o menores que cero",
  () => {
    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: 230,
          current: 0,
        }),
    );

    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: -230,
          resistance: 23,
        }),
    );
  },
);

test(
  "rechaza NaN e Infinity",
  () => {
    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: NaN,
          current: 10,
        }),
    );

    assert.throws(
      () =>
        calculateOhmsLaw({
          voltage: Infinity,
          resistance: 10,
        }),
    );
  },
);