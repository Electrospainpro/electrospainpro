import Link from "next/link";

import { Comparison } from "@/types/comparison";

interface GuideRelatedComparisonsProps {
  comparisons: Comparison[];
}

export default function GuideRelatedComparisons({
  comparisons,
}: GuideRelatedComparisonsProps) {
  return (
    <section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Comparativas relacionadas
      </h2>

      <div className="space-y-4">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.id}
            href={`/comparativa/${comparison.slug}`}
            className="block rounded-lg border p-4 transition hover:border-blue-600 hover:bg-gray-50"
          >
            <h3 className="font-semibold">
              {comparison.title}
            </h3>

            <p className="text-sm text-gray-500">
              {comparison.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}