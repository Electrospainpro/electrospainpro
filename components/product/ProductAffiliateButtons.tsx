interface AffiliateLink {
  store: string;
  url: string;
}

interface ProductAffiliateButtonsProps {
  affiliateLinks: AffiliateLink[];
}

export default function ProductAffiliateButtons({
  affiliateLinks,
}: ProductAffiliateButtonsProps) {
  if (affiliateLinks.length === 0) {
    return (
      <section className="mb-10 rounded-2xl border bg-gray-50 p-8">
        <h2 className="text-2xl font-bold">
          Dónde comprar
        </h2>

        <p className="mt-4 text-gray-600">
          Estamos recopilando las mejores tiendas para este producto.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-10 rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Dónde comprar
      </h2>

      <p className="mt-2 text-gray-600">
        Estas son las tiendas donde actualmente puedes encontrar este producto.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Tienda
              </th>

              <th className="px-6 py-4 text-center">
                Estado
              </th>

              <th className="px-6 py-4 text-right">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {affiliateLinks.map((link) => (
              <tr
                key={link.store}
                className="border-t"
              >
                <td className="px-6 py-5 font-semibold">
                  {link.store}
                </td>

                <td className="px-6 py-5 text-center text-green-600">
                  Disponible
                </td>

                <td className="px-6 py-5 text-right">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                  >
                    Ver oferta
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-sm text-gray-500">
        Algunos enlaces pueden ser de afiliado. Si realizas una compra, ElectroSpainPro puede recibir una comisión sin coste adicional para ti. Esto nos ayuda a mantener el proyecto y seguir creando contenido técnico independiente.
      </p>
    </section>
  );
}