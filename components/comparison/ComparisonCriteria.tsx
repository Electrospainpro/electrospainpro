import { ComparisonCriterion } from "@/types/comparison";

interface ComparisonCriteriaProps {
  criteria: ComparisonCriterion[];
}

export default function ComparisonCriteria({
  criteria,
}: ComparisonCriteriaProps) {
  return (
    <section className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Criterios de comparación
      </h2>

      <div className="space-y-4">
        {criteria.map((criterion) => (
          <div
            key={criterion.label}
            className="flex items-center justify-between border-b pb-3"
          >
            <span className="font-medium">
              {criterion.label}
            </span>

            <span className="font-semibold text-blue-600">
              {criterion.winner}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}