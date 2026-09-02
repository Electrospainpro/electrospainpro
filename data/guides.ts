import { Guide } from "@/types/guide";

import { products } from "./products";
import { comparisons } from "./comparisons";

export const guides: Guide[] = [
  {
    id: 1,

    title: "Cómo elegir un magnetotérmico",

    slug: "como-elegir-un-magnetotermico",

    category: "electricidad",

    summary:
      "Guía completa para seleccionar el magnetotérmico adecuado según la instalación.",

    content:
      "Contenido pendiente de desarrollo...",

    relatedProducts: [
      products[0],
      products[1],
    ],

    relatedComparisons: [
      comparisons[0],
    ],

    publishedAt: "2026-07-12",
  },
  {
    id: 2,
    title: "Cómo elegir un multímetro para electricista",
    slug: "como-elegir-multimetro",
    category: "herramientas",
    summary: "Cómo elegir un multímetro para electricista. Contenido editorial pendiente de desarrollo.",
    content:
      "Contenido editorial pendiente de desarrollo.",
    relatedProducts: [
      products.find((product) => product.catalogId === "P004")!
    ],
    relatedComparisons: [],
    publishedAt: "",
  },
  {
    id: 3,
    title: "Pinza amperimétrica vs multímetro",
    slug: "pinza-amperimetrica-o-multimetro",
    category: "herramientas",
    summary: "Pinza amperimétrica vs multímetro. Contenido editorial pendiente de desarrollo.",
    content:
      "Contenido editorial pendiente de desarrollo.",
    relatedProducts: [
      products.find((product) => product.catalogId === "P004")!,
      products.find((product) => product.catalogId === "P005")!,
      products.find((product) => product.catalogId === "P006")!
    ],
    relatedComparisons: [],
    publishedAt: "",
  }
];