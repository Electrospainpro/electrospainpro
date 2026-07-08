interface ProductRelatedProps {
  products: string[];
}

export default function ProductRelated({
  products,
}: ProductRelatedProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">
        Productos relacionados
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product}
            className="rounded-xl border p-6 transition hover:shadow-lg"
          >
            <h3 className="font-semibold">
              {product}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}