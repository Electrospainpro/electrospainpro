import { Product } from "@/types/product";
  id: number;

  name: string;

  slug: string;

  brand: string;

  category: string;

  subcategory: string;

  image: string;

  price: string;

  rating: number;

  affiliateLinks: {
    amazon?: string;
    manomano?: string;
    leroymerlin?: string;
    rs?: string;
    farnell?: string;
  };

  shortDescription: string;

  description: string;

  pros: string[];

  cons: string[];

  specifications: {
    label: string;
    value: string;
  }[];
}

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
      "El Acti9 iC60N de Schneider Electric es uno de los magnetotérmicos más utilizados en instalaciones residenciales e industriales por su fiabilidad y durabilidad.",

    pros: [
      "Gran calidad de fabricación",
      "Alta fiabilidad",
      "Muy utilizado por profesionales",
    ],

    cons: [
      "Precio superior a otras marcas",
    ],

    specifications: [
      {
        label: "Curva",
        value: "C",
      },
      {
        label: "Intensidad",
        value: "16A",
      },
      {
        label: "Polos",
        value: "1P",
      },
      {
        label: "Poder de corte",
        value: "6000A",
      },
    ],
  },
];