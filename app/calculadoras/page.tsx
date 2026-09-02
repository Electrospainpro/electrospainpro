import Link from "next/link";
import type { Metadata } from "next";

import AdSlot from "@/components/ads/AdSlot";
import CalculatorFAQ from "@/components/calculators/CalculatorFAQ";

import { calculators } from "@/data/calculators";

export const metadata: Metadata = {
  title:
    "Calculadoras eléctricas para profesionales | ElectroTools",
  description:
    "Calculadoras eléctricas online para instaladores, electricistas y técnicos: caída de tensión, sección de cable, AWG, Ley de Ohm y potencia eléctrica.",
};

const availableSlugs = new Set([
  "caida-tension",
  "seccion-cable",
  "awg-mm2",
]);

const faqItems = [
  {
    question:
      "¿Qué calculadoras eléctricas ofrece ElectroTools?",
    answer:
      "ElectroTools reúne herramientas para realizar cálculos habituales de electricidad, incluyendo caída de tensión, sección de cable, conversión AWG ↔ mm², Ley de Ohm y potencia eléctrica monofásica y trifásica.",
  },
  {
    question:
      "¿Los resultados de las calculadoras sirven para una instalación real?",
    answer:
      "Los resultados son orientativos. Una selección definitiva debe comprobar las condiciones reales de instalación, los criterios técnicos aplicables y la normativa correspondiente.",
  },
  {
    question:
      "¿Puedo utilizar ElectroTools desde el móvil?",
    answer:
      "Sí. Las calculadoras están diseñadas para utilizarse desde ordenador, tablet o móvil, facilitando consultas rápidas durante trabajos de instalación o cálculo.",
  },
  {
    question:
      "¿Qué diferencia hay entre ElectroTools y ElectroSpainPro?",
    answer:
      "ElectroTools está orientado a herramientas y cálculos técnicos. ElectroSpainPro está orientado al catálogo, comparación de productos, ofertas, fabricantes y contenido técnico.",
  },
];

const v1Calculators = calculators.filter(
  (calculator) =>
    calculator.release === "V1",
);

const v2Calculators = calculators.filter(
  (calculator) =>
    calculator.release === "V2",
);

function CalculatorCard({
  toolId,
  slug,
  name,
  description,
  available,
}: {
  toolId: string;
  slug: string;
  name: string;
  description: string;
  available: boolean;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
          {toolId}
        </span>

        {available ? (
          <span className="inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            Disponible
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
            Próximamente
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
        {name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

      {available ? (
        <span className="mt-5 inline-flex text-sm font-bold text-slate-900">
          Abrir calculadora →
        </span>
      ) : null}
    </>
  );

  if (!available) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/calculadoras/${slug}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      {content}
    </Link>
  );
}

function getCalculatorDescription(
  slug: string,
): string {
  switch (slug) {
    case "caida-tension":
      return "Calcula la caída de tensión en una línea según tensión, longitud, intensidad, sección y material.";

    case "seccion-cable":
      return "Obtén una sección de cable orientativa considerando potencia o intensidad, longitud, material y caída de tensión.";

    case "awg-mm2":
      return "Convierte calibres AWG a mm² y encuentra la equivalencia AWG más próxima a una sección métrica.";

    case "ley-de-ohm":
      return "Calcula tensión, intensidad, resistencia y potencia a partir de los valores eléctricos conocidos.";

    case "potencia-monofasica":
      return "Calcula potencia, tensión, intensidad y otros parámetros básicos de circuitos monofásicos.";

    case "potencia-trifasica":
      return "Calcula potencia e intensidad en sistemas trifásicos según los parámetros introducidos.";

    default:
      return "Herramienta técnica de cálculo eléctrico para profesionales.";
  }
}

export default function CalculadorasPage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <section className="rounded-3xl border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            ElectroSpainPro · ElectroTools
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Calculadoras eléctricas
            <span className="block text-slate-400">
              rápidas y orientadas al profesional
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Introduce los datos, realiza el cálculo y obtén
            una referencia técnica en segundos. Herramientas
            pensadas para electricistas, instaladores,
            técnicos y estudiantes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#calculadoras"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Ver calculadoras
            </a>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-700 px-5 text-sm font-bold text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              Ir a ElectroSpainPro
            </Link>
          </div>
        </div>
      </section>

      <section
        id="calculadoras"
        className="scroll-mt-8 pt-12"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            ElectroTools V1
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Calculadoras disponibles
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Herramientas técnicas disponibles actualmente
            para realizar cálculos eléctricos habituales.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {v1Calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.toolId}
              toolId={calculator.toolId}
              slug={calculator.slug}
              name={calculator.name}
              description={getCalculatorDescription(
                calculator.slug,
              )}
              available={availableSlugs.has(
                calculator.slug,
              )}
            />
          ))}
        </div>
      </section>

      <AdSlot />

      <section className="pt-4">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Próximamente
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Más herramientas técnicas
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            ElectroTools crecerá con nuevas herramientas
            orientadas a electricidad, telecomunicaciones,
            informática e instalaciones técnicas.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {v2Calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.toolId}
              toolId={calculator.toolId}
              slug={calculator.slug}
              name={calculator.name}
              description={getCalculatorDescription(
                calculator.slug,
              )}
              available={false}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-2xl">⚡</span>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Rápido
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Introduce los parámetros necesarios y obtén
            el resultado sin pasos innecesarios.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-2xl">🧮</span>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Transparente
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Cada herramienta explica el método utilizado
            y muestra las limitaciones del resultado.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-2xl">📱</span>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Preparado para obra
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Diseño responsive para consultar las
            herramientas desde móvil, tablet u ordenador.
          </p>
        </article>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          ¿Cómo funcionan las calculadoras?
        </h2>

        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
          <p>
            Cada calculadora está diseñada alrededor de
            una necesidad técnica concreta. Introduces los
            datos disponibles, la herramienta aplica su
            motor de cálculo y presenta los resultados con
            sus unidades correspondientes.
          </p>

          <p>
            Cuando el cálculo depende de condiciones que no
            pueden determinarse únicamente con los datos
            introducidos, la herramienta lo indica mediante
            una advertencia técnica.
          </p>
        </div>
      </section>

      <TechnicalDisclaimer />

      <CalculatorFAQ items={faqItems} />

      <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          ElectroSpainPro
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Calcula lo que necesitas. Encuentra después el producto.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Después de realizar tus cálculos puedes consultar
          productos, fabricantes, comparativas y ofertas
          técnicas en ElectroSpainPro.
        </p>

        <Link
          href="/productos"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
        >
          Explorar productos
        </Link>
      </section>
    </main>
  );
}

function TechnicalDisclaimer() {
  return (
    <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6">
      <div className="flex gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-base">
          ⚠️
        </div>

        <div>
          <h2 className="text-sm font-bold text-amber-950">
            Aviso técnico
          </h2>

          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            Resultado orientativo. La selección definitiva
            debe comprobarse según las condiciones reales de
            instalación y la normativa aplicable.
          </p>
        </div>
      </div>
    </section>
  );
}