import Link from "next/link";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { guides } from "@/data/guides";

export default function LatestGuides() {
  const latestGuides = guides.slice(0, 3);

  return (
    <Section title="Últimas guías técnicas">
      <div className="grid gap-6 md:grid-cols-3">
        {latestGuides.map((guide) => (
          <Card
            key={guide.id}
            className="p-6"
          >
            <p className="text-sm font-semibold text-blue-600">
              Guía
            </p>

            <h3 className="mt-3 text-xl font-bold">
              {guide.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {guide.summary}
            </p>

            <Link
              href={`/guias/${guide.slug}`}
              className="mt-6 block"
            >
              <Button className="w-full">
                Leer guía
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}