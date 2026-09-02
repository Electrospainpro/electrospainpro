import { notFound } from "next/navigation";

import AdSlot from "@/components/ads/AdSlot";

import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImage from "@/components/product/ProductImage";
import ProductHeader from "@/components/product/ProductHeader";
import ProductESPScore from "@/components/product/ProductESPScore";
import ProductOffers from "@/components/product/ProductOffers";
import ProductProsCons from "@/components/product/ProductProsCons";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductRelated from "@/components/product/ProductRelated";
import ProductCTA from "@/components/product/ProductCTA";

import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

import { getOffersByProductId } from "@/lib/offers";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
   * ==========================================================
   * PRODUCTO
   * ==========================================================
   */

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  /*
   * ==========================================================
   * OFERTAS COMERCIALES
   * ==========================================================
   *
   * Las ofertas se obtienen mediante el catalogId del producto.
   *
   * Ejemplo:
   *
   * producto P005
   *       ↓
   * getOffersByProductId("P005")
   *       ↓
   * ofertas asociadas al producto
   *
   * De esta forma la ficha no depende directamente de
   * product.affiliateLinks.
   */

  const productOffers = getOffersByProductId(
    product.catalogId,
  );

  /*
   * ==========================================================
   * RELACIONES EDITORIALES
   * ==========================================================
   */

  const productRelations =
    getRelatedProducts(product.catalogId);

  const variants =
    productRelations.filter(
      (item) =>
        item.relation.type === "variant",
    );

  const related =
    productRelations.filter(
      (item) =>
        item.relation.type === "related",
    );

  const comparisons =
    productRelations.filter(
      (item) =>
        item.relation.type === "comparison",
    );

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      {/* ======================================================
          BREADCRUMB
      ====================================================== */}

      <ProductBreadcrumb
        category={product.category}
        subcategory={product.subcategory}
        product={product.name}
      />

      {/* ======================================================
          CABECERA DEL PRODUCTO
      ====================================================== */}

      <div
        className="mb-8 grid gap-6"
        style={{
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
        }}
      >
        <ProductImage
          image={product.image}
          name={product.name}
        />

        <ProductHeader
          name={product.name}
          brand={product.brand}
          rating={product.rating}
          shortDescription={
            product.shortDescription
          }
        />
      </div>

      {/* ======================================================
          ESP SCORE
      ====================================================== */}

      <ProductESPScore
        score={product.espScore}
        pros={product.pros}
        cons={product.cons}
      />

      {/* ======================================================
          PUBLICIDAD
      ====================================================== */}

      <AdSlot />

      {/* ======================================================
          COMPARADOR DE OFERTAS
      ====================================================== */}

      <ProductOffers
        offers={productOffers}
      />

      {/* ======================================================
          VENTAJAS + INCONVENIENTES
      ====================================================== */}

      <section className="mt-8">
        <ProductProsCons
          pros={product.pros}
          cons={product.cons}
        />
      </section>

      {/* ======================================================
          ESPECIFICACIONES TÉCNICAS
      ====================================================== */}

      <ProductSpecifications
        specifications={
          product.specifications
        }
      />

      {/* ======================================================
          RELACIONES DEL PRODUCTO
      ====================================================== */}

      <ProductRelated
        variants={variants}
        related={related}
        comparisons={comparisons}
      />

      {/* ======================================================
          CTA FINAL
      ====================================================== */}

      <ProductCTA
        title={product.name}
      />

    </main>
  );
}