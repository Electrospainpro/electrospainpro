export interface Store {
  id: string;
  name: string;
  website: string;
  logo: string;
  affiliateAvailable: boolean;
}

export const stores: Store[] = [
  {
    id: "amazon",
    name: "Amazon",
    website: "https://www.amazon.es",
    logo: "",
    affiliateAvailable: true,
  },
  {
    id: "manomano",
    name: "ManoMano",
    website: "https://www.manomano.es",
    logo: "",
    affiliateAvailable: true,
  },
  {
    id: "leroymerlin",
    name: "Leroy Merlin",
    website: "https://www.leroymerlin.es",
    logo: "",
    affiliateAvailable: true,
  },
  {
    id: "rs",
    name: "RS",
    website: "https://es.rs-online.com",
    logo: "",
    affiliateAvailable: true,
  },
  {
    id: "farnell",
    name: "Farnell",
    website: "https://es.farnell.com",
    logo: "",
    affiliateAvailable: true,
  },
  {
    id: "conrad",
    name: "Conrad",
    website: "https://www.conrad.com",
    logo: "",
    affiliateAvailable: false,
  },
  {
    id: "saltoki",
    name: "Saltoki",
    website: "https://www.saltoki.com",
    logo: "",
    affiliateAvailable: false,
  },
  {
    id: "sonepar",
    name: "Sonepar",
    website: "https://www.sonepar.es",
    logo: "",
    affiliateAvailable: false,
  },
];