import Container from "@/components/ui/Container";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            ElectroSpainPro
          </div>

          <nav className="hidden gap-8 md:flex">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Marcas</a>
            <a href="#">Comparativas</a>
            <a href="#">Blog</a>
          </nav>
        </div>
      </Container>
    </header>
  );
}