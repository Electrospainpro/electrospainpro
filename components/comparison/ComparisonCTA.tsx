import Link from "next/link";

import type { Product } from "@/types/product";
import type { ProductOffer } from "@/types/offer";

import {
  getVerifiedOffersByProduct,
} from "@/lib/offers";

interface ComparisonCTAProps {
  products: Product[];
}

function formatPrice(
  offer: ProductOffer
): string | null {
  if (offer.price === undefined) {
    return null;
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: offer.currency,
  }).format(offer.price);
}

function getMerchantName(
  merchant: ProductOffer["merchant"]
): string {
  const names: Record<
    ProductOffer["merchant"],
    string
  > = {
    amazon: "Amazon",
    pccomponentes: "PcComponentes",
    manomano: "ManoMano",
    leroymerlin: "Leroy Merlin",
    rs: "RS",
    farnell: "Farnell",
    latiendadeelectricidad:
      "La Tienda de Electricidad",
  };

  return names[merchant];
}

function OfferCard({
  offer,
}: {
  offer: ProductOffer;
}) {
  const price = formatPrice(offer);

  return (
    <article className="rounded-xl border bg-gray-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {getMerchantName(offer.merchant)}
          </p>

          {price && (
            <p className="mt-1 text-2xl font-bold">
              {price}
            </p>
          )}

          {offer.priceTaxStatus ===
            "included" && (
            <p className="mt-1 text-xs text-gray-500">
              Impuestos incluidos
            </p>
          )}

          {offer.priceTaxStatus ===
            "excluded" && (
            <p className="mt-1 text-xs text-gray-500">
              Impuestos no incluidos
            </p>
          )}

          {offer.inStock !== undefined && (
            <p className="mt-2 text-sm">
              {offer.inStock
                ? "En stock"
                : "Sin stock indicado"}
            </p>
          )}

          {offer.delivery && (
            <p className="mt-1 text-sm text-gray-600">
              {offer.delivery}
            </p>
          )}
        </div>

        <Link
          href={
            offer.affiliateUrl ??
            offer.productUrl
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-80"
        >
          Ver oferta
        </Link>
      </div>
    </article>
  );
}

function ProductOffers({
  product,
}: {
  product: Product;
}) {
  const offers =
    getVerifiedOffersByProduct(
      product.catalogId
    );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-1 text-xl font-bold">
          {product.name}
        </h3>
      </div>

      {offers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed p-5">
          <p className="font-semibold">
            No hay ofertas verificadas disponibles
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Actualmente no disponemos de una oferta
            comercial verificada para este producto.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComparisonCTA({
  products,
}: ComparisonCTAProps) {
  if (products.length < 2) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Compra
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Ofertas disponibles
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Mostramos únicamente ofertas verificadas
          disponibles en nuestro catálogo comercial.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {products.slice(0, 2).map((product) => (
          <ProductOffers
            key={product.catalogId}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}