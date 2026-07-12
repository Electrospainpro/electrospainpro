import { Comparison } from "@/types/comparison";
import { products } from "./products";

export const comparisons: Comparison[] = [
  {
    id: 1,

    title:
      "Schneider Acti9 iC60N C16 vs ABB S201 C16",

    slug:
      "schneider-acti9-vs-abb-s201",

    category: "electricidad",

    summary:
      "Comparativa entre dos de los magnetotérmicos profesionales más utilizados por instaladores.",

    products: [
      products[0],
      products[1],
    ],

    criteria: [
      {
        label: "Calidad",
        winner: "Schneider Electric",
      },
      {
        label: "Durabilidad",
        winner: "Empate",
      },
      {
        label: "Precio",
        winner: "ABB",
      },
    ],

    winner: "Schneider Electric",

    publishedAt: "2026-07-12",
  },
];