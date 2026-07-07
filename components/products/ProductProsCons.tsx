interface ProductProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProductProsCons({
  pros,
  cons,
}: ProductProsConsProps) {
  return (
    <section className="mb-10 grid gap-8 md:grid-cols-2">
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-green-700">
          Ventajas
        </h2>

        <ul className="space-y-3">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2">
              <span>✅</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-red-700">
          Inconvenientes
        </h2>

        <ul className="space-y-3">
          {cons.map((con) => (
            <li key={con} className="flex gap-2">
              <span>❌</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}