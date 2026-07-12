import Link from "next/link";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { comparisons } from "@/data/comparisons";

export default function LatestComparisons() {
  const latestComparisons = comparisons.slice(0, 3);

  return (
    <Section title="Últimas comparativas">
      <div className="grid gap-6 md:grid-cols-3">
        {latestComparisons.map((comparison) => (
          <Card
            key={comparison.id}
            className="p-6"
          >
            <p className="text-sm font-semibold text-blue-600">
              Comparativa
            </p>

            <h3 className="mt-3 text-xl font-bold">
              {comparison.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {comparison.summary}
            </p>

            <Link
              href={`/comparativa/${comparison.slug}`}
              className="mt-6 block"
            >
              <Button className="w-full">
                Ver comparativa
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}