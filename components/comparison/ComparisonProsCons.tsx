import type { Product } from "@/types/product";

interface ComparisonProsConsProps {
  products: Product[];
}

export default function ComparisonProsCons({
  products,
}: ComparisonProsConsProps) {
  if (products.length < 2) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Análisis de producto
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Pros y contras
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Resumen de los puntos positivos y aspectos pendientes
          identificados actualmente en las fichas de producto.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {products.slice(0, 2).map((product) => (
          <article
            key={product.catalogId}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <header>
              <p className="text-sm font-semibold text-gray-500">
                {product.brand}
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                MPN: {product.mpn}
              </p>
            </header>

            <div className="mt-8">
              <h4 className="text-lg font-bold">
                Ventajas
              </h4>

              {product.pros &&
              product.pros.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {product.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex gap-3 text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-green-600"
                      >
                        ✓
                      </span>

                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-gray-500">
                  No hay ventajas registradas.
                </p>
              )}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold">
                Aspectos pendientes
              </h4>

              {product.cons &&
              product.cons.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {product.cons.map((con) => (
                    <li
                      key={con}
                      className="flex gap-3 text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="font-bold text-amber-600"
                      >
                        !
                      </span>

                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-gray-500">
                  No hay aspectos pendientes registrados.
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}