import type { Comparison } from "@/types/comparison";
import { products } from "./products";

/**
 * Comparativas editoriales de ElectroSpainPro.
 *
 * IMPORTANTE:
 * Las comparativas en estado "candidate" no deben
 * considerarse publicadas hasta completar la revisión
 * editorial, criterios y veredicto.
 */
export const comparisons: Comparison[] = [
  {
    id: 1,

    title:
      "Fluke 323 vs Fluke 325: comparativa de pinzas amperimétricas",

    slug:
      "fluke-323-vs-fluke-325",

    category: "instrumentacion",

    summary:
      "Comparativa técnica entre las pinzas amperimétricas Fluke 323 y Fluke 325, centrada en sus capacidades de medida y funciones disponibles.",

    products: [
      products.find(
        (product) =>
          product.catalogId === "P005"
      )!,
      products.find(
        (product) =>
          product.catalogId === "P006"
      )!,
    ],

    specifications: [
      {
        label: "Tecnología",
        productA: "True-RMS",
        productB: "True-RMS",
      },
      {
        label: "Corriente",
        productA: "400 A AC",
        productB: "40 A / 400 A AC/DC",
      },
      {
        label: "Tensión",
        productA: "600 V AC/DC",
        productB: "600 V AC/DC",
      },
      {
        label: "Temperatura",
        productA: "No indicada en los datos actuales",
        productB: "-10 °C a 400 °C",
      },
      {
        label: "Frecuencia",
        productA: "No indicada en los datos actuales",
        productB: "5 Hz a 500 Hz",
      },
      {
        label: "Seguridad",
        productA:
          "CAT III 600 V / CAT IV 300 V",
        productB:
          "CAT III 600 V / CAT IV 300 V",
      },
    ],

    criteria: [],

    faq: [],

    seo: {
      metaTitle:
        "Fluke 323 vs Fluke 325 | Comparativa de pinzas amperimétricas",

      metaDescription:
        "Comparamos las Fluke 323 y Fluke 325 según los datos técnicos verificados disponibles en ElectroSpainPro.",

      keywords: [
        "Fluke 323 vs Fluke 325",
        "Fluke 323",
        "Fluke 325",
        "pinza amperimétrica",
        "True-RMS",
        "comparativa Fluke",
      ],
    },

    publishedAt: "2026-08-29",
  },
];