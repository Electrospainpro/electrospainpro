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
  latiendadeelectricidad: "La Tienda de Electricidad",
};

function formatCurrency(value?: number) {
  if (value === undefined) {
    return "Precio pendiente";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function getTaxLabel(offer: ProductOffer) {
  if (offer.priceTaxStatus === "included") {
    return "IVA incluido";
  }

  if (offer.priceTaxStatus === "excluded") {
    if (offer.taxRate !== undefined) {
      return `Impuestos no incluidos · ${offer.taxRate}%`;
    }

    return "Impuestos no incluidos";
  }

  return "Impuestos no especificados";
}

function getOfferTotal(offer: ProductOffer) {
  if (offer.price === undefined) {
    return undefined;
  }

  return offer.price + (offer.shippingCost ?? 0);
}

function getComparablePrice(offer: ProductOffer) {
  const total = getOfferTotal(offer);

  if (total === undefined) {
    return undefined;
  }

  /*
   * Solo comparamos directamente ofertas cuyo precio
   * está confirmado como impuestos incluidos.
   */
  if (offer.priceTaxStatus !== "included") {
    return undefined;
  }

  return total;
}

function getOfferStatusLabel(offer: ProductOffer) {
  if (offer.status === "pending") {
    return "Pendiente de verificación";
  }

  if (offer.status === "inactive") {
    return "No disponible";
  }

  if (offer.inStock === false) {
    return "Sin stock";
  }

  return "Oferta verificada";
}

export default function ProductOffers({
  offers,
}: ProductOffersProps) {
  const visibleOffers = offers.filter(
    (offer) => offer.status !== "inactive"
  );

  const comparableOffers = visibleOffers
    .filter(
      (offer) =>
        getComparablePrice(offer) !== undefined
    )
    .sort(
      (a, b) =>
        (getComparablePrice(a) ?? Infinity) -
        (getComparablePrice(b) ?? Infinity)
    );

  const bestComparableOffer =
    comparableOffers[0];

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

      {visibleOffers.length === 0 ? (
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="text-lg font-semibold">
            Estamos recopilando ofertas
          </h3>

          <p className="mt-2 text-gray-600">
            Todavía no disponemos de ofertas
            comerciales verificadas para este producto.
            Estamos incorporando progresivamente tiendas
            y marketplaces al comparador.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleOffers.map((offer) => {
            const total = getOfferTotal(offer);

            const isBest =
              bestComparableOffer?.id === offer.id;

            const clickUrl =
              offer.affiliateUrl ??
              offer.productUrl;

            const canVisit =
              offer.status === "verified" &&
              clickUrl.trim().length > 0;

            return (
              <article
                key={offer.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${
                  isBest
                    ? "border-blue-600 ring-1 ring-blue-600"
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
                          Mejor precio comparable
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {getOfferStatusLabel(offer)}
                    </p>

                    {offer.sku && (
                      <p className="mt-2 text-sm text-gray-600">
                        Referencia tienda: {offer.sku}
                      </p>
                    )}

                    {offer.delivery && (
                      <p className="mt-1 text-sm text-gray-600">
                        Entrega: {offer.delivery}
                      </p>
                    )}

                    {offer.shippingCost !== undefined && (
                      <p className="mt-1 text-sm text-gray-600">
                        Envío:{" "}
                        {formatCurrency(
                          offer.shippingCost
                        )}
                      </p>
                    )}

                    {offer.checkedAt && (
                      <p className="mt-1 text-xs text-gray-400">
                        Comprobado: {offer.checkedAt}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-sm text-gray-500">
                      Precio publicado
                    </span>

                    <span className="text-2xl font-bold">
                      {formatCurrency(offer.price)}
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      {getTaxLabel(offer)}
                    </span>

                    {offer.shippingCost !== undefined &&
                      total !== undefined && (
                        <span className="mt-1 text-xs text-gray-500">
                          Total antes de impuestos:{" "}
                          {formatCurrency(total)}
                        </span>
                      )}

                    {canVisit && (
                      <a
                        href={clickUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="mt-3 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:opacity-80"
                      >
                        Ver oferta
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Los precios y la disponibilidad pueden cambiar.
        ElectroSpainPro muestra los datos disponibles en
        la última comprobación registrada.
      </p>
    </section>
  );
}