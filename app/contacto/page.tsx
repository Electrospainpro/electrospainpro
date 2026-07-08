export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Contacto
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        ¿Quieres colaborar con ElectroSpainPro?
      </p>

      <div className="mt-10 rounded-xl border p-8">
        <p>
          Muy pronto podrás contactar con nosotros para:
        </p>

        <ul className="mt-6 space-y-3">
          <li>• Fabricantes</li>
          <li>• Distribuidores</li>
          <li>• Empresas instaladoras</li>
          <li>• Colaboraciones</li>
        </ul>
      </div>
    </main>
  );
}