import Link from "next/link";

import { Product } from "@/types/product";

interface ComparisonProductsProps {
  products: Product[];
}

export default function ComparisonProducts({
  products,
}: ComparisonProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Productos comparados
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Frente a frente
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          Consulta las características principales de cada producto
          y accede a su ficha técnica completa.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {products.slice(0, 2).map((product, index) => (
          <article
            key={product.catalogId}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <span className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Producto {index === 0 ? "A" : "B"}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {product.catalogId}
              </span>
            </div>

            <div className="p-6">
              <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full rounded-xl object-contain"
                  />
                ) : (
                  "Imagen pendiente"
                )}
              </div>

              <p className="mt-6 text-sm font-semibold text-blue-600">
                {product.brand}
              </p>

              <h3 className="mt-2 text-2xl font-bold leading-tight">
                {product.name}
              </h3>

              {product.mpn && (
                <p className="mt-2 text-sm text-gray-500">
                  Referencia fabricante:{" "}
                  <span className="font-medium text-gray-700">
                    {product.mpn}
                  </span>
                </p>
              )}

              {product.shortDescription && (
                <p className="mt-5 text-gray-600">
                  {product.shortDescription}
                </p>
              )}

              {product.espScore && (
                <div className="mt-5 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                  ESP Score {product.espScore.overall}/10
                </div>
              )}

              <div className="mt-6">
                <Link
                  href={`/productos/${product.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-900 px-5 py-3 font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
                >
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}