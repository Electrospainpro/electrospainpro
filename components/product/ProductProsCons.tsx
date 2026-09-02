interface ProductProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProductProsCons({
  pros,
  cons,
}: ProductProsConsProps) {
  return (
    <>
      <section className="h-full rounded-[14px] border border-emerald-200 bg-emerald-50/50 p-5">
        <h3 className="text-[18px] font-bold tracking-tight text-emerald-700">
          Ventajas
        </h3>

        <p className="mt-1.5 text-[11px] leading-4 text-slate-500">
          Puntos destacados del producto
        </p>

        <ul className="mt-4 space-y-2">
          {pros.map((pro) => (
            <li
              key={pro}
              className="flex items-start gap-2 text-[11px] leading-5 text-slate-700"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-bold text-emerald-600"
              >
                ✓
              </span>

              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="h-full rounded-[14px] border border-red-200 bg-red-50/50 p-5">
        <h3 className="text-[18px] font-bold tracking-tight text-red-600">
          Inconvenientes
        </h3>

        <p className="mt-1.5 text-[11px] leading-4 text-slate-500">
          Aspectos a tener en cuenta
        </p>

        <ul className="mt-4 space-y-2">
          {cons.map((con) => (
            <li
              key={con}
              className="flex items-start gap-2 text-[11px] leading-5 text-slate-700"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-bold text-red-500"
              >
                ×
              </span>

              <span>{con}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}