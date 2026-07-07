interface Specification {
  label: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <section className="mb-10 rounded-xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Especificaciones técnicas
      </h2>

      <div className="divide-y">
        {specifications.map((specification) => (
          <div
            key={specification.label}
            className="flex justify-between py-4"
          >
            <span className="font-medium text-gray-600">
              {specification.label}
            </span>

            <span className="font-semibold">
              {specification.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}