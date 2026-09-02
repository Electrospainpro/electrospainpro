import assert from "node:assert/strict";
import test from "node:test";

const COPPER_RESISTIVITY = 0.0175;
const ALUMINUM_RESISTIVITY = 0.0285;

const STANDARD_CABLE_SECTIONS = [
  1,
  1.5,
  2.5,
  4,
  6,
  10,
  16,
  25,
  35,
  50,
  70,
  95,
  120,
  150,
  185,
  240,
  300,
];

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
  const resistivity =
    getResistivity(input.material);

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
    (voltageDrop / input.voltage) *
    100;

  return {
    voltageDrop,
    voltageDropPercent,
    finalVoltage:
      input.voltage - voltageDrop,
    withinLimit:
      voltageDropPercent <=
      input.limitPercent,
  };
}

function calculateCableSection(input) {
  if (
    !Number.isFinite(input.voltage) ||
    input.voltage <= 0
  ) {
    throw new Error("Tensión inválida");
  }

  if (
    !Number.isFinite(input.length) ||
    input.length <= 0
  ) {
    throw new Error("Longitud inválida");
  }

  if (
    !Number.isFinite(input.limitPercent) ||
    input.limitPercent <= 0
  ) {
    throw new Error("Límite inválido");
  }

  let current;

  if (
    input.current !== undefined &&
    Number.isFinite(input.current) &&
    input.current > 0
  ) {
    current = input.current;
  } else {
    if (
      !Number.isFinite(input.power) ||
      input.power <= 0
    ) {
      throw new Error(
        "Potencia o intensidad inválida",
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
        "Factor de potencia inválido",
      );
    }

    if (
      input.system ===
      "single-phase"
    ) {
      current =
        input.power /
        (input.voltage *
          powerFactor);
    } else {
      current =
        input.power /
        (Math.sqrt(3) *
          input.voltage *
          powerFactor);
    }
  }

  const alternatives =
    STANDARD_CABLE_SECTIONS.map(
      (section) => {
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
          ...result,
        };
      },
    );

  const recommended =
    alternatives.find(
      (item) =>
        item.withinLimit,
    );

  return {
    current,
    recommendedSection:
      recommended?.section,
    alternatives,
  };
}

test(
  "selecciona una sección válida por caída de tensión",
  () => {
    const result =
      calculateCableSection({
        system: "single-phase",
        voltage: 230,
        length: 30,
        current: 16,
        material: "copper",
        limitPercent: 3,
      });

    assert.equal(
      result.recommendedSection,
      2.5,
    );

    assert.ok(
      result.alternatives.length > 0,
    );
  },
);

test(
  "calcula la intensidad a partir de potencia monofásica",
  () => {
    const result =
      calculateCableSection({
        system: "single-phase",
        voltage: 230,
        length: 20,
        power: 3680,
        powerFactor: 1,
        material: "copper",
        limitPercent: 3,
      });

    assert.equal(
      result.current,
      16,
    );

    assert.ok(
      result.recommendedSection,
    );
  },
);

test(
  "calcula la intensidad a partir de potencia trifásica",
  () => {
    const result =
      calculateCableSection({
        system: "three-phase",
        voltage: 400,
        length: 30,
        power:
          Math.sqrt(3) *
          400 *
          16,
        powerFactor: 1,
        material: "copper",
        limitPercent: 3,
      });

    assert.equal(
      Math.round(
        result.current * 100,
      ) / 100,
      16,
    );

    assert.ok(
      result.recommendedSection,
    );
  },
);

test(
  "una sección mayor reduce la caída de tensión",
  () => {
    const result =
      calculateCableSection({
        system: "single-phase",
        voltage: 230,
        length: 50,
        current: 20,
        material: "copper",
        limitPercent: 3,
      });

    const section2_5 =
      result.alternatives.find(
        (item) =>
          item.section === 2.5,
      );

    const section6 =
      result.alternatives.find(
        (item) =>
          item.section === 6,
      );

    assert.ok(section2_5);
    assert.ok(section6);

    assert.ok(
      section6.voltageDrop <
        section2_5.voltageDrop,
    );
  },
);

test(
  "el aluminio necesita una sección igual o superior en este escenario",
  () => {
    const copper =
      calculateCableSection({
        system: "single-phase",
        voltage: 230,
        length: 50,
        current: 20,
        material: "copper",
        limitPercent: 3,
      });

    const aluminum =
      calculateCableSection({
        system: "single-phase",
        voltage: 230,
        length: 50,
        current: 20,
        material: "aluminum",
        limitPercent: 3,
      });

    assert.ok(
      aluminum.recommendedSection >=
        copper.recommendedSection,
    );
  },
);

test(
  "rechaza valores inválidos",
  () => {
    assert.throws(
      () =>
        calculateCableSection({
          system: "single-phase",
          voltage: 230,
          length: 0,
          current: 16,
          material: "copper",
          limitPercent: 3,
        }),
    );

    assert.throws(
      () =>
        calculateCableSection({
          system: "single-phase",
          voltage: 230,
          length: 30,
          current: 16,
          material: "copper",
          limitPercent: 0,
        }),
    );
  },
);