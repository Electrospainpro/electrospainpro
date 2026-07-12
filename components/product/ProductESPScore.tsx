interface ProductESPScoreProps {
  score: number;
}

export default function ProductESPScore({
  score,
}: ProductESPScoreProps) {
  function getRecommendation(score: number) {
    if (score >= 95) return "Excelente";
    if (score >= 90) return "Muy recomendado";
    if (score >= 80) return "Recomendado";
    if (score >= 70) return "Aceptable";

    return "Mejorable";
  }

  return (
    <section className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-8 shadow-sm">

      <div className="flex flex-col gap-8 md:flex-row md:items-center">

        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">

          <div className="text-center">
            <div className="text-5xl font-extrabold">
              {score}
            </div>

            <div className="text-sm font-medium">
              /100
            </div>
          </div>

        </div>

        <div className="flex-1">

          <h2 className="text-3xl font-bold text-blue-700">
            ESP Score
          </h2>

          <p className="mt-2 text-xl font-semibold">
            {getRecommendation(score)}
          </p>

          <div className="mt-4 text-yellow-500 text-2xl">
            ★★★★★
          </div>

          <p className="mt-4 text-gray-700 leading-7">
            Valoración propia de ElectroSpainPro basada en
            criterios técnicos, experiencia profesional,
            calidad de fabricación, facilidad de instalación
            y fiabilidad del producto.
          </p>

        </div>

      </div>

    </section>
  );
}