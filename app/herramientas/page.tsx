import Link from "next/link";

export default function HerramientasPage() {
  const tools = [
    {
      title: "Calculadora de caída de tensión",
      href: "/herramientas/caida-tension",
      description:
        "Calcula la caída de tensión según longitud, sección e intensidad.",
    },
    {
      title: "Calculadora de sección de cable",
      href: "/herramientas/seccion-cable",
      description:
        "Obtén la sección mínima recomendada para una instalación.",
    },
    {
      title: "Conversor AWG ↔ mm²",
      href: "/herramientas/awg-mm2",
      description:
        "Convierte calibres americanos a milímetros cuadrados.",
    },
    {
      title: "Calculadora Fotovoltaica",
      href: "/herramientas/fotovoltaica",
      description:
        "Dimensiona una instalación solar de forma orientativa.",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Herramientas Técnicas
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        Herramientas desarrolladas para profesionales de la electricidad,
        telecomunicaciones y energía solar.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border bg-white p-8 shadow-sm transition hover:border-blue-600 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              {tool.title}
            </h2>

            <p className="mt-4 text-gray-600">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}