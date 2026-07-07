import { notFound } from "next/navigation";

import ProductHeader from "@/components/product/ProductHeader";
import ProductAffiliateButtons from "@/components/product/ProductAffiliateButtons";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductProsCons from "@/components/product/ProductProsCons";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductCTA from "@/components/product/ProductCTA";
import ProductRelated from "@/components/product/ProductRelated";

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

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <ProductBreadcrumb
        category={product.category}
        subcategory={product.subcategory}
        product={product.name}
      />

      <ProductHeader
        name={product.name}
        brand={product.brand}
        rating={product.rating}
        shortDescription={product.shortDescription}
      />

      <ProductAffiliateButtons
        affiliateLinks={[
          ...(product.affiliateLinks.amazon
            ? [{ store: "Amazon", url: product.affiliateLinks.amazon }]
            : []),
          ...(product.affiliateLinks.manomano
            ? [{ store: "ManoMano", url: product.affiliateLinks.manomano }]
            : []),
          ...(product.affiliateLinks.rs
            ? [{ store: "RS", url: product.affiliateLinks.rs }]
            : []),
          ...(product.affiliateLinks.farnell
            ? [{ store: "Farnell", url: product.affiliateLinks.farnell }]
            : []),
        ]}
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
          "Magnetotérmico Schneider C20",
          "Magnetotérmico ABB S201",
          "Magnetotérmico Legrand DX3",
        ]}
      />

      <ProductCTA
        title={product.name}
      />

    </main>
  );
}