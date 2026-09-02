interface FormulaCardProps {
  title?: string;
  children: React.ReactNode;
  explanation?: string;
}

export default function FormulaCard({
  title = "Fórmula utilizada",
  children,
  explanation,
}: FormulaCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        Fórmula
      </p>

      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      <div className="mt-5 rounded-xl bg-slate-950 p-5 text-center">
        {children}
      </div>

      {explanation ? (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {explanation}
        </p>
      ) : null}
    </div>
  );
}