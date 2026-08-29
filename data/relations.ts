import { CatalogRelation } from "@/types/relations";

/**
 * Relaciones del catálogo ElectroSpainPro.
 *
 * Fuente: catálogo implantable V21.
 */
export const relations: CatalogRelation[] = [
  {
    sourceId: "P001",
    targetId: "P002",
    type: "variant",
    editorialReason: "1P vs 1P+N",
  },
  {
    sourceId: "P001",
    targetId: "P003",
    type: "comparison",
    editorialReason: "Schneider vs Hager C16",
  },
  {
    sourceId: "P002",
    targetId: "P003",
    type: "comparison",
    editorialReason: "Schneider 1P+N vs Hager 1P",
  },
  {
    sourceId: "P004",
    targetId: "P005",
    type: "related",
    editorialReason: "Multímetro vs pinza",
  },
  {
    sourceId: "P005",
    targetId: "P006",
    type: "comparison",
    editorialReason: "Fluke 323 vs 325",
  },
  {
    sourceId: "P004",
    targetId: "P006",
    type: "related",
    editorialReason: "Instrumentación eléctrica",
  },
];
