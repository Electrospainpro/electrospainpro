import type {
  MerchantInfo,
} from "@/types/offer";

/**
 * Merchants de ElectroSpainPro.
 *
 * Este catálogo es independiente de las ofertas.
 *
 * Una tienda puede existir en el sistema aunque
 * todavía no tengamos ninguna oferta de ella.
 */
export const merchants: MerchantInfo[] = [
  {
    id: "amazon",
    name: "Amazon",
    type: "affiliate",
    country: "ES",
    website: "https://www.amazon.es",
    affiliateAvailable: true,
    active: true,
    notes:
      "Marketplace prioritario para monetización mediante afiliación.",
  },

  {
    id: "pccomponentes",
    name: "PcComponentes",
    type: "affiliate",
    country: "ES",
    website: "https://www.pccomponentes.com",
    affiliateAvailable: true,
    active: true,
    notes:
      "Merchant especialmente interesante para la futura categoría de informática.",
  },

  {
    id: "manomano",
    name: "ManoMano",
    type: "affiliate",
    country: "ES",
    website: "https://www.manomano.es",
    affiliateAvailable: true,
    active: true,
    notes:
      "Marketplace relevante para herramientas, electricidad y bricolaje.",
  },

  {
    id: "leroymerlin",
    name: "Leroy Merlin",
    type: "affiliate",
    country: "ES",
    website: "https://www.leroymerlin.es",
    affiliateAvailable: true,
    active: true,
    notes:
      "Retailer relevante para material eléctrico, herramientas y hogar.",
  },

  {
    id: "rs",
    name: "RS",
    type: "affiliate",
    country: "ES",
    website: "https://es.rs-online.com",
    affiliateAvailable: true,
    active: true,
    notes:
      "Distribuidor profesional especialmente relevante para electricidad e instrumentación.",
  },

  {
    id: "farnell",
    name: "Farnell",
    type: "affiliate",
    country: "ES",
    website: "https://es.farnell.com",
    affiliateAvailable: true,
    active: true,
    notes:
      "Distribuidor profesional especialmente interesante para electrónica e instrumentación.",
  },

  {
    id: "latiendadeelectricidad",
    name: "La Tienda de Electricidad",
    type: "commercial",
    country: "ES",
    website:
      "https://www.latiendadeelectricidad.com",
    affiliateAvailable: false,
    active: true,
    notes:
      "Distribuidor especializado detectado durante la captura del catálogo. Pendiente de estudiar posibles acuerdos comerciales o afiliación.",
  },
];