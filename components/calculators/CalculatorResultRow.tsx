interface CalculatorResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export default function CalculatorResultRow({
  label,
  value,
  unit,
  highlight = false,
}: CalculatorResultRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b border-slate-200/80 py-3 last:border-b-0 ${
        highlight
          ? "rounded-xl bg-white px-3"
          : ""
      }`}
    >
      <span className="min-w-0 text-sm text-slate-600">
        {label}
      </span>

      <span
        className={`shrink-0 text-right ${
          highlight
            ? "text-lg font-bold text-slate-900"
            : "text-sm font-semibold text-slate-800"
        }`}
      >
        {value}
        {unit ? (
          <span className="ml-1 text-xs font-medium text-slate-500">
            {unit}
          </span>
        ) : null}
      </span>
    </div>
  );
}