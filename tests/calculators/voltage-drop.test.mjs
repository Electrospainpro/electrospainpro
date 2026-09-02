import assert from "node:assert/strict";
import test from "node:test";

const COPPER_RESISTIVITY = 0.0175;
const ALUMINUM_RESISTIVITY = 0.0285;

function getResistivity(material) {
  if (material === "copper") {
    return COPPER_RESISTIVITY;
  }

  if (material === "aluminum") {
    return ALUMINUM_RESISTIVITY;
  }

  throw new Error(
    `Material de conductor no soportado: ${material}`,
  );
}

function calculateVoltageDrop(input) {
  if (!Number.isFinite(input.voltage) || input.voltage <= 0) {
    throw new Error("La tensión debe ser un número mayor que 0.");
  }

  if (!Number.isFinite(input.length) || input.length <= 0) {
    throw new Error("La longitud debe ser un número mayor que 0.");
  }

  if (!Number.isFinite(input.current) || input.current <= 0) {
    throw new Error("La intensidad debe ser un número mayor que 0.");
  }

  if (!Number.isFinite(input.section) || input.section <= 0) {
    throw new Error("La sección debe ser un número mayor que 0.");
  }

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

  const result = {
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

function round(value, decimals) {
  const factor = 10 ** decimals;

  return (
    Math.round(
      (value + Number.EPSILON) * factor,
    ) / factor
  );
}

test(
  "caída de tensión monofásica con cobre",
  () => {
    const result =
      calculateVoltageDrop({
        system: "single-phase",
        voltage: 230,
        length: 30,
        current: 16,
        section: 2.5,
        material: "copper",
      });

    assert.ok(result.voltageDrop > 0);
    assert.ok(result.voltageDropPercent > 0);
    assert.ok(result.finalVoltage < 230);
  },
);

test(
  "caída de tensión trifásica",
  () => {
    const singlePhase =
      calculateVoltageDrop({
        system: "single-phase",
        voltage: 400,
        length: 30,
        current: 16,
        section: 6,
        material: "copper",
      });

    const threePhase =
      calculateVoltageDrop({
        system: "three-phase",
        voltage: 400,
        length: 30,
        current: 16,
        section: 6,
        material: "copper",
      });

    assert.ok(
      threePhase.voltageDrop <
        singlePhase.voltageDrop,
    );
  },
);

test(
  "el aluminio produce mayor caída que el cobre",
  () => {
    const copper =
      calculateVoltageDrop({
        system: "single-phase",
        voltage: 230,
        length: 30,
        current: 16,
        section: 2.5,
        material: "copper",
      });

    const aluminum =
      calculateVoltageDrop({
        system: "single-phase",
        voltage: 230,
        length: 30,
        current: 16,
        section: 2.5,
        material: "aluminum",
      });

    assert.ok(
      aluminum.voltageDrop >
        copper.voltageDrop,
    );
  },
);

test(
  "comprueba el límite introducido",
  () => {
    const result =
      calculateVoltageDrop({
        system: "single-phase",
        voltage: 230,
        length: 30,
        current: 16,
        section: 2.5,
        material: "copper",
        limitPercent: 3,
      });

    assert.equal(
      result.limitPercent,
      3,
    );

    assert.equal(
      result.withinLimit,
      true,
    );
  },
);

test(
  "rechaza valores inválidos",
  () => {
    assert.throws(
      () =>
        calculateVoltageDrop({
          system: "single-phase",
          voltage: 230,
          length: 0,
          current: 16,
          section: 2.5,
          material: "copper",
        }),
    );

    assert.throws(
      () =>
        calculateVoltageDrop({
          system: "single-phase",
          voltage: 230,
          length: 30,
          current: -16,
          section: 2.5,
          material: "copper",
        }),
    );
  },
);