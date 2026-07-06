import Link from "next/link";
import Container from "@/components/ui/Container";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/electricidad", label: "Electricidad" },
  { href: "/telecomunicaciones", label: "Telecomunicaciones" },
  { href: "/fotovoltaica", label: "Fotovoltaica" },
  { href: "/herramientas", label: "Herramientas" },
];

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            ElectroSpainPro
          </Link>

          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}