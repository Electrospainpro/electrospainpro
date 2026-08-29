import type { Product } from "@/types/product";
import type { ProductOffer } from "@/types/offer";

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

  const comparisonProducts =
    products.slice(0, 2);

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
          Mostramos únicamente las ofertas
          disponibles en nuestro catálogo
          comercial y verificamos su estado
          antes de mostrarlas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {comparisonProducts.map(
          (product) => {
            const offers: ProductOffer[] =
              getOffersByProduct(
                product.catalogId
              );

            return (
              <div
                key={product.catalogId}
                className="rounded-2xl border bg-white p-2 shadow-sm"
              >
                <ProductOffers
                  offers={offers}
                />
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}