export interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  price: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Multímetro Digital Profesional",
    category: "Instrumentación",
    price: "89,90 €",
  },
  {
    id: 2,
    name: "Taladro Percutor Bosch",
    category: "Herramientas",
    price: "149,00 €",
  },
  {
    id: 3,
    name: "Panel Solar 450W