interface ComparisonVerdictProps {
  winner: string;
}

export default function ComparisonVerdict({
  winner,
}: ComparisonVerdictProps) {
  return (
    <section className="mt-12 rounded-2xl border border-green-200 bg-green-50 p-8">
      <h2 className="text-2xl font-bold">
        🏆 ESP Verdict
      </h2>

      <p className="mt-5 text-lg">
        Tras analizar ambos productos, nuestra recomendación es:
      </p>

      <p className="mt-6 text-3xl font-bold text-green-700">
        {winner}
      </p>
    </section>
  );
}