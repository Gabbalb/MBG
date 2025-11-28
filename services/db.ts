
import { Book, Subscriber } from '../types';
import { INITIAL_BOOKS } from '../constants';
import { validatePrice, sanitizeInput } from '../utils/security';

// Keys for persistence
const STORAGE_KEYS = {
  BOOKS: 'lumina_library_books_v1',
  SUBSCRIBERS: 'lumina_library_subs_v1',
  COURSES: 'lumina_library_courses_v1' // Future implementation
};

// Simulation of a Secure Database Interface
export const db = {
  /**
   * Initializes the database with seed data if empty.
   */
  async init() {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const existingBooks = localStorage.getItem(STORAGE_KEYS.BOOKS);
    if (!existingBooks) {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(INITIAL_BOOKS));
    }
  },

  /**
   * Retrieves all books.
   */
  async getBooks(): Promise<Book[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Database Read Error", e);
      return [];
    }
  },

  /**
   * Saves or Updates a book with strict validation.
   */
  async saveBook(bookData: Partial<Book>): Promise<Book> {
    const books = await this.getBooks();
    
    // VALIDATION & SANITIZATION (Critical for Security)
    const safeBook: Book = {
      id: bookData.id || Date.now().toString(),
      title: sanitizeInput(bookData.title || ''),
      author: sanitizeInput(bookData.author || ''),
      description: sanitizeInput(bookData.description || ''), // In a real app, allow safe HTML only
      genre: sanitizeInput(bookData.genre || 'General'),
      price: validatePrice(bookData.price || 0),
      coverUrl: bookData.coverUrl || '', // URL validation could be added here
    };

    if (!safeBook.title || !safeBook.author) {
      throw new Error("Validation Failed: Title and Author are required.");
    }

    if (bookData.id) {
      // Update
      const index = books.findIndex(b => b.id === bookData.id);
      if (index !== -1) {
        books[index] = safeBook;
      } else {
        books.unshift(safeBook);
      }
    } else {
      // Create
      books.unshift(safeBook);
    }

    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    return safeBook;
  },

  /**
   * Removes a book by ID.
   */
  async deleteBook(id: string): Promise<void> {
    const books = await this.getBooks();
    const filtered = books.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(filtered));
  },

  // --- Subscriber Management ---

  async getSubscribers(): Promise<Subscriber[]> {
    const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    return data ? JSON.parse(data) : [];
  },

  async addSubscriber(email: string): Promise<Subscriber> {
    const subs = await this.getSubscribers();
    const cleanEmail = sanitizeInput(email);
    
    // Check duplicates
    if (subs.some(s => s.email === cleanEmail)) {
      throw new Error("Email already subscribed");
    }

    const newSub: Subscriber = {
      id: Date.now().toString(),
      email: cleanEmail,
      joinedAt: new Date().toISOString()
    };

    subs.push(newSub);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));
    return newSub;
  },

  async removeSubscriber(id: string): Promise<void> {
    const subs = await this.getSubscribers();
    const filtered = subs.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(filtered));
  }
};
