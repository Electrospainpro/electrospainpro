export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const electricidadSubcategories: Subcategory[] = [
  {
    id: "cableado",
    name: "Cableado",
    slug: "cableado",
    description: "Cables, mangueras y conductores eléctricos.",
  },
  {
    id: "magnetotermicos",
    name: "Magnetotérmicos",
    slug: "magnetotermicos",
    description: "Protección contra sobrecargas y cortocircuitos.",
  },
  {
    id: "diferenciales",
    name: "Diferenciales",
    slug: "diferenciales",
    description: "Protección frente a fugas de corriente.",
  },
  {
    id: "cuadros-electricos",
    name: "Cuadros eléctricos",
    slug: "cuadros-electricos",
    description: "Envolventes, armarios y cuadros de distribución.",
  },
  {
    id: "mecanismos",
    name: "Mecanismos",
    slug: "mecanismos",
    description: "Interruptores, enchufes y mecanismos eléctricos.",
  },
  {
    id: "canalizacion",
    name: "Canalización",
    slug: "canalizacion",
    description: "Tubos, canaletas y accesorios de instalación.",
  },
  {
    id: "iluminacion",
    name: "Iluminación",
    slug: "iluminacion",
    description: "Luminarias, proyectores y soluciones LED.",
  },
  {
    id: "proteccion",
    name: "Protección",
    slug: "proteccion",
    description: "Fusibles, descargadores y sistemas de protección.",
  },
];