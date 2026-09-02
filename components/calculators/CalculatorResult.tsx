interface CalculatorResultProps {
  title?: string;
  children: React.ReactNode;
  status?: "success" | "warning" | "neutral";
  className?: string;
}

const statusClasses = {
  success:
    "border-emerald-200 bg-emerald-50/70",
  warning:
    "border-amber-200 bg-amber-50/70",
  neutral:
    "border-slate-200 bg-slate-50",
};

export default function CalculatorResult({
  title = "Resultado",
  children,
  status = "neutral",
  className = "",
}: CalculatorResultProps) {
  return (
    <section
      aria-live="polite"
      className={`rounded-2xl border p-5 sm:p-6 ${statusClasses[status]} ${className}`}
    >
      <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
        {title}
      </h3>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}