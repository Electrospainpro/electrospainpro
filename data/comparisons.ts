import type { Comparison } from "@/types/comparison";
import { products } from "./products";

/**
 * Comparativas editoriales de ElectroSpainPro.
 *
 * Las especificaciones técnicas se basan en los datos
 * verificados del catálogo y en la documentación oficial
 * del fabricante.
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
      "Comparativa técnica entre las Fluke 323 y Fluke 325 para determinar qué pinza amperimétrica resulta más adecuada según las necesidades de medida del profesional.",

    introduction:
      "La Fluke 323 y la Fluke 325 pertenecen a la serie 320 de pinzas amperimétricas True-RMS de Fluke. Ambas permiten medir corriente alterna hasta 400 A y tensión AC/DC hasta 600 V, además de ofrecer una categoría de seguridad CAT III 600 V y CAT IV 300 V. La principal diferencia está en las funciones adicionales de la Fluke 325, que incorpora medición de corriente continua, frecuencia, temperatura, capacitancia y funciones Min/Max.",

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
        label: "Corriente AC",
        productA: "400 A",
        productB: "40 A / 400 A",
      },

      {
        label: "Corriente DC",
        productA: "No disponible",
        productB: "40 A / 400 A",
      },

      {
        label: "Tensión AC",
        productA: "600 V",
        productB: "600 V",
      },

      {
        label: "Tensión DC",
        productA: "600 V",
        productB: "600 V",
      },

      {
        label: "Resistencia",
        productA: "400 Ω / 4 kΩ",
        productB: "400 Ω / 4 kΩ / 40 kΩ",
      },

      {
        label: "Continuidad",
        productA: "≤ 70 Ω",
        productB: "≤ 30 Ω",
      },

      {
        label: "Capacitancia",
        productA: "No disponible",
        productB: "0 a 1000 μF",
      },

      {
        label: "Frecuencia",
        productA: "No disponible",
        productB: "5 Hz a 500 Hz",
      },

      {
        label: "Temperatura",
        productA: "No disponible",
        productB: "-10 °C a 400 °C",
      },

      {
        label: "Retroiluminación",
        productA: "No",
        productB: "Sí",
      },

      {
        label: "Mín./Máx.",
        productA: "No",
        productB: "Sí",
      },

      {
        label: "Seguridad",
        productA:
          "CAT III 600 V / CAT IV 300 V",
        productB:
          "CAT III 600 V / CAT IV 300 V",
      },

      {
        label: "Peso",
        productA: "265 g",
        productB: "283 g",
      },

      {
        label: "Diámetro máximo del conductor",
        productA: "30 mm",
        productB: "30 mm",
      },

      {
        label: "Garantía",
        productA: "2 años",
        productB: "2 años",
      },
    ],

    criteria: [
      {
        label: "Medición de corriente",
        winner: "Fluke 325",
        explanation:
          "La Fluke 323 mide hasta 400 A AC, mientras que la Fluke 325 añade medición de corriente DC hasta 400 A.",
      },

      {
        label: "Medición de tensión",
        winner: "Empate",
        explanation:
          "Ambas permiten medir tensión AC/DC hasta 600 V.",
      },

      {
        label: "Funciones de medida",
        winner: "Fluke 325",
        explanation:
          "La Fluke 325 incorpora frecuencia, temperatura, capacitancia y funciones Min/Max, además de corriente DC.",
      },

      {
        label: "Portabilidad",
        winner: "Fluke 323",
        explanation:
          "La Fluke 323 tiene un peso inferior: 265 g frente a los 283 g de la Fluke 325.",
      },

      {
        label: "Seguridad",
        winner: "Empate",
        explanation:
          "Ambos modelos están clasificados como CAT III 600 V y CAT IV 300 V.",
      },

      {
        label: "Versatilidad",
        winner: "Fluke 325",
        explanation:
          "La mayor variedad de funciones de medida convierte a la Fluke 325 en una herramienta más versátil.",
      },
    ],

    productAPros: [
      "Diseño compacto y ligero.",
      "Medición True-RMS.",
      "Medición de corriente AC hasta 400 A.",
      "Medición de tensión AC/DC hasta 600 V.",
      "Categoría de seguridad CAT III 600 V / CAT IV 300 V.",
      "Adecuada para comprobaciones eléctricas generales.",
    ],

    productACons: [
      "No mide corriente DC mediante la pinza.",
      "No incorpora medición de frecuencia.",
      "No incorpora medición de temperatura.",
      "No incorpora medición de capacitancia.",
      "No dispone de retroiluminación.",
      "No dispone de función Min/Max.",
    ],

    productBPros: [
      "Medición True-RMS.",
      "Corriente AC y DC hasta 400 A.",
      "Tensión AC/DC hasta 600 V.",
      "Medición de frecuencia.",
      "Medición de temperatura.",
      "Medición de capacitancia.",
      "Función Min/Max.",
      "Pantalla retroiluminada.",
      "Categoría de seguridad CAT III 600 V / CAT IV 300 V.",
    ],

    productBCons: [
      "Es ligeramente más pesada que la Fluke 323.",
      "Puede resultar innecesaria para trabajos básicos de medida AC.",
    ],

    recommendations: [
      {
        profile:
          "Electricista que busca una pinza para comprobaciones básicas",

        product: "Fluke 323",

        reason:
          "Ofrece medición True-RMS, corriente AC hasta 400 A y tensión AC/DC hasta 600 V en un formato compacto y ligero.",
      },

      {
        profile:
          "Profesional que necesita mayor variedad de medidas",

        product: "Fluke 325",

        reason:
          "Añade corriente DC, frecuencia, temperatura, capacitancia y Min/Max, ampliando considerablemente las posibilidades de diagnóstico.",
      },

      {
        profile:
          "Técnico de mantenimiento",

        product: "Fluke 325",

        reason:
          "Sus funciones adicionales permiten realizar más comprobaciones con un único instrumento.",
      },
    ],

    verdict:
      "La Fluke 325 es la opción más completa de esta comparativa. La Fluke 323 sigue siendo una alternativa muy interesante para quien necesita principalmente medir corriente AC, tensión y resistencia con una herramienta compacta. Para trabajos de mantenimiento y diagnóstico donde se necesiten más funciones, la 325 ofrece una ventaja clara por su mayor versatilidad.",

    winner: "Fluke 325",

    faq: [
      {
        question:
          "¿Cuál es mejor, la Fluke 323 o la Fluke 325?",

        answer:
          "La Fluke 325 es más completa porque incorpora medición de corriente DC, frecuencia, temperatura, capacitancia y funciones Min/Max. La Fluke 323 puede ser suficiente si las necesidades se centran principalmente en corriente AC, tensión y resistencia.",
      },

      {
        question:
          "¿La Fluke 323 mide corriente continua?",

        answer:
          "No. La especificación oficial de la Fluke 323 no incluye medición de corriente DC mediante la pinza. La Fluke 325 sí permite medir corriente DC hasta 400 A.",
      },

      {
        question:
          "¿La Fluke 325 mide temperatura?",

        answer:
          "Sí. La Fluke 325 incorpora medición de temperatura de contacto desde -10 °C hasta 400 °C.",
      },

      {
        question:
          "¿Las Fluke 323 y 325 miden 600 V?",

        answer:
          "Sí. Ambos modelos permiten medir tensión AC/DC hasta 600 V.",
      },

      {
        question:
          "¿Cuál tiene más funciones, la Fluke 323 o la Fluke 325?",

        answer:
          "La Fluke 325 tiene más funciones. Además de las medidas principales disponibles en la 323, añade corriente DC, frecuencia, capacitancia, temperatura y Min/Max, además de retroiluminación.",
      },

      {
        question:
          "¿Cuál es más ligera?",

        answer:
          "La Fluke 323 pesa 265 g, mientras que la Fluke 325 pesa 283 g. La diferencia es de 18 g.",
      },
    ],

    status: "published",

    seo: {
      metaTitle:
        "Fluke 323 vs Fluke 325: comparativa de pinzas amperimétricas",

      metaDescription:
        "Comparamos Fluke 323 y Fluke 325: corriente AC/DC, tensión, frecuencia, temperatura, capacitancia, seguridad y funciones para electricistas.",

      keywords: [
        "Fluke 323 vs Fluke 325",
        "Fluke 323",
        "Fluke 325",
        "Fluke 325 vs 323",
        "pinza amperimétrica Fluke",
        "pinza amperimétrica True-RMS",
        "pinza amperimétrica electricista",
      ],
    },

    publishedAt: "2026-08-29",
  },
  {
    id: 2,
    title: "Schneider vs Hager C16",
    slug: "schneider-vs-hager-c16",
    category: "electricidad",
    summary: "Schneider vs Hager C16. Contenido editorial pendiente de desarrollo.",
    introduction:
      "Contenido editorial pendiente de desarrollo.",
    products: [
      products.find((product) => product.catalogId === "P001")!,
      products.find((product) => product.catalogId === "P003")!
    ],
    specifications: [],
    criteria: [],
    productAPros: [],
    productACons: [],
    productBPros: [],
    productBCons: [],
    recommendations: [],
    status: "candidate",
    publishedAt: "",
  }
];