import { notFound } from "next/navigation";

import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImage from "@/components/product/ProductImage";
import ProductHeader from "@/components/product/ProductHeader";
import ProductESPScore from "@/components/product/ProductESPScore";
import ProductAffiliateButtons from "@/components/product/ProductAffiliateButtons";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductProsCons from "@/components/product/ProductProsCons";
import ProductRelated from "@/components/product/ProductRelated";
import ProductCTA from "@/components/product/ProductCTA";

import { getProductBySlug } from "@/lib/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const affiliateLinks = [];

  if (product.affiliateLinks.amazon) {
    affiliateLinks.push({
      store: "Amazon",
      url: product.affiliateLinks.amazon,
    });
  }

  if (product.affiliateLinks.manomano) {
    affiliateLinks.push({
      store: "ManoMano",
      url: product.affiliateLinks.manomano,
    });
  }

  if (product.affiliateLinks.rs) {
    affiliateLinks.push({
      store: "RS",
      url: product.affiliateLinks.rs,
    });
  }

  if (product.affiliateLinks.farnell) {
    affiliateLinks.push({
      store: "Farnell",
      url: product.affiliateLinks.farnell,
    });
  }

  if (product.affiliateLinks.leroymerlin) {
    affiliateLinks.push({
      store: "Leroy Merlin",
      url: product.affiliateLinks.leroymerlin,
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <ProductBreadcrumb
        category={product.category}
        subcategory={product.subcategory}
        product={product.name}
      />

      <ProductImage
        image={product.image}
        name={product.name}
      />

      <ProductHeader
        name={product.name}
        brand={product.brand}
        rating={product.rating}
        shortDescription={product.shortDescription}
      />

      {product.espScore && (
        <ProductESPScore
          score={product.espScore.overall}
        />
      )}

      <ProductAffiliateButtons
        affiliateLinks={affiliateLinks}
      />

      <ProductSpecifications
        specifications={product.specifications}
      />

      <ProductProsCons
        pros={product.pros}
        cons={product.cons}
      />

      <ProductRelated
        products={[
          "Schneider Acti9 C20",
          "ABB S201 C16",
          "Legrand DX³ C16",
        ]}
      />

      <ProductCTA
        title={product.name}
      />
    </main>
  );
}