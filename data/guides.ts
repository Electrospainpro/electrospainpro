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
];