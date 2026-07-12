import { notFound } from "next/navigation";

import GuideHeader from "@/components/guide/GuideHeader";
import GuideContent from "@/components/guide/GuideContent";
import GuideRelatedProducts from "@/components/guide/GuideRelatedProducts";
import GuideRelatedComparisons from "@/components/guide/GuideRelatedComparisons";

import { getGuideBySlug } from "@/lib/guides";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GuidePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <GuideHeader
        title={guide.title}
        summary={guide.summary}
      />

      <GuideContent
        content={guide.content}
      />

      <GuideRelatedProducts
        products={guide.relatedProducts}
      />

      <GuideRelatedComparisons
        comparisons={guide.relatedComparisons}
      />

    </main>
  );
}