export const COPPER_RESISTIVITY_OHM_MM2_PER_M = 0.0175;

export const ALUMINUM_RESISTIVITY_OHM_MM2_PER_M = 0.0285;

export const STANDARD_CABLE_SECTIONS_MM2 = [
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
] as const;

export type ConductorMaterial = "copper" | "aluminum";

export type ElectricalSystem =
  | "single-phase"
  | "three-phase";

export function getResistivity(
  material: ConductorMaterial,
): number {
  switch (material) {
    case "copper":
      return COPPER_RESISTIVITY_OHM_MM2_PER_M;

    case "aluminum":
      return ALUMINUM_RESISTIVITY_OHM_MM2_PER_M;

    default:
      throw new Error(
        `Material de conductor no soportado: ${material}`,
      );
  }
}