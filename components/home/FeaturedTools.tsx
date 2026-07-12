import Link from "next/link";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const tools = [
  {
    title: "Caída de tensión",
    href: "/herramientas/caida-tension",
  },
  {
    title: "Sección de cable",
    href: "/herramientas/seccion-cable",
  },
  {
    title: "Conversor AWG ↔ mm²",
    href: "/herramientas/awg-mm2",
  },
  {
    title: "Calculadora Fotovoltaica",
    href: "/herramientas/fotovoltaica",
  },
];

export default function FeaturedTools() {
  return (
    <Section title="Herramientas profesionales">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
          >
            <Card className="p-6 transition hover:border-blue-600 hover:shadow-lg">
              <h3 className="text-lg font-semibold">
                {tool.title}
              </h3>

              <p className="mt-3 text-gray-600">
                Próximamente disponible.
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}