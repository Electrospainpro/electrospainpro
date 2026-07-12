import { notFound } from "next/navigation";

import ComparisonHeader from "@/components/comparison/ComparisonHeader";
import ComparisonProducts from "@/components/comparison/ComparisonProducts";
import ComparisonCriteria from "@/components/comparison/ComparisonCriteria";
import ComparisonVerdict from "@/components/comparison/ComparisonVerdict";

import { getComparisonBySlug } from "@/lib/comparisons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ComparisonPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <ComparisonHeader
        title={comparison.title}
        summary={comparison.summary}
      />

      <ComparisonProducts
        products={comparison.products}
      />

      <ComparisonCriteria
        criteria={comparison.criteria}
      />

      {comparison.winner && (
        <ComparisonVerdict
          winner={comparison.winner}
        />
      )}

    </main>
  );
}