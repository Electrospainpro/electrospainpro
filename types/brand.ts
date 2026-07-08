export interface Brand {
  id: number;

  name: string;

  slug: string;

  country: string;

  specialty: string;

  logo?: string;

  website?: string;

  founded?: number;

  description?: string;
}