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
import ProductOffers from "@/components/product/ProductOffers";

import { getProductBySlug } from "@/lib/products";
import {
  getOffersByProduct,
  getBestComparableOffer,
  getBestAffiliateOffer,
  countVerifiedOffers,
  countAffiliateOffers,
} from "@/lib/offers";

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

  /*
   * =====================================================
   * OFERTAS
   * =====================================================
   *
   * Toda la información comercial se obtiene desde
   * el Data Engine.
   *
   * La página no conoce merchants concretos.
   */

  const productOffers = getOffersByProduct(
    product.catalogId
  );

  const bestComparableOffer =
    getBestComparableOffer(product.catalogId);

  const bestAffiliateOffer =
    getBestAffiliateOffer(product.catalogId);

  const verifiedOfferCount =
    countVerifiedOffers(product.catalogId);

  const affiliateOfferCount =
    countAffiliateOffers(product.catalogId);

  /*
   * =====================================================
   * COMPATIBILIDAD CON EL SISTEMA ANTIGUO
   * =====================================================
   *
   * Lo mantenemos temporalmente para no romper
   * componentes existentes.
   */

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

      {affiliateLinks.length > 0 && (
        <ProductAffiliateButtons
          affiliateLinks={affiliateLinks}
        />
      )}

      <ProductSpecifications
        specifications={product.specifications}
      />

      <ProductProsCons
        pros={product.pros}
        cons={product.cons}
      />

      {/* =================================================
          RESUMEN COMERCIAL
          ================================================= */}

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Ofertas verificadas
          </p>

          <p className="mt-1 text-3xl font-bold">
            {verifiedOfferCount}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            tiendas con información comprobada
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Mejor precio comparable
          </p>

          <p className="mt-1 text-3xl font-bold">
            {bestComparableOffer?.price !== undefined
              ? new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(bestComparableOffer.price)
              : "Pendiente"}
          </p>

          {bestComparableOffer && (
            <p className="mt-1 text-sm text-gray-500">
              {bestComparableOffer.merchant}
            </p>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Ofertas afiliadas
          </p>

          <p className="mt-1 text-3xl font-bold">
            {affiliateOfferCount}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            oportunidades de monetización
          </p>
        </div>
      </section>

      {/* =================================================
          OFERTAS
          ================================================= */}

      <ProductOffers
        offers={productOffers}
      />

      {/* =================================================
          OFERTA AFILIADA DESTACADA
          ================================================= */}

      {bestAffiliateOffer && (
        <section className="mt-8 rounded-2xl border p-6">
          <p className="text-sm font-semibold text-gray-500">
            RECOMENDACIÓN COMERCIAL
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Mejor oferta afiliada
          </h2>

          <p className="mt-2 text-gray-600">
            ElectroSpainPro ha encontrado una oferta
            afiliada disponible para este producto.
          </p>
        </section>
      )}

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