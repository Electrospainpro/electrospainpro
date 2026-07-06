import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100 py-12">
      <Container>
        <div className="text-center">
          <h3 className="text-xl font-bold">
            ElectroSpainPro
          </h3>

          <p className="mt-4 text-gray-500">
            La plataforma técnica para profesionales de la electricidad,
            telecomunicaciones y energía solar.
          </p>

          <p className="mt-6 text-sm text-gray-400">
            © 2026 ElectroSpainPro. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}