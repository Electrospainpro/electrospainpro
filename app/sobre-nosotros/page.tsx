import PageHeader from "@/components/common/PageHeader";

export default function SobreNosotrosPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <PageHeader
        title="Sobre ElectroSpainPro"
        description="Una plataforma especializada para ayudarte a elegir productos, comparar alternativas y utilizar herramientas técnicas."
      />

      <div className="mt-10 max-w-4xl space-y-8">
        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            ¿Qué es ElectroSpainPro?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            ElectroSpainPro nace con el objetivo de convertirse en una
            plataforma de referencia para profesionales, instaladores,
            empresas y usuarios que necesitan información fiable para elegir
            productos relacionados con electricidad, telecomunicaciones,
            energía fotovoltaica, herramientas e instrumentación e informática
            profesional.
          </p>
        </section>

        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Qué encontrarás
          </h2>

          <ul className="mt-4 space-y-3 text-gray-600">
            <li>• Comparativas de productos.</li>
            <li>• Guías técnicas.</li>
            <li>• Fichas de productos y especificaciones.</li>
            <li>• Herramientas y calculadoras técnicas.</li>
            <li>• Comparación de ofertas y tiendas.</li>
            <li>• Valoraciones propias mediante el sistema ESP Score.</li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Nuestro objetivo
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Queremos facilitar decisiones de compra basadas en información
            técnica, especificaciones verificables, relación calidad-precio y
            utilidad real para cada tipo de usuario.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            ElectroSpainPro también puede recibir comisiones de determinados
            programas de afiliación cuando un usuario realiza una compra a
            través de nuestros enlaces. Estas relaciones comerciales no
            sustituyen nuestro criterio editorial.
          </p>
        </section>
      </div>
    </main>
  );
}