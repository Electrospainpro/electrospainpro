import type { Product } from "@/types/product";

import ProductOffers from "@/components/product/ProductOffers";

import { getOffersByProduct } from "@/lib/offers";

interface ComparisonCTAProps {
  products: Product[];
}

export default function ComparisonCTA({
  products,
}: ComparisonCTAProps) {
  if (products.length < 2) {
    return null;
  }

  const comparisonProducts = products.slice(0, 2);

  const productsWithOffers =
    comparisonProducts.map((product) => ({
      product,
      offers: getOffersByProduct(
        product.catalogId
      ),
    }));

  const hasVisibleOffers =
    productsWithOffers.some(({ offers }) =>
      offers.some(
        (offer) => offer.status !== "inactive"
      )
    );

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
          Comparamos las ofertas disponibles para
          cada producto y mostramos únicamente los
          datos comerciales registrados en nuestro
          catálogo.
        </p>
      </div>

      {!hasVisibleOffers ? (
        <div className="rounded-2xl border bg-gray-50 p-8">
          <h3 className="text-xl font-bold">
            Ofertas próximamente
          </h3>

          <p className="mt-3 max-w-2xl text-gray-600">
            Todavía no disponemos de ofertas
            comerciales verificadas para los productos
            de esta comparativa. Estamos incorporando
            progresivamente nuevos distribuidores y
            marketplaces.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {productsWithOffers.map(
            ({ product, offers }) => (
              <article
                key={product.catalogId}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="border-b px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {product.catalogId}
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.brand}
                    {product.mpn
                      ? ` · ${product.mpn}`
                      : ""}
                  </p>
                </div>

                <div className="p-2">
                  <ProductOffers
                    offers={offers}
                  />
                </div>
              </article>
            )
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Los precios, disponibilidad y condiciones de
        compra pueden cambiar. ElectroSpainPro muestra
        los datos registrados durante la última
        comprobación disponible.
      </p>
    </section>
  );
}