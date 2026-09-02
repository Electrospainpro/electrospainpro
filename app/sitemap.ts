import type { MetadataRoute } from "next";

import { calculators } from "@/data/calculators";
import { siteConfig } from "@/config/site";

const availableCalculatorSlugs = new Set([
  "caida-tension",
  "seccion-cable",
  "awg-mm2",
  "ley-de-ohm",
  "potencia-monofasica",
  "potencia-trifasica",
]);

const staticRoutes = [
  "/",
  "/calculadoras",
  "/productos",
  "/comparativa",
  "/marcas",
  "/categorias",
  "/electricidad",
  "/telecomunicaciones",
  "/fotovoltaica",
  "/herramientas",
  "/instrumentacion",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap =
    staticRoutes.map((path) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.7,
    }));

  const calculatorEntries: MetadataRoute.Sitemap =
    calculators
      .filter(
        (calculator) =>
          calculator.release === "V1" &&
          availableCalculatorSlugs.has(
            calculator.slug,
          ),
      )
      .map((calculator) => ({
        url: new URL(
          `/calculadoras/${calculator.slug}`,
          siteConfig.url,
        ).toString(),
        lastModified: now,
        changeFrequency: "monthly",
        priority:
          calculator.priority === "Muy alta"
            ? 0.9
            : calculator.priority === "Alta"
              ? 0.8
              : 0.7,
      }));

  return [
    ...staticEntries,
    ...calculatorEntries,
  ];
}