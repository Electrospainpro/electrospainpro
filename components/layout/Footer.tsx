import Link from "next/link";

import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600">
              ElectroSpainPro
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              La plataforma técnica para profesionales de la electricidad,
              telecomunicaciones, fotovoltaica e instrumentación.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-semibold text-gray-900">
              Categorías
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/electricidad" className="hover:text-blue-600">
                  Electricidad
                </Link>
              </li>

              <li>
                <Link href="/telecomunicaciones" className="hover:text-blue-600">
                  Telecomunicaciones
                </Link>
              </li>

              <li>
                <Link href="/fotovoltaica" className="hover:text-blue-600">
                  Fotovoltaica
                </Link>
              </li>

              <li>
                <Link href="/herramientas" className="hover:text-blue-600">
                  Herramientas
                </Link>
              </li>

              <li>
                <Link href="/instrumentacion" className="hover:text-blue-600">
                  Instrumentación
                </Link>
              </li>
            </ul>
          </div>

          {/* Contenido */}
          <div>
            <h4 className="font-semibold text-gray-900">
              Contenido
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/productos" className="hover:text-blue-600">
                  Productos
                </Link>
              </li>

              <li>
                <Link href="/comparativa" className="hover:text-blue-600">
                  Comparativas
                </Link>
              </li>

              <li>
                <Link href="/marcas" className="hover:text-blue-600">
                  Marcas
                </Link>
              </li>

              <li>
                <Link href="/contacto" className="hover:text-blue-600">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Proyecto */}
          <div>
            <h4 className="font-semibold text-gray-900">
              ElectroSpainPro
            </h4>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Proyecto en desarrollo orientado a ofrecer información técnica,
              comparativas y herramientas para instaladores y profesionales.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          © 2026 ElectroSpainPro · Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}