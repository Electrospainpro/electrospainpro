export default function ComparativaPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Comparativas
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        Analizamos y comparamos productos profesionales para ayudarte
        a elegir la mejor opción según tus necesidades.
      </p>

      <div className="mt-12 rounded-xl border bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold">
          Próximamente
        </h2>

        <ul className="mt-6 space-y-3 text-gray-700">
          <li>• Schneider vs ABB</li>
          <li>• Hager vs Legrand</li>
          <li>• Mejor magnetotérmico 2026</li>
          <li>• Mejor multímetro profesional</li>
        </ul>
      </div>
    </main>
  );
}