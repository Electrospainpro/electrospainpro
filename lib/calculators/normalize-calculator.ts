import type {
  CalculatorDefinition,
  CalculatorPriority,
  CalculatorRelease,
  CalculatorStatus,
  CalculatorToolType,
} from "@/types/calculator";

function splitList(value: unknown): string[] {
  if (value === undefined || value === null) {
    return [];
  }

  return String(value)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeRelease(value: unknown): CalculatorRelease {
  return String(value).trim().toUpperCase() === "V2"
    ? "V2"
    : "V1";
}

function normalizePriority(value: unknown): CalculatorPriority {
  const normalized = String(value).trim();

  switch (normalized) {
    case "Muy alta":
      return "Muy alta";

    case "Alta":
      return "Alta";

    case "Baja":
      return "Baja";

    case "Media":
    default:
      return "Media";
  }
}

function normalizeStatus(value: unknown): CalculatorStatus {
  const normalized = String(value).trim().toLowerCase();

  switch (normalized) {
    case "review":
      return "review";

    case "published":
      return "published";

    case "disabled":
      return "disabled";

    case "planned":
    default:
      return "planned";
  }
}

function normalizeToolType(value: unknown): CalculatorToolType {
  const normalized = String(value).trim().toLowerCase();

  switch (normalized) {
    case "converter":
      return "converter";

    case "calculator":
    default:
      return "calculator";
  }
}

function cleanString(value: unknown): string {
  return String(value ?? "").trim();
}

export function normalizeCalculator(
  row: Record<string, unknown>,
): CalculatorDefinition {
  return {
    toolId: cleanString(row.tool_id),
    slug: cleanString(row.slug),
    vertical: cleanString(row.vertical),
    name: cleanString(row.name),

    toolType: normalizeToolType(row.tool_type),

    release: normalizeRelease(row.release),
    priority: normalizePriority(row.priority),
    status: normalizeStatus(row.status),

    monetization: cleanString(row.monetization),

    seoTitle:
      cleanString(row.seo_title) || undefined,

    seoDescription:
      cleanString(row.seo_description) || undefined,

    inputs: splitList(row.inputs),
    outputs: splitList(row.outputs),

    formula:
      cleanString(row.formula) || undefined,

    units: splitList(row.units),

    limitations:
      cleanString(row.limitations) || undefined,

    relatedProducts: splitList(row.related_products),

    relatedGuides: splitList(row.related_guides),
  };
}