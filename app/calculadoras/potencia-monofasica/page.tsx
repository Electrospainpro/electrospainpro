import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import SinglePhasePowerCalculator from "@/components/calculators/SinglePhasePowerCalculator";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadora de potencia monofásica | ElectroTools",
  description:
    "Calcula potencia e intensidad en sistemas monofásicos según tensión, intensidad y factor de potencia.",
};

const faqItems = [
  {
    question:
      "¿Cómo se calcula la potencia monofásica?",
    answer:
      "Para una carga monofásica se puede calcular la potencia activa mediante P = V × I × cos φ, donde V es la tensión, I la intensidad y cos φ el factor de potencia.",
  },
  {
    question:
      "¿Qué ocurre si el factor de potencia es 1?",
    answer:
      "Cuando el factor de potencia es 1, la potencia activa coincide numéricamente con la potencia aparente en el modelo utilizado por esta herramienta.",
  },
  {
    question:
      "¿Cómo calculo la intensidad a partir de la potencia?",
    answer:
      "La intensidad se obtiene mediante I = P / (V × cos φ).",
  },
  {
    question:
      "¿Qué diferencia hay entre W y VA?",
    answer:
      "Los vatios (W) representan la potencia activa, mientras que los voltamperios (VA) representan la potencia aparente.",
  },
  {
    question:
      "¿Qué valor de cos φ debo introducir?",
    answer:
      "Debe utilizarse el factor de potencia correspondiente a la carga o equipo analizado. Si se desconoce y solo se necesita una referencia básica, la herramienta permite utilizar 1 como valor predeterminado.",
  },
  {
    question:
      "¿La calculadora sirve para dimensionar una instalación?",
    answer:
      "No por sí sola. El resultado es orientativo y el dimensionamiento definitivo debe considerar las características reales de la instalación, las cargas, protecciones, conductores y normativa aplicable.",
  },
];

export default function SinglePhasePowerPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <header className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Calculadoras eléctricas
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Calculadora de potencia monofásica
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calcula potencia activa, intensidad y potencia
          aparente en un sistema monofásico utilizando la
          tensión y el factor de potencia.
        </p>
      </header>

      <section className="mt-8">
        <SinglePhasePowerCalculator />
      </section>

      <AdSlot />

      <section className="mt-10">
        <FormulaCard
          title="Potencia monofásica"
          explanation="La potencia activa se obtiene a partir de la tensión, la intensidad y el factor de potencia. La potencia aparente se calcula como el producto de tensión e intensidad."
        >
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">
              P = V × I × cos φ
            </p>

            <p className="text-sm text-slate-300">
              I = P / (V × cos φ)
            </p>

            <p className="text-sm text-slate-300">
              S = V × I
            </p>
          </div>
        </FormulaCard>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Ejemplo práctico
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Para una instalación monofásica de 230 V y 10 A
          con un factor de potencia de 0,8:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CalculatorResultRow
            label="Tensión"
            value="230"
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
            value="1.840"
            unit="W"
            highlight
          />
        </div>

        <p className="mt-5 text-center text-sm font-bold text-slate-900">
          P = 230 × 10 × 0,8 = 1.840 W
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
            Introduce la tensión del sistema y la magnitud
            conocida. Después introduce el factor de potencia
            correspondiente a la carga.
          </p>

          <p>
            La herramienta mostrará la potencia activa, la
            intensidad, la potencia aparente y el factor de
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
        currentSlug="potencia-monofasica"
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