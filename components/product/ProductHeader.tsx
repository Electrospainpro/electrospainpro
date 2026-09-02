interface ProductHeaderProps {
  name: string;
  brand: string;
  rating: number;
  shortDescription: string;
}

export default function ProductHeader({
  name,
  brand,
  rating,
  shortDescription,
}: ProductHeaderProps) {
  const hasRating = rating > 0;

  return (
    <section className="flex h-full min-h-[420px] flex-col justify-center rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] sm:min-h-[480px] sm:p-9 lg:min-h-[520px] lg:p-10">

      {/* ======================================================
          MARCA
      ====================================================== */}

      <div>
        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-blue-700">
          {brand}
        </span>
      </div>

      {/* ======================================================
          NOMBRE
      ====================================================== */}

      <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
        {name}
      </h1>

      {/* ======================================================
          VALORACIÓN
      ====================================================== */}

      <div className="mt-6 flex flex-wrap items-center gap-3">

        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">

          <span className="text-base tracking-[0.08em] text-amber-400">
            {hasRating ? "★★★★★" : "☆☆☆☆☆"}
          </span>

          {hasRating ? (
            <span className="text-sm font-bold text-slate-900">
              {rating.toFixed(1)}
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-500">
              Sin valoraciones
            </span>
          )}

        </div>

        <span className="text-sm text-slate-500">
          Valoración del producto
        </span>

      </div>

      {/* ======================================================
          SEPARADOR
      ====================================================== */}

      <div className="my-7 h-px w-full bg-slate-200" />

      {/* ======================================================
          DESCRIPCIÓN
      ====================================================== */}

      <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
        {shortDescription}
      </p>

      {/* ======================================================
          ETIQUETAS
      ====================================================== */}

      <div className="mt-7 flex flex-wrap gap-2">

        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
          Uso profesional
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
          Instrumentación eléctrica
        </span>

        <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
          Analizado por ElectroSpainPro
        </span>

      </div>

    </section>
  );
}