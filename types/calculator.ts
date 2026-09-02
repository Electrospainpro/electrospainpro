export type CalculatorRelease = "V1" | "V2";

export type CalculatorPriority =
  | "Muy alta"
  | "Alta"
  | "Media"
  | "Baja";

export type CalculatorStatus =
  | "planned"
  | "review"
  | "published"
  | "disabled";

export interface CalculatorDefinition {
  toolId: string;
  slug: string;
  vertical: string;
  name: string;

  release: CalculatorRelease;
  priority: CalculatorPriority;
  status: CalculatorStatus;

  monetization: string;

  seoTitle?: string;
  seoDescription?: string;

  inputs: string[];
  outputs: string[];

  formula?: string;
  units: string[];

  limitations?: string;

  relatedProducts: string[];
  relatedGuides: string[];
}