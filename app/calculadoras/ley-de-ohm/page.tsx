import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import OhmsLawCalculator from "@/components/calculators/OhmsLawCalculator";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadora de Ley de Ohm | ElectroTools",
  description:
    "Calcula tensión, intensidad y resistencia con la Ley de Ohm. Herramienta eléctrica online para electricistas, instaladores y estudiantes.",
};

const faqItems = [
  {
    question: "¿Qué es la Ley de Ohm?",
    answer:
      "La Ley de Ohm relaciona la tensión, la intensidad y la resistencia de un circuito eléctrico mediante la relación V = I × R.",
  },
  {
    question:
      "¿Qué puedo calcular con esta herramienta?",
    answer:
      "Puedes calcular la tensión, la intensidad o la resistencia introduciendo las otras dos magnitudes.",
  },
  {
    question:
      "¿Qué fórmula se utiliza para calcular la tensión?",
    answer:
      "La tensión se obtiene multiplicando la intensidad por la resistencia: V = I × R.",
  },
  {
    question:
      "¿Cómo se calcula la intensidad?",
    answer:
      "La intensidad se obtiene dividiendo la tensión entre la resistencia: I = V / R.",
  },
  {
    question:
      "¿Cómo se calcula la resistencia?",
    answer:
      "La resistencia se obtiene dividiendo la tensión entre la intensidad: R = V / I.",
  },
  {
    question:
      "¿Esta calculadora sustituye un análisis de un circuito real?",
    answer:
      "No. Es una herramienta de cálculo orientativa basada en la Ley de Ohm. Los circuitos reales pueden requerir considerar características específicas de los componentes y otras condiciones de funcionamiento.",
  },
];

export default function OhmsLawPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <header className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Calculadoras eléctricas
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Calculadora de Ley de Ohm
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calcula tensión, intensidad o resistencia de forma
          rápida introduciendo las otras dos magnitudes
          eléctricas.
        </p>
      </header>

      <section className="mt-8">
        <OhmsLawCalculator />
      </section>

      <AdSlot />

      <section className="mt-10">
        <FormulaCard
          title="Ley de Ohm"
          explanation="La herramienta utiliza las tres relaciones fundamentales de la Ley de Ohm para calcular la magnitud que falta a partir de las otras dos."
        >
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">
              V = I × R
            </p>

            <p className="text-sm text-slate-300">
              I = V / R&nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;R = V / I
            </p>
          </div>
        </FormulaCard>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Ejemplo práctico
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Si tenemos una tensión de 230 V y una resistencia
          de 23 Ω, podemos calcular la intensidad:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <CalculatorResultRow
            label="Tensión"
            value="230"
            unit="V"
          />

          <CalculatorResultRow
            label="Resistencia"
            value="23"
            unit="Ω"
          />

          <CalculatorResultRow
            label="Intensidad"
            value="10"
            unit="A"
            highlight
          />
        </div>

        <p className="mt-5 text-center text-sm font-bold text-slate-900">
          I = 230 / 23 = 10 A
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Cómo utilizar la calculadora
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            Primero selecciona la magnitud que quieres
            calcular: tensión, intensidad o resistencia.
          </p>

          <p>
            Después introduce las otras dos magnitudes y
            pulsa «Calcular». La herramienta mostrará los
            tres valores y destacará el resultado calculado.
          </p>

          <p>
            Todos los valores deben ser positivos y deben
            expresarse utilizando las unidades indicadas.
          </p>
        </div>
      </section>

      <TechnicalWarning>
        Resultado orientativo basado en la Ley de Ohm. En
        circuitos reales deben considerarse las características
        y condiciones específicas de los componentes.
      </TechnicalWarning>

      <CalculatorFAQ items={faqItems} />

      <RelatedCalculators
        currentSlug="ley-de-ohm"
        calculators={calculators}
      />

      <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          ElectroSpainPro
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Calcula primero. Compara después.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Utiliza ElectroTools para tus cálculos y consulta
          después productos, instrumentación y material
          eléctrico en ElectroSpainPro.
        </p>
      </section>
    </main>
  );
}