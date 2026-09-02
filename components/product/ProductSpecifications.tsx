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
  if (specifications.length === 0) {
    return null;
  }

  return (
    <section className="mb-14 overflow-hidden rounded-[22px] border border-slate-300 bg-white shadow-sm">
      {/* CABECERA */}

      <div className="px-7 pb-6 pt-8 sm:px-9 sm:pt-9">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600">
            Ficha técnica
          </span>
        </div>

        <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[32px]">
          Especificaciones técnicas
        </h2>

        <p className="mt-2 text-[15px] leading-6 text-slate-500">
          Datos técnicos principales del producto.
        </p>
      </div>

      {/* TABLA DE ESPECIFICACIONES */}

      <div className="border-t border-slate-200">
        {specifications.map(
          (specification, index) => (
            <div
              key={specification.label}
              className={`flex items-center justify-between gap-8 px-7 py-6 sm:px-9 ${
                index < specifications.length - 1
                  ? "border-b border-slate-200"
                  : ""
              }`}
            >
              <span className="text-[15px] font-medium leading-6 text-slate-500 sm:text-[16px]">
                {specification.label}
              </span>

              <span className="max-w-[65%] text-right text-[15px] font-bold leading-6 text-slate-950 sm:text-[16px]">
                {specification.value}
              </span>
            </div>
          ),
        )}
      </div>
    </section>
  );
}