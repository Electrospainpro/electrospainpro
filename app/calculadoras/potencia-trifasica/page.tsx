import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";
import ThreePhasePowerCalculator from "@/components/calculators/ThreePhasePowerCalculator";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadora de potencia trifásica | ElectroTools",
  description:
    "Calcula potencia e intensidad en sistemas trifásicos según tensión, intensidad y factor de potencia.",
};

const faqItems = [
  {
    question:
      "¿Cómo se calcula la potencia trifásica?",
    answer:
      "Para un sistema trifásico equilibrado, la potencia activa se calcula mediante P = √3 × V × I × cos φ, donde V es la tensión entre fases, I la intensidad y cos φ el factor de potencia.",
  },
  {
    question:
      "¿Cómo calculo la intensidad a partir de la potencia trifásica?",
    answer:
      "La intensidad se obtiene mediante I = P / (√3 × V × cos φ).",
  },
  {
    question:
      "¿Qué tensión debo introducir?",
    answer:
      "La herramienta utiliza la tensión del sistema trifásico entre fases. Como referencia habitual, un sistema trifásico puede trabajar a 400 V entre fases.",
  },
  {
    question:
      "¿Qué diferencia hay entre potencia activa y potencia aparente?",
    answer:
      "La potencia activa se expresa en vatios (W) y representa la potencia asociada al trabajo útil. La potencia aparente se expresa en voltamperios (VA) y depende de la tensión y la intensidad.",
  },
  {
    question:
      "¿Qué valor de cos φ debo utilizar?",
    answer:
      "Debe utilizarse el factor de potencia correspondiente a la carga o equipo analizado. Si no se conoce y solo se necesita una referencia básica, puede utilizarse 1.",
  },
  {
    question:
      "¿Esta calculadora sirve para dimensionar una instalación trifásica?",
    answer:
      "No por sí sola. El resultado es orientativo y el dimensionamiento definitivo debe considerar las condiciones reales de instalación, cargas, conductores, protecciones y normativa aplicable.",
  },
];

export default function ThreePhasePowerPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <header className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Calculadoras eléctricas
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Calculadora de potencia trifásica
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calcula potencia activa, intensidad y potencia
          aparente en sistemas trifásicos utilizando la
          tensión y el factor de potencia.
        </p>
      </header>

      <section className="mt-8">
        <ThreePhasePowerCalculator />
      </section>

      <AdSlot />

      <section className="mt-10">
        <FormulaCard
          title="Potencia trifásica"
          explanation="La potencia activa se obtiene considerando el factor √3 propio de un sistema trifásico. La potencia aparente se calcula a partir de la tensión y la intensidad."
        >
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">
              P = √3 × V × I × cos φ
            </p>

            <p className="text-sm text-slate-300">
              I = P / (√3 × V × cos φ)
            </p>

            <p className="text-sm text-slate-300">
              S = √3 × V × I
            </p>
          </div>
        </FormulaCard>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Ejemplo práctico
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Para un sistema trifásico de 400 V, 10 A y factor
          de potencia 0,8:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CalculatorResultRow
            label="Tensión"
            value="400"
            unit="V"
          />

          <CalculatorResultRow
            label="Intensidad"
            value="10"
            unit="A"
          />

          <CalculatorResultRow
            label="cos φ"
            value="0,8"
            unit=""
          />

          <CalculatorResultRow
            label="Potencia activa"
            value="5.543"
            unit="W"
            highlight
          />
        </div>

        <p className="mt-5 text-center text-sm font-bold text-slate-900">
          P = √3 × 400 × 10 × 0,8 ≈ 5.543 W
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Cómo utilizar la calculadora
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            Selecciona si quieres calcular la potencia o la
            intensidad.
          </p>

          <p>
            Introduce la tensión entre fases y la magnitud
            conocida. Después introduce el factor de potencia
            correspondiente a la carga.
          </p>

          <p>
            La herramienta mostrará potencia activa,
            intensidad, potencia aparente y el factor de
            potencia utilizado.
          </p>
        </div>
      </section>

      <TechnicalWarning>
        Resultado orientativo. En instalaciones reales deben
        comprobarse las condiciones de carga, características
        de los equipos, protecciones y normativa aplicable.
      </TechnicalWarning>

      <CalculatorFAQ items={faqItems} />

      <RelatedCalculators
        currentSlug="potencia-trifasica"
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
          Utiliza ElectroTools para realizar tus cálculos y
          consulta después productos, instrumentación y
          material eléctrico en ElectroSpainPro.
        </p>
      </section>
    </main>
  );
}