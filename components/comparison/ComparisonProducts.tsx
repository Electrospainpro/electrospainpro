import { Product } from "@/types/product";

interface ComparisonProductsProps {
  products: Product[];
}

export default function ComparisonProducts({
  products,
}: ComparisonProductsProps) {
  return (
    <section className="mt-10 grid gap-8 md:grid-cols-2">
      {products.map((product) => (
        <article
          key={product.id}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Imagen pendiente
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            {product.name}
          </h2>

          <p className="mt-2 text-gray-500">
            {product.brand}
          </p>

          {product.espScore && (
            <div className="mt-5 inline-flex rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
              ESP Score {product.espScore.overall}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}