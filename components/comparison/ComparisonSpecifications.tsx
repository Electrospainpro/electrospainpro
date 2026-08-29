import type {
  Product,
} from "@/types/product";

interface ComparisonSpecificationsProps {
  products: Product[];
}

export default function ComparisonSpecifications({
  products,
}: ComparisonSpecificationsProps) {
  if (products.length < 2) {
    return null;
  }

  const [productA, productB] = products;

  const specificationMap = new Map<
    string,
    {
      productA: string;
      productB: string;
    }
  >();

  for (const specification of productA.specifications ??
    []) {
    specificationMap.set(
      specification.label,
      {
        productA: specification.value,
        productB: "",
      }
    );
  }

  for (const specification of productB.specifications ??
    []) {
    const existing =
      specificationMap.get(
        specification.label
      );

    specificationMap.set(
      specification.label,
      {
        productA:
          existing?.productA ?? "",
        productB:
          specification.value,
      }
    );
  }

  const specifications = Array.from(
    specificationMap.entries()
  ).map(
    ([label, values]) => ({
      label,
      ...values,
    })
  );

  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Especificaciones técnicas
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-4 font-semibold">
                Característica
              </th>

              <th className="px-4 py-4 font-semibold">
                {productA.name}
              </th>

              <th className="px-4 py-4 font-semibold">
                {productB.name}
              </th>
            </tr>
          </thead>

          <tbody>
            {specifications.map(
              (specification) => (
                <tr
                  key={specification.label}
                  className="border-b last:border-b-0"
                >
                  <td className="px-4 py-4 font-medium">
                    {specification.label}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {specification.productA ||
                      "—"}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {specification.productB ||
                      "—"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}