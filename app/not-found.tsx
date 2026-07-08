import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="mt-6 text-3xl font-bold">
        Página no encontrada
      </h2>

      <p className="mt-6 text-gray-600">
        Lo sentimos, la página que buscas no existe.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </main>
  );
}