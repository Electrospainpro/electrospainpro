import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ComparisonHeader from "@/components/comparison/ComparisonHeader";
import ComparisonProducts from "@/components/comparison/ComparisonProducts";
import ComparisonSpecifications from "@/components/comparison/ComparisonSpecifications";
import ComparisonSummary from "@/components/comparison/ComparisonSummary";
import ComparisonProsCons from "@/components/comparison/ComparisonProsCons";
import ComparisonCTA from "@/components/comparison/ComparisonCTA";
import ComparisonCriteria from "@/components/comparison/ComparisonCriteria";
import ComparisonVerdict from "@/components/comparison/ComparisonVerdict";
import ComparisonFAQ from "@/components/comparison/ComparisonFAQ";

import { getComparisonBySlug } from "@/lib/comparisons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Genera los metadatos SEO de cada comparativa.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return {
      title: "Comparativa no encontrada | ElectroSpainPro",
      description:
        "La comparativa solicitada no existe en ElectroSpainPro.",
    };
  }

  const title =
    comparison.seo?.metaTitle ??
    `${comparison.title} | ElectroSpainPro`;

  const description =
    comparison.seo?.metaDescription ??
    comparison.summary;

  return {
    title,
    description,
    keywords: comparison.seo?.keywords,

    alternates: {
      canonical: `/comparativa/${comparison.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: `/comparativa/${comparison.slug}`,
      publishedTime: comparison.publishedAt,
      siteName: "ElectroSpainPro",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Genera los datos estructurados JSON-LD.
 *
 * Se utiliza un único @graph para evitar conflictos
 * de tipos y mantener todos los datos estructurados
 * dentro de un único script.
 */
function ComparisonStructuredData({
  comparison,
}: {
  comparison: NonNullable<
    ReturnType<typeof getComparisonBySlug>
  >;
}) {
  const productSchemas = comparison.products.map(
    (product) => ({
      "@type": "Product",
      name: product.name,

      brand: {
        "@type": "Brand",
        name: product.brand,
      },

      model: product.mpn,

      sku: product.catalogId,

      description: product.shortDescription,

      url: `/productos/${product.slug}`,
    })
  );

  const faqSchema =
    comparison.faq &&
    comparison.faq.length > 0
      ? {
          "@type": "FAQPage",

          mainEntity: comparison.faq.map(
            (item) => ({
              "@type": "Question",

              name: item.question,

              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })
          ),
        }
      : null;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",

      headline: comparison.title,

      description:
        comparison.seo?.metaDescription ??
        comparison.summary,

      datePublished:
        comparison.publishedAt,

      author: {
        "@type": "Organization",
        name: "ElectroSpainPro",
      },

      publisher: {
        "@type": "Organization",
        name: "ElectroSpainPro",
      },

      mainEntity: {
        "@type": "ItemList",

        itemListElement:
          comparison.products.map(
            (product, index) => ({
              "@type": "ListItem",

              position: index + 1,

              item: {
                "@type": "Product",

                name: product.name,

                brand: {
                  "@type": "Brand",
                  name: product.brand,
                },

                model: product.mpn,

                sku: product.catalogId,

                url:
                  `/productos/${product.slug}`,
              },
            })
          ),
      },
    },

    ...productSchemas,
  ];

  if (faqSchema) {
    graph.push(faqSchema);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            structuredData
          ),
      }}
    />
  );
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
    <>
      <ComparisonStructuredData
        comparison={comparison}
      />

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

        <ComparisonFAQ
          faq={comparison.faq}
        />
      </main>
    </>
  );
}