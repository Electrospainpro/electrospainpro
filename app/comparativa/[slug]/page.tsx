import { notFound } from "next/navigation";

import ComparisonHeader from "@/components/comparison/ComparisonHeader";
import ComparisonProducts from "@/components/comparison/ComparisonProducts";
import ComparisonSpecifications from "@/components/comparison/ComparisonSpecifications";
import ComparisonSummary from "@/components/comparison/ComparisonSummary";
import ComparisonProsCons from "@/components/comparison/ComparisonProsCons";
import ComparisonCTA from "@/components/comparison/ComparisonCTA";
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

  const comparison =
    getComparisonBySlug(slug);

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

      <ComparisonSpecifications
        products={comparison.products}
      />

      <ComparisonSummary
        products={comparison.products}
      />

      <ComparisonProsCons
        products={comparison.products}
      />

      <ComparisonCTA
        products={comparison.products}
      />

      {comparison.criteria.length > 0 && (
        <ComparisonCriteria
          criteria={comparison.criteria}
        />
      )}

      {comparison.verdict &&
        comparison.winner && (
          <ComparisonVerdict
            winner={comparison.winner}
          />
        )}
    </main>
  );
}