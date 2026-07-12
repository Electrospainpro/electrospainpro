import Link from "next/link";

import { Product } from "@/types/product";

interface GuideRelatedProductsProps {
  products: Product[];
}

export default function GuideRelatedProducts({
  products,
}: GuideRelatedProductsProps) {
  return (
    <section className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Productos relacionados
      </h2>

      <div className="space-y-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productos/${product.slug}`}
            className="block rounded-lg border p-4 transition hover:border-blue-600 hover:bg-gray-50"
          >
            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              {product.brand}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}