import GuideCard from "@/components/guide/GuideCard";

import { getAllGuides } from "@/lib/guides";

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header>
        <h1 className="text-4xl font-bold">
          Guías Técnicas
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          Aprende con nuestras guías profesionales sobre electricidad,
          telecomunicaciones, energía solar, instrumentación y herramientas.
        </p>
      </header>

      {guides.length === 0 ? (
        <div className="mt-12 rounded-2xl border bg-gray-50 p-8">
          <h2 className="text-2xl font-semibold">
            Todavía no hay guías publicadas.
          </h2>
        </div>
      ) : (
        <section className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
            />
          ))}
        </section>
      )}
    </main>
  );
}