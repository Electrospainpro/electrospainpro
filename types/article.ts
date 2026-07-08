export interface Article {
  id: number;

  title: string;

  slug: string;

  category: string;

  excerpt: string;

  content: string;

  author: string;

  publishedAt: string;

  updatedAt?: string;

  featuredImage?: string;

  tags: string[];
}