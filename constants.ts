import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Silent Ocean',
    author: 'Elena Fisher',
    price: 24.99,
    genre: 'Mystery',
    coverUrl: 'https://picsum.photos/seed/ocean/400/600',
    description: 'A deep dive into the mysteries of the Atlantic, where a research team discovers something that should have stayed hidden forever.'
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    author: 'Marcus J. Reynolds',
    price: 18.50,
    genre: 'Science Fiction',
    coverUrl: 'https://picsum.photos/seed/echoes/400/600',
    description: 'In a world where memories can be traded like currency, one man fights to keep the only thing that truly belongs to him.'
  },
  {
    id: '3',
    title: 'Culinary Secrets',
    author: 'Julia Childers',
    price: 32.00,
    genre: 'Cooking',
    coverUrl: 'https://picsum.photos/seed/food/400/600',
    description: 'Master the art of French cooking with a modern twist. 100 recipes that will transform your kitchen into a bistro.'
  },
  {
    id: '4',
    title: 'Lost in the Woods',
    author: 'Sarah Walker',
    price: 15.99,
    genre: 'Thriller',
    coverUrl: 'https://picsum.photos/seed/woods/400/600',
    description: 'A camping trip goes wrong when the compass stops working and the shadows start moving on their own.'
  }
];