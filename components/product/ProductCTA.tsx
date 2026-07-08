interface ProductCTAProps {
  title: string;
}

export default function ProductCTA({
  title,
}: ProductCTAProps) {
  return (
    <section className="mt-16 rounded-xl bg-blue-600 p-10 text-center text-white">
      <h2 className="text-3xl font-bold">
        ¿Te interesa este producto?
      </h2>

      <p className="mt-4 text-lg">
        Consulta los precios disponibles en nuestras tiendas
        recomendadas y elige la mejor opción para tu instalación.
      </p>

      <div className="mt-8">
        <a
          href="#"
          className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition hover:bg-gray-100"
        >
          Ver tiendas recomendadas
        </a>
      </div>
    </section>
  );
}