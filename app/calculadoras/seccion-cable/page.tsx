import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";
import CableSectionCalculator from "@/components/calculators/CableSectionCalculator";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadora de sección de cable | ElectroTools",
  description:
    "Calcula una sección de cable orientativa según potencia o intensidad, longitud, tensión, material y límite de caída de tensión.",
};

const faqItems = [
  {
    question:
      "¿Cómo calcula ElectroTools la sección recomendada?",
    answer:
      "La herramienta calcula o utiliza la intensidad introducida, evalúa las secciones estándar disponibles y calcula la caída de tensión para cada una. Recomienda la primera sección que cumple el límite de caída indicado.",
  },
  {
    question:
      "¿Puedo calcular la sección a partir de la potencia?",
    answer:
      "Sí. Puedes introducir la potencia de la carga y ElectroTools calcula la intensidad correspondiente. En trifásica se utiliza la relación entre potencia, tensión, intensidad y factor de potencia.",
  },
  {
    question:
      "¿Puedo utilizar cobre y aluminio?",
    answer:
      "Sí. Puedes seleccionar cobre o aluminio. El material modifica la resistividad utilizada para calcular la caída de tensión.",
  },
  {
    question:
      "¿La sección recomendada es válida para cualquier instalación?",
    answer:
      "No. El resultado está basado en la caída de tensión. La sección definitiva debe comprobar también la intensidad admisible y las condiciones reales de instalación.",
  },
  {
    question:
      "¿Por qué puede ser necesaria una sección mayor?",
    answer:
      "Además de la caída de tensión, la sección debe ser adecuada para la corriente que puede soportar el conductor en las condiciones reales de instalación. También influyen temperatura, agrupamiento, aislamiento y método de instalación.",
  },
  {
    question:
      "¿Qué límite de caída debo introducir?",
    answer:
      "Debes utilizar el límite que corresponda al tipo de instalación y al criterio técnico aplicable. ElectroTools no impone un porcentaje universal.",
  },
];

export default function CableSectionPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Electricidad
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Calculadora de sección de cable
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calcula una sección de conductor orientativa
          según las condiciones de la línea y encuentra
          la primera sección estándar que cumple el
          límite de caída de tensión indicado.
        </p>
      </header>

      <div className="mt-8">
        <CableSectionCalculator />
      </div>

      <AdSlot />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <FormulaCard
          title="Cálculo de intensidad y caída"
          explanation="Cuando introduces potencia, primero se obtiene la intensidad. Después se evalúa la caída de tensión de las diferentes secciones estándar."
        >
          <p className="font-mono text-base font-semibold text-white sm:text-lg">
            I = P / (V × cos φ)
          </p>

          <p className="mt-3 font-mono text-base font-semibold text-white sm:text-lg">
            ΔV = k × I × R
          </p>

          <p className="mt-3 text-xs leading-5 text-slate-300">
            En trifásica: I = P / (√3 × V × cos φ)
          </p>
        </FormulaCard>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Ejemplo
          </p>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
            Línea monofásica de 230 V
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Imagina una línea de 30 metros, 16 A,
            conductor de cobre y un límite de caída del
            3 %. La herramienta compara las secciones
            estándar hasta encontrar la primera que
            cumple el criterio de caída.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <CalculatorResultRow
              label="Tensión"
              value="230"
              unit="V"
            />

            <CalculatorResultRow
              label="Intensidad"
              value="16"
              unit="A"
            />

            <CalculatorResultRow
              label="Longitud"
              value="30"
              unit="m"
            />

            <CalculatorResultRow
              label="Material"
              value="Cobre"
            />

            <CalculatorResultRow
              label="Límite"
              value="3"
              unit="%"
            />
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Información técnica
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          La caída de tensión no es el único criterio
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            Una sección puede cumplir el límite de
            caída de tensión y, aun así, no ser adecuada
            para una instalación concreta.
          </p>

          <p>
            La selección definitiva requiere comprobar
            la intensidad admisible del conductor según
            el método de instalación y las condiciones
            reales, además de otros factores como
            temperatura, agrupamiento, aislamiento y
            características de la carga.
          </p>

          <p>
            Por este motivo ElectroTools presenta el
            resultado como una recomendación orientativa
            y no como una certificación de la instalación.
          </p>
        </div>
      </section>

      <TechnicalWarning>
        Resultado orientativo. La sección definitiva debe
        comprobarse según las condiciones reales de
        instalación, intensidad admisible, método de
        instalación, temperatura, agrupamiento,
        características de la carga y normativa aplicable.
      </TechnicalWarning>

      <CalculatorFAQ items={faqItems} />

      <RelatedCalculators
        calculators={calculators}
        currentSlug="seccion-cable"
      />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          ElectroTools
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          Cálculos eléctricos rápidos
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Utiliza ElectroTools para realizar cálculos
          habituales de electricidad de forma rápida y
          entender los criterios utilizados en cada
          resultado.
        </p>
      </section>
    </main>
  );
}