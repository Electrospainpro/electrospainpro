interface CalculatorInputProps {
  id: string;
  label: string;
  unit?: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  type?: "text" | "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
}

export default function CalculatorInput({
  id,
  label,
  unit,
  value,
  onChange,
  type = "number",
  placeholder,
  min,
  max,
  step = "any",
  required = false,
  disabled = false,
  helpText,
}: CalculatorInputProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        {label}
        {required ? (
          <span className="ml-1 text-slate-500">
            *
          </span>
        ) : null}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required={required}
          disabled={disabled}
          inputMode={
            type === "number"
              ? "decimal"
              : undefined
          }
          className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${
            unit ? "pr-16" : ""
          } ${
            disabled
              ? "cursor-not-allowed bg-slate-50 text-slate-400"
              : ""
          }`}
        />

        {unit ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-slate-400">
            {unit}
          </span>
        ) : null}
      </div>

      {helpText ? (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}