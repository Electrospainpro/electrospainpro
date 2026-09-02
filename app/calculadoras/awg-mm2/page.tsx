import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import AwgMm2Calculator from "@/components/calculators/AwgMm2Calculator";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";
import CalculatorResultRow from "@/components/calculators/CalculatorResultRow";
import FormulaCard from "@/components/calculators/FormulaCard";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import TechnicalWarning from "@/components/calculators/TechnicalWarning";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Conversor AWG a mm² y mm² a AWG | ElectroTools",
  description:
    "Convierte calibres AWG a mm² y encuentra la equivalencia AWG más próxima para una sección de cable métrica.",
};

const faqItems = [
  {
    question: "¿Qué significa AWG?",
    answer:
      "AWG significa American Wire Gauge y es un sistema utilizado para expresar el calibre de conductores eléctricos. En este sistema, los valores de calibre más pequeños representan normalmente conductores de mayor sección.",
  },
  {
    question:
      "¿AWG y mm² son exactamente equivalentes?",
    answer:
      "No. AWG y mm² pertenecen a sistemas de medida diferentes. La equivalencia mostrada por esta herramienta es aproximada y utiliza una tabla de equivalencias comerciales.",
  },
  {
    question:
      "¿Qué AWG corresponde aproximadamente a 3,3 mm²?",
    answer:
      "Según la tabla utilizada por ElectroTools, 3,3 mm² está más próximo a AWG 12, cuya sección de referencia es aproximadamente 3,31 mm².",
  },
  {
    question:
      "¿Puedo utilizar esta equivalencia para elegir un cable?",
    answer:
      "La equivalencia sirve como referencia entre sistemas de medida, pero no determina por sí sola la sección adecuada de un conductor. La selección definitiva debe considerar intensidad admisible, método de instalación, longitud, caída de tensión, temperatura y normativa aplicable.",
  },
  {
    question:
      "¿Qué significa 1/0 AWG?",
    answer:
      "1/0 AWG corresponde al primer calibre denominado cero aumentado. En la tabla de equivalencias de esta herramienta se representa mediante el valor interno 0.",
  },
];

export default function AwgMm2Page() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <header className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          ElectroTools · Calculadoras eléctricas
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Conversor AWG ↔ mm²
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Convierte rápidamente un calibre AWG a su
          sección equivalente en mm² o encuentra el
          calibre AWG más próximo a una sección métrica.
        </p>
      </header>

      <section className="mt-8">
        <AwgMm2Calculator />
      </section>

      <AdSlot />

      <section className="mt-10">
        <FormulaCard
          title="Equivalencia comercial aproximada"
          explanation="La herramienta utiliza una tabla de equivalencias entre calibres AWG y secciones métricas. Cuando se introduce una sección en mm², se selecciona el calibre de la tabla cuya sección de referencia presenta la menor diferencia absoluta."
        >
          <p className="text-lg font-semibold text-white sm:text-xl">
            AWG ↔ mm²
          </p>
        </FormulaCard>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Ejemplo de conversión
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Si necesitamos conocer la equivalencia aproximada
          de una sección de 3,3 mm²:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <CalculatorResultRow
            label="Entrada"
            value="3,3"
            unit="mm²"
          />

          <CalculatorResultRow
            label="AWG más próximo"
            value="12"
            unit="AWG"
            highlight
          />

          <CalculatorResultRow
            label="Referencia"
            value="3,31"
            unit="mm²"
          />
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Cómo interpretar el resultado
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            El resultado permite relacionar una designación
            AWG con una sección métrica aproximada. Es
            especialmente útil cuando una ficha técnica,
            herramienta o producto utiliza AWG y necesitas
            compararlo con las secciones habituales expresadas
            en mm².
          </p>

          <p>
            La conversión no sustituye el cálculo de sección
            de un conductor. Para una instalación real también
            deben comprobarse las condiciones eléctricas y de
            instalación correspondientes.
          </p>
        </div>
      </section>

      <TechnicalWarning />

      <section className="mt-10">
        <CalculatorFAQ items={faqItems} />
      </section>

      <section className="mt-10">
        <RelatedCalculators
          currentSlug="awg-mm2"
          calculators={calculators}
        />
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          ElectroSpainPro + ElectroTools
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          Calcula primero. Compara después.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Utiliza las herramientas técnicas de ElectroTools
          y consulta después productos, instrumentación y
          material eléctrico en ElectroSpainPro.
        </p>
      </section>
    </main>
  );
}