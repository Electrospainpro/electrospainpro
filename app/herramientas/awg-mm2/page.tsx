import PageHeader from "@/components/common/PageHeader";

export default function AwgMm2Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title="Conversor AWG ↔ mm²"
        description="Convierte calibres AWG a sección equivalente en milímetros cuadrados."
      />

      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Próximamente
          </h2>

          <p className="mt-4 text-gray-600">
            Estamos preparando un conversor rápido entre calibres AWG y
            secciones de conductor en mm² para facilitar la selección de
            cableado.
          </p>
        </div>
      </section>
    </main>
  );
}