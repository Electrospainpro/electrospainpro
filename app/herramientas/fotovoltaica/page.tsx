import PageHeader from "@/components/common/PageHeader";

export default function FotovoltaicaToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title="Herramientas Fotovoltaicas"
        description="Calculadoras y herramientas para el diseño orientativo de instalaciones fotovoltaicas."
      />

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Dimensionamiento fotovoltaico
          </h2>

          <p className="mt-4 text-gray-600">
            Herramienta para estimar potencia fotovoltaica, producción y
            necesidades básicas de una instalación.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Próximamente
          </h2>

          <p className="mt-4 text-gray-600">
            Añadiremos nuevas herramientas para paneles, inversores,
            baterías y configuraciones fotovoltaicas.
          </p>
        </div>
      </section>
    </main>
  );
}