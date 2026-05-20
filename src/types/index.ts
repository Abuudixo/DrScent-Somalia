export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  category: 'diffusers' | 'oils' | 'portable' | 'bundles';
  details: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  sizes: string[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
}
