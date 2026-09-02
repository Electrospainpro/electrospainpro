interface CalculatorHeaderProps {
  title: string;
  description?: string;
}

export default function CalculatorHeader({
  title,
  description,
}: CalculatorHeaderProps) {
  return (
    <header className="border-b border-slate-100 px-6 py-6 sm:px-8">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}