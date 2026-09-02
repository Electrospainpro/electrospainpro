interface CalculatorSelectOption {
  value: string;
  label: string;
}

interface CalculatorSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  options: CalculatorSelectOption[];
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function CalculatorSelect({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
  required = false,
  disabled = false,
}: CalculatorSelectProps) {
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

      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${
          disabled
            ? "cursor-not-allowed bg-slate-50 text-slate-400"
            : ""
        }`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {helpText ? (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}