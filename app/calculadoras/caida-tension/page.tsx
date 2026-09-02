import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";
import VoltageDropCalculator from "@/components/calculators/VoltageDropCalculator";

import {
  calculateVoltageDrop,
} from "@/lib/calculators/voltage-drop";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadora de caída de tensión | ElectroTools",
  description:
    "Calcula la caída de tensión en una línea eléctrica según tensión, longitud, intensidad, sección y material del conductor.",
};

const example = calculateVoltageDrop({
  system: "single-phase",
  voltage: 230,
  length: 30,
  current: 16,
  section: 2.5,
  material: "copper",
  limitPercent: 3,
});

const faqItems = [
  {
    question:
      "¿Qué es la caída de tensión?",
    answer:
      "Es la reducción de tensión que se produce a lo largo de un conductor debido a su resistencia eléctrica cuando circula corriente por él. Cuanto mayor sean la longitud y la intensidad, mayor será normalmente la caída.",
  },
  {
    question:
      "¿Qué datos necesito para calcularla?",
    answer:
      "La herramienta necesita el sistema eléctrico, la tensión, la longitud de la línea, la intensidad, la sección del conductor, el material y el límite de caída que quieras comprobar.",
  },
  {
    question:
      "¿La calculadora sirve para monofásica y trifásica?",
    answer:
      "Sí. Puedes seleccionar sistema monofásico o trifásico. El motor utiliza el factor correspondiente para cada sistema.",
  },
  {
    question:
      "¿Puedo utilizar cobre o aluminio?",
    answer:
      "Sí. La herramienta dispone de ambos materiales y utiliza una resistividad de referencia diferente para cada uno.",
  },
  {
    question:
      "¿La calculadora determina la sección definitiva del cable?",
    answer:
      "No. Esta herramienta calcula la caída de tensión para la sección introducida. La selección definitiva debe comprobar también la intensidad admisible, método de instalación, temperatura, agrupamiento, características de la carga y normativa aplicable.",
  },
  {
    question:
      "¿El límite de caída siempre es del 3 %?",
    answer:
      "No. El límite depende del tipo de instalación y del criterio que corresponda. Por eso ElectroTools permite introducir el límite que quieras comprobar en lugar de imponer un valor universal.",
  },
];

export default function VoltageDropPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <header className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Electricidad
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Calculadora de caída de tensión
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calcula de forma rápida la caída de tensión
          de una línea eléctrica y comprueba el
          porcentaje obtenido frente al límite que
          introduzcas.
        </p>
      </header>

      <div className="mt-8">
        <VoltageDropCalculator />
      </div>

      <AdSlot />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <FormulaCard
          title="Cómo se calcula"
          explanation="El cálculo utiliza la resistividad de referencia del material seleccionado, la longitud de la línea y la sección del conductor. En monofásica se considera el recorrido de ida y vuelta; en trifásica se utiliza el factor √3."
        >
          <p className="font-mono text-base font-semibold text-white sm:text-lg">
            R = ρ × L / S
          </p>

          <p className="mt-3 font-mono text-base font-semibold text-white sm:text-lg">
            ΔV = k × I × R
          </p>

          <p className="mt-3 text-xs leading-5 text-slate-300">
            k = 2 para monofásica · k = √3 para
            trifásica
          </p>
        </FormulaCard>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Ejemplo real de cálculo
          </p>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
            230 V · 30 m · 16 A · 2,5 mm²
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Para una línea monofásica de 230 V, 30
            metros, 16 A y conductor de cobre de 2,5
            mm², con un límite introducido del 3 %,
            el mismo motor utilizado por la
            calculadora obtiene:
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <CalculatorResultRow
              label="Caída de tensión"
              value={example.voltageDrop}
              unit="V"
              highlight
            />

            <CalculatorResultRow
              label="Caída porcentual"
              value={example.voltageDropPercent}
              unit="%"
            />

            <CalculatorResultRow
              label="Tensión final"
              value={example.finalVoltage}
              unit="V"
            />

            <CalculatorResultRow
              label="Resistencia"
              value={example.resistance}
              unit="Ω"
            />

            <CalculatorResultRow
              label="Estado"
              value={
                example.withinLimit
                  ? "Dentro del límite"
                  : "Supera el límite"
              }
            />
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          Información técnica
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          ¿Por qué aumenta la caída de tensión?
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            La caída aumenta cuando crece la longitud
            de la línea o la intensidad que circula por
            el conductor. También depende de la sección
            y del material utilizado.
          </p>

          <p>
            A igualdad de condiciones, aumentar la
            sección reduce la resistencia del conductor
            y, por tanto, reduce la caída de tensión
            calculada.
          </p>

          <p>
            La herramienta utiliza valores de
            resistividad de referencia. No sustituye
            una comprobación completa de la instalación.
          </p>
        </div>
      </section>

      <TechnicalWarning>
        Resultado orientativo. La selección definitiva
        debe comprobarse según las condiciones reales
        de instalación, intensidad admisible, método de
        instalación, temperatura, agrupamiento,
        características de la carga y normativa
        aplicable.
      </TechnicalWarning>

      <CalculatorFAQ items={faqItems} />

      <RelatedCalculators
        calculators={calculators}
        currentSlug="caida-tension"
      />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          ElectroTools
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
          Herramientas eléctricas para instaladores
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          ElectroTools está diseñado para ofrecer
          cálculos técnicos rápidos y prácticos para
          electricistas, instaladores, técnicos y
          estudiantes.
        </p>
      </section>
    </main>
  );
}