import type {
  ComparisonSpecification,
} from "@/types/comparison";

interface ComparisonTableProps {
  specifications: ComparisonSpecification[];

  productAName: string;

  productBName: string;
}

export default function ComparisonTable({
  specifications,
  productAName,
  productBName,
}: ComparisonTableProps) {
  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Comparativa técnica
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-4 font-semibold">
                Característica
              </th>

              <th className="px-4 py-4 font-semibold">
                {productAName}
              </th>

              <th className="px-4 py-4 font-semibold">
                {productBName}
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
                    {specification.productA}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {specification.productB}
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