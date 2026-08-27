import Link from "next/link";

import type { ProductOffer } from "@/types/offer";

interface ProductOffersProps {
  offers: ProductOffer[];
}

const merchantNames: Record<ProductOffer["merchant"], string> = {
  amazon: "Amazon",
  pccomponentes: "PcComponentes",
  manomano: "ManoMano",
  leroymerlin: "Leroy Merlin",
  rs: "RS",
  farnell: "Farnell",
};

function formatPrice(price?: number) {
  if (price === undefined) {
    return "Precio pendiente";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function formatTotalPrice(offer: ProductOffer) {
  if (offer.price === undefined) {
    return "Precio pendiente";
  }

  const total =
    offer.price + (offer.shippingCost ?? 0);

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(total);
}

function getOfferLabel(offer: ProductOffer) {
  if (offer.status === "verified") {
    return offer.inStock === false
      ? "No disponible"
      : "Oferta verificada";
  }

  if (offer.status === "pending") {
    return "Pendiente de verificación";
  }

  return "Oferta no disponible";
}

export default function ProductOffers({
  offers,
}: ProductOffersProps) {
  const validOffers = offers.filter(
    (offer) => offer.status !== "inactive"
  );

  const pricedOffers = validOffers.filter(
    (offer) => offer.price !== undefined
  );

  const bestOffer =
    pricedOffers.length > 0
      ? [...pricedOffers].sort((a, b) => {
          const totalA =
            (a.price ?? 0) +
            (a.shippingCost ?? 0);

          const totalB =
            (b.price ?? 0) +
            (b.shippingCost ?? 0);

          return totalA - totalB;
        })[0]
      : undefined;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Dónde comprar
        </h2>

        <p className="mt-2 max-w-3xl text-gray-600">
          Comparamos las ofertas disponibles en
          diferentes tiendas y marketplaces.
        </p>
      </div>

      {validOffers.length === 0 ? (
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="text-lg font-semibold">
            Estamos recopilando ofertas
          </h3>

          <p className="mt-2 text-gray-600">
            Todavía no disponemos de ofertas comerciales
            verificadas para este producto. Estamos
            incorporando progresivamente tiendas y
            marketplaces al comparador.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {validOffers.map((offer) => {
            const isBest =
              bestOffer?.id === offer.id;

            const clickUrl =
              offer.affiliateUrl ??
              offer.productUrl;

            const hasValidUrl =
              clickUrl.trim().length > 0;

            return (
              <div
                key={offer.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${
                  isBest
                    ? "border-blue-600"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">
                        {merchantNames[offer.merchant]}
                      </h3>

                      {isBest && (
                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          Mejor oferta
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {getOfferLabel(offer)}
                    </p>

                    {offer.delivery && (
                      <p className="mt-2 text-sm text-gray-600">
                        Entrega: {offer.delivery}
                      </p>
                    )}

                    {offer.shippingCost !== undefined && (
                      <p className="mt-1 text-sm text-gray-600">
                        Envío:{" "}
                        {formatPrice(
                          offer.shippingCost
                        )}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-sm text-gray-500">
                      Precio total
                    </span>

                    <span className="text-2xl font-bold">
                      {formatTotalPrice(offer)}
                    </span>

                    {hasValidUrl &&
                      offer.status === "verified" && (
                        <Link
                          href={clickUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="mt-3 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:opacity-80"
                        >
                          Ver oferta
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}