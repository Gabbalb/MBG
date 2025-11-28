export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverUrl: string;
  genre: string;
}

export interface BookFormData {
  title: string;
  author: string;
  price: string;
  description: string;
  coverUrl: string;
  genre: string;
}

export interface Subscriber {
  id: string;
  email: string;
  joinedAt: string;
}

export type ViewMode = 'home' | 'admin';