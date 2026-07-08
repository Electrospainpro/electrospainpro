interface ProductESPScoreProps {
  score: number;
}

export default function ProductESPScore({
  score,
}: ProductESPScoreProps) {
  return (
    <section className="mb-10 rounded-xl border bg-blue-50 p-8">
      <h2 className="text-2xl font-bold text-blue-700">
        ESP Score
      </h2>

      <div className="mt-6 flex items-center gap-6">
        <div className="text-6xl font-extrabold text-blue-600">
          {score}
        </div>

        <div>
          <p className="text-lg font-semibold">
            Recomendación ElectroSpainPro
          </p>

          <p className="text-gray-600">
            Basado en criterios técnicos y experiencia profesional.
          </p>
        </div>
      </div>
    </section>
  );
}