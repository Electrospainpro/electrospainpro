import type { ProductOffer } from "@/types/offer";

interface ProductOffersProps {
  offers: ProductOffer[];
  showHeader?: boolean;
}

const merchantNames: Record<
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

function formatCurrency(value?: number): string {
  if (value === undefined) {
    return "Precio pendiente";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function getTaxLabel(
  offer: ProductOffer
): string {
  if (offer.priceTaxStatus === "included") {
    return "Impuestos incluidos";
  }

  if (offer.priceTaxStatus === "excluded") {
    if (offer.taxRate !== undefined) {
      return `Impuestos no incluidos · ${offer.taxRate}%`;
    }

    return "Impuestos no incluidos";
  }

  return "Impuestos no especificados";
}

function getOfferTotal(
  offer: ProductOffer
): number | undefined {
  if (offer.price === undefined) {
    return undefined;
  }

  return (
    offer.price +
    (offer.shippingCost ?? 0)
  );
}

/**
 * Precio utilizado para comparar ofertas.
 *
 * Solo se considera comparable cuando:
 *
 * - la oferta está verificada
 * - existe precio
 * - el precio tiene impuestos incluidos
 *
 * Los gastos de envío conocidos se suman al precio.
 */
function getComparablePrice(
  offer: ProductOffer
): number | undefined {
  if (
    offer.status !== "verified" ||
    offer.price === undefined ||
    offer.priceTaxStatus !== "included"
  ) {
    return undefined;
  }

  return getOfferTotal(offer);
}

function getOfferStatusLabel(
  offer: ProductOffer
): string {
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

function getOfferTypeLabel(
  offer: ProductOffer
): string {
  if (offer.affiliateUrl) {
    return "Oferta afiliada";
  }

  return "Oferta comercial";
}

function getOfferTypeClass(
  offer: ProductOffer
): string {
  if (offer.affiliateUrl) {
    return "bg-green-100 text-green-700";
  }

  return "bg-gray-100 text-gray-700";
}

export default function ProductOffers({
  offers,
  showHeader = true,
}: ProductOffersProps) {
  const visibleOffers = offers.filter(
    (offer) =>
      offer.status !== "inactive"
  );

  const comparableOffers =
    visibleOffers
      .map((offer) => ({
        offer,
        comparablePrice:
          getComparablePrice(offer),
      }))
      .filter(
        (
          item
        ): item is {
          offer: ProductOffer;
          comparablePrice: number;
        } =>
          item.comparablePrice !==
          undefined
      )
      .sort(
        (a, b) =>
          a.comparablePrice -
          b.comparablePrice
      );

  const bestComparableOffer =
    comparableOffers[0]?.offer;

  return (
    <section
      className={
        showHeader
          ? "mt-12"
          : ""
      }
    >
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Dónde comprar
          </h2>

          <p className="mt-2 max-w-3xl text-gray-600">
            Comparamos las ofertas disponibles
            en diferentes tiendas y
            marketplaces.
          </p>
        </div>
      )}

      {visibleOffers.length === 0 ? (
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="text-lg font-semibold">
            Estamos recopilando ofertas
          </h3>

          <p className="mt-2 text-gray-600">
            Todavía no disponemos de ofertas
            comerciales verificadas para este
            producto. Estamos incorporando
            progresivamente tiendas y
            marketplaces al comparador.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleOffers.map(
            (offer) => {
              const total =
                getOfferTotal(offer);

              const comparablePrice =
                getComparablePrice(
                  offer
                );

              const isBest =
                bestComparableOffer?.id ===
                offer.id;

              const clickUrl =
                offer.affiliateUrl ??
                offer.productUrl;

              const canVisit =
                offer.status ===
                  "verified" &&
                clickUrl.trim().length >
                  0;

              return (
                <article
                  key={offer.id}
                  className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                    isBest
                      ? "border-blue-600 ring-1 ring-blue-600"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold">
                          {
                            merchantNames[
                              offer.merchant
                            ]
                          }
                        </h3>

                        {isBest && (
                          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            🏆 Mejor precio
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getOfferTypeClass(
                            offer
                          )}`}
                        >
                          {getOfferTypeLabel(
                            offer
                          )}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {getOfferStatusLabel(
                          offer
                        )}
                      </p>

                      {offer.sku && (
                        <p className="mt-2 text-sm text-gray-600">
                          Referencia tienda:{" "}
                          <span className="font-medium">
                            {offer.sku}
                          </span>
                        </p>
                      )}

                      {offer.mpn && (
                        <p className="mt-1 text-sm text-gray-600">
                          MPN:{" "}
                          <span className="font-medium">
                            {offer.mpn}
                          </span>
                        </p>
                      )}

                      {offer.ean && (
                        <p className="mt-1 text-sm text-gray-600">
                          EAN:{" "}
                          <span className="font-medium">
                            {offer.ean}
                          </span>
                        </p>
                      )}

                      {offer.delivery && (
                        <p className="mt-1 text-sm text-gray-600">
                          Entrega:{" "}
                          {offer.delivery}
                        </p>
                      )}

                      {offer.inStock !==
                        undefined && (
                        <p className="mt-1 text-sm text-gray-600">
                          {offer.inStock
                            ? "✓ En stock"
                            : "Sin stock"}
                        </p>
                      )}

                      {offer.shippingCost !==
                        undefined && (
                        <p className="mt-1 text-sm text-gray-600">
                          Envío:{" "}
                          {formatCurrency(
                            offer.shippingCost
                          )}
                        </p>
                      )}

                      {offer.checkedAt && (
                        <p className="mt-2 text-xs text-gray-400">
                          Comprobado:{" "}
                          {offer.checkedAt}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-col items-start md:items-end">
                      <span className="text-sm text-gray-500">
                        Precio publicado
                      </span>

                      <span className="text-2xl font-bold">
                        {formatCurrency(
                          offer.price
                        )}
                      </span>

                      <span className="mt-1 text-xs text-gray-500">
                        {getTaxLabel(
                          offer
                        )}
                      </span>

                      {offer.shippingCost !==
                        undefined &&
                        total !==
                          undefined && (
                          <span className="mt-1 text-xs text-gray-500">
                            Total:{" "}
                            {formatCurrency(
                              total
                            )}
                          </span>
                        )}

                      {comparablePrice !==
                        undefined ? (
                        <span className="mt-1 text-xs font-medium text-gray-700">
                          Precio comparable:{" "}
                          {formatCurrency(
                            comparablePrice
                          )}
                        </span>
                      ) : (
                        offer.price !==
                          undefined && (
                          <span className="mt-1 max-w-xs text-right text-xs text-amber-600">
                            No comparable directamente
                          </span>
                        )
                      )}

                      {canVisit && (
                        <a
                          href={clickUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="mt-4 inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:opacity-80"
                        >
                          Ver oferta
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      {showHeader && (
        <p className="mt-4 text-xs text-gray-400">
          Los precios y la disponibilidad pueden
          cambiar. ElectroSpainPro muestra los
          datos disponibles en la última
          comprobación registrada.
        </p>
      )}
    </section>
  );
}