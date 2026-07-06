export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "electricidad",
    name: "Electricidad",
    slug: "electricidad",
    icon: "⚡",
    description: "Material eléctrico profesional",
  },
  {
    id: "telecomunicaciones",
    name: "Telecomunicaciones",
    slug: "telecomunicaciones",
    icon: "📡",
    description: "Redes, fibra óptica y CCTV",
  },
  {
    id: "fotovoltaica",
    name: "Fotovoltaica",
    slug: "fotovoltaica",
    icon: "🌞",
    description: "Paneles, inversores y baterías",
  },
  {
    id: "herramientas",
    name: "Herramientas",
    slug: "herramientas",
    icon: "🔧",
    description: "Herramientas para instaladores",
  },
  {
    id: "instrumentacion",
    name: "Instrumentación",
    slug: "instrumentacion",
    icon: "📐",
    description: "Equipos de medida y comprobación",
  },
  {
    id: "seguridad",
    name: "Seguridad",
    slug: "seguridad",
    icon: "🦺",
    description: "EPIs y seguridad laboral",
  },
];