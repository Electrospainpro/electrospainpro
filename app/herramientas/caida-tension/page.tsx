import PageHeader from "@/components/common/PageHeader";

export default function CaidaTensionPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title="Calculadora de caída de tensión"
        description="Calcula de forma orientativa la caída de tensión en una instalación eléctrica."
      />

      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Próximamente
          </h2>

          <p className="mt-4 text-gray-600">
            Estamos desarrollando una calculadora técnica que permitirá
            introducir longitud, sección, intensidad, tensión y tipo de
            instalación para obtener la caída de tensión y su porcentaje.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Los resultados serán orientativos y deberán verificarse conforme
            al diseño y normativa aplicable a cada instalación.
          </p>
        </div>
      </section>
    </main>
  );
}