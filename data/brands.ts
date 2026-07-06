export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export const brands: Brand[] = [
  { id: "schneider", name: "Schneider Electric", slug: "schneider-electric" },
  { id: "siemens", name: "Siemens", slug: "siemens" },
  { id: "abb", name: "ABB", slug: "abb" },
  { id: "legrand", name: "Legrand", slug: "legrand" },
  { id: "hager", name: "Hager", slug: "hager" },
  { id: "phoenix", name: "Phoenix Contact", slug: "phoenix-contact" },
];