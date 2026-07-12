import ComparisonCard from "@/components/comparison/ComparisonCard";

import { getAllComparisons } from "@/lib/comparisons";

export default function ComparativaPage() {
  const comparisons = getAllComparisons();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header>
        <h1 className="text-4xl font-bold">
          Comparativas profesionales
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          Comparamos productos utilizados por profesionales para ayudarte
          a elegir la mejor opción según calidad, fiabilidad, precio y
          experiencia de instalación.
        </p>
      </header>

      {comparisons.length === 0 ? (
        <div className="mt-12 rounded-2xl border bg-gray-50 p-8">
          <h2 className="text-2xl font-semibold">
            Todavía no hay comparativas publicadas.
          </h2>
        </div>
      ) : (
        <section className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison) => (
            <ComparisonCard
              key={comparison.id}
              comparison={comparison}
            />
          ))}
        </section>
      )}
    </main>
  );
}