import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Schneider Electric Acti9 iC60N C16",
    slug: "schneider-acti9-ic60n-c16",
    brand: "Schneider Electric",
    category: "electricidad",
    subcategory: "magnetotermicos",
    image: "",
    price: "",
    rating: 4.9,
    affiliateLinks: {
      amazon: "",
      manomano: "",
      rs: "",
      farnell: "",
    },
    shortDescription:
      "Interruptor magnetotérmico de alta calidad para instalaciones eléctricas profesionales.",
    description:
      "El Schneider Electric Acti9 iC60N C16 es uno de los magnetotérmicos más utilizados por instaladores profesionales gracias a su fiabilidad, calidad de fabricación y facilidad de instalación.",
    pros: [
      "Alta fiabilidad",
      "Excelente calidad de fabricación",
      "Muy utilizado en instalaciones profesionales",
    ],
    cons: [
      "Precio superior a la media",
    ],
    specifications: [
      {
        label: "Curva",
        value: "C",
      },
      {
        label: "Intensidad",
        value: "16 A",
      },
      {
        label: "Polos",
        value: "1P",
      },
      {
        label: "Poder de corte",
        value: "6 kA",
      },
    ],
    espScore: {
      quality: 10,
      reliability: 10,
      valueForMoney: 8,
      installation: 10,
      durability: 10,
      availability: 9,
      warranty: 9,
      overall: 96,
    },
  },

  {
    id: 2,
    name: "ABB S201 C16",
    slug: "abb-s201-c16",
    brand: "ABB",
    category: "electricidad",
    subcategory: "magnetotermicos",
    image: "",
    price: "",
    rating: 4.8,
    affiliateLinks: {
      amazon: "",
      rs: "",
    },
    shortDescription:
      "Magnetotérmico ABB de uso profesional.",
    description:
      "Uno de los magnetotérmicos más utilizados por empresas instaladoras gracias a su robustez y calidad.",
    pros: [
      "Muy fiable",
      "Gran calidad",
      "Excelente comportamiento",
    ],
    cons: [
      "Precio elevado",
    ],
    specifications: [
      {
        label: "Curva",
        value: "C",
      },
      {
        label: "Intensidad",
        value: "16 A",
      },
      {
        label: "Polos",
        value: "1P",
      },
      {
        label: "Poder de corte",
        value: "6 kA",
      },
    ],
    espScore: {
      quality: 9,
      reliability: 10,
      valueForMoney: 8,
      installation: 9,
      durability: 10,
      availability: 8,
      warranty: 9,
      overall: 93,
    },
  },
];