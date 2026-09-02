import Link from "next/link";

import type { CalculatorDefinition } from "@/types/calculator";

interface RelatedCalculatorsProps {
  calculators: CalculatorDefinition[];
  currentSlug: string;
}

const availableRoutes = new Set([
  "caida-tension",
]);

export default function RelatedCalculators({
  calculators,
  currentSlug,
}: RelatedCalculatorsProps) {
  const related = calculators
    .filter(
      (calculator) =>
        calculator.slug !== currentSlug &&
        calculator.release === "V1",
    )
    .slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          ElectroTools
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Otras calculadoras
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Más herramientas técnicas para realizar
          cálculos habituales de electricidad.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((calculator) => {
          const isAvailable =
            availableRoutes.has(
              calculator.slug,
            );

          const cardClass =
            "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition";

          if (isAvailable) {
            return (
              <Link
                key={calculator.toolId}
                href={`/calculadoras/${calculator.slug}`}
                className={`${cardClass} hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  {calculator.toolId}
                </p>

                <h3 className="mt-2 text-base font-bold text-slate-900">
                  {calculator.name}
                </h3>

                <p className="mt-2 text-sm leading-5 text-slate-500">
                  Abrir calculadora
                </p>
              </Link>
            );
          }

          return (
            <div
              key={calculator.toolId}
              className={`${cardClass} opacity-90`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                {calculator.toolId}
              </p>

              <h3 className="mt-2 text-base font-bold text-slate-900">
                {calculator.name}
              </h3>

              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                Próximamente
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}