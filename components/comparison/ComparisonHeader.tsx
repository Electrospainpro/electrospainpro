interface ComparisonHeaderProps {
  title: string;
  summary: string;
}

export default function ComparisonHeader({
  title,
  summary,
}: ComparisonHeaderProps) {
  return (
    <header className="rounded-2xl border bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Comparativa Profesional
      </p>

      <h1 className="mt-3 text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-6 max-w-4xl text-lg text-gray-600">
        {summary}
      </p>
    </header>
  );
}