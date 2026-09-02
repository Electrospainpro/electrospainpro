import type { ProductOffer } from "@/types/offer";

interface ProductOffersProps {
  offers: ProductOffer[];
  showHeader?: boolean;
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

function formatCurrency(
  value?: number,
  currency = "EUR",
): string {
  if (value === undefined) {
    return "Precio pendiente";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(value);
}

function getTaxLabel(
  offer: ProductOffer,
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
  offer: ProductOffer,
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
 * Calcula una referencia con impuestos cuando:
 *
 * - existe precio
 * - el precio está publicado sin impuestos
 * - existe tipo impositivo
 * - no hay un coste de envío adicional que pueda
 *   tener un tratamiento fiscal independiente
 *
 * No se utiliza para comparar ofertas.
 */
function getTaxIncludedReference(
  offer: ProductOffer,
): number | undefined {
  if (
    offer.price === undefined ||
    offer.priceTaxStatus !== "excluded" ||
    offer.taxRate === undefined
  ) {
    return undefined;
  }

  if (
    offer.shippingCost !== undefined &&
    offer.shippingCost !== 0
  ) {
    return undefined;
  }

  return Number(
    (
      offer.price *
      (1 + offer.taxRate / 100)
    ).toFixed(2),
  );
}

function getComparablePrice(
  offer: ProductOffer,
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
  offer: ProductOffer,
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
  offer: ProductOffer,
): string {
  if (offer.affiliateUrl) {
    return "Oferta afiliada";
  }

  return "Oferta comercial";
}

export default function ProductOffers({
  offers,
  showHeader = true,
}: ProductOffersProps) {
  const visibleOffers = offers.filter(
    (offer) =>
      offer.status !== "inactive",
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
          item,
        ): item is {
          offer: ProductOffer;
          comparablePrice: number;
        } =>
          item.comparablePrice !==
          undefined,
      )
      .sort(
        (a, b) =>
          a.comparablePrice -
          b.comparablePrice,
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
      {/* ======================================================
          CABECERA
      ====================================================== */}

      {showHeader && (
        <div className="mb-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Comparador de ofertas
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Dónde comprar
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Comparamos las ofertas disponibles
            en diferentes tiendas y
            marketplaces para ayudarte a
            encontrar la mejor opción.
          </p>
        </div>
      )}

      {/* ======================================================
          SIN OFERTAS
      ====================================================== */}

      {visibleOffers.length === 0 ? (
        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_4px_18px_rgba(15,23,42,0.035)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 8h12l1 12H5L6 8Z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-950">
                Estamos recopilando ofertas
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Todavía no disponemos de
                ofertas comerciales verificadas
                para este producto. Estamos
                incorporando progresivamente
                tiendas y marketplaces al
                comparador.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleOffers.map((offer) => {
            const comparablePrice =
              getComparablePrice(
                offer,
              );

            const taxIncludedReference =
              getTaxIncludedReference(
                offer,
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
              clickUrl.trim().length > 0;

            const currency =
              offer.currency;

            return (
              <article
                key={offer.id}
                className={`overflow-hidden rounded-[20px] border bg-white transition ${
                  isBest
                    ? "border-blue-500 shadow-[0_6px_25px_rgba(37,99,235,0.10)]"
                    : "border-slate-200 shadow-[0_3px_14px_rgba(15,23,42,0.035)] hover:border-slate-300 hover:shadow-[0_6px_22px_rgba(15,23,42,0.06)]"
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                    {/* ==================================================
                        INFORMACIÓN TIENDA
                    ================================================== */}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
                          {
                            merchantNames[
                              offer.merchant
                            ]
                          }
                        </h3>

                        {isBest && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white">
                            <span aria-hidden="true">
                              🏆
                            </span>
                            Mejor precio
                          </span>
                        )}

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            offer.affiliateUrl
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {getOfferTypeLabel(
                            offer,
                          )}
                        </span>
                      </div>

                      {/* ESTADO */}

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span
                          className={
                            offer.inStock ===
                            false
                              ? "text-red-600"
                              : "font-medium text-emerald-700"
                          }
                        >
                          {offer.inStock ===
                          false
                            ? "✕ Sin stock"
                            : "✓ En stock"}
                        </span>

                        <span className="text-slate-500">
                          {
                            getOfferStatusLabel(
                              offer,
                            )
                          }
                        </span>
                      </div>

                      {/* ENVÍO */}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                        {offer.shippingCost !==
                          undefined && (
                          <span>
                            Envío:{" "}
                            <strong className="font-semibold text-slate-700">
                              {offer.shippingCost ===
                              0
                                ? "Gratis"
                                : formatCurrency(
                                    offer.shippingCost,
                                    currency,
                                  )}
                            </strong>
                          </span>
                        )}

                        {offer.delivery && (
                          <span>
                            Entrega:{" "}
                            <strong className="font-semibold text-slate-700">
                              {
                                offer.delivery
                              }
                            </strong>
                          </span>
                        )}
                      </div>

                      {/* REFERENCIAS */}

                      {(offer.sku ||
                        offer.mpn ||
                        offer.ean) && (
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                          {offer.sku && (
                            <span>
                              Ref.{" "}
                              {offer.sku}
                            </span>
                          )}

                          {offer.mpn && (
                            <span>
                              MPN{" "}
                              {offer.mpn}
                            </span>
                          )}

                          {offer.ean && (
                            <span>
                              EAN{" "}
                              {offer.ean}
                            </span>
                          )}
                        </div>
                      )}

                      {/* COMPROBACIÓN */}

                      {offer.checkedAt && (
                        <p className="mt-3 text-[11px] text-slate-400">
                          Comprobado:{" "}
                          {offer.checkedAt}
                        </p>
                      )}
                    </div>

                    {/* ==================================================
                        PRECIO + CTA
                    ================================================== */}

                    <div className="border-t border-slate-100 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                      <div className="lg:text-right">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Precio publicado
                        </p>

                        <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                          {formatCurrency(
                            offer.price,
                            currency,
                          )}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          {
                            getTaxLabel(
                              offer,
                            )
                          }
                        </p>

                        {taxIncludedReference !==
                          undefined &&
                          offer.taxRate !==
                            undefined && (
                            <p className="mt-1 text-xs text-slate-500">
                              Referencia con{" "}
                              {offer.taxRate}%:{" "}
                              <strong className="font-semibold text-slate-700">
                                {formatCurrency(
                                  taxIncludedReference,
                                  currency,
                                )}
                              </strong>
                            </p>
                          )}

                        {comparablePrice !==
                        undefined ? (
                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            Precio comparable:{" "}
                            {formatCurrency(
                              comparablePrice,
                              currency,
                            )}
                          </p>
                        ) : (
                          offer.price !==
                            undefined && (
                            <p className="mt-1 text-xs text-amber-600">
                              No comparable
                              directamente
                            </p>
                          )
                        )}

                        {canVisit && (
                          <a
                            href={clickUrl}
                            target="_blank"
                            rel="nofollow sponsored noopener"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_5px_15px_rgba(37,99,235,0.20)] transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:w-auto"
                          >
                            Ver oferta

                            <span
                              aria-hidden="true"
                              className="text-base"
                            >
                              →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ======================================================
          AVISO
      ====================================================== */}

      {showHeader && (
        <div className="mt-4 flex flex-col gap-1 text-[11px] leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Los precios y la disponibilidad
            pueden cambiar.
          </p>

          <p>
            ElectroSpainPro muestra los datos
            disponibles en la última
            comprobación registrada.
          </p>
        </div>
      )}
    </section>
  );
}