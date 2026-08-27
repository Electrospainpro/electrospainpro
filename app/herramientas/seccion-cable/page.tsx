import PageHeader from "@/components/common/PageHeader";

export default function SeccionCablePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title="Calculadora de sección de cable"
        description="Calcula una sección de conductor orientativa según las características de la instalación."
      />

      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Próximamente
          </h2>

          <p className="mt-4 text-gray-600">
            La herramienta tendrá en cuenta parámetros como intensidad,
            longitud, tensión, material del conductor, tipo de instalación y
            caída de tensión admisible.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            El resultado será orientativo y deberá comprobarse mediante el
            cálculo reglamentario correspondiente.
          </p>
        </div>
      </section>
    </main>
  );
}