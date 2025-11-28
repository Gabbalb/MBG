
// Mock service replacing Gemini implementation
// This file is kept to maintain import consistency in AdminModal

export interface GeneratedBookDetails {
  description: string;
  genre: string;
  suggestedPrice: number;
}

/**
 * Generates a description, genre, and estimated price for a book based on title and author.
 * This is a mock implementation that does not use the Gemini API.
 */
export const generateBookDetails = async (title: string, author: string): Promise<GeneratedBookDetails> => {
  // Simulate network delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 800));

  const genres = ['Fiction', 'Mystery', 'Science Fiction', 'Romance', 'History', 'Thriller', 'Biography', 'Fantasy'];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  const randomPrice = parseFloat((Math.random() * (45 - 12) + 12).toFixed(2));

  return {
    description: `[Auto-Generated] A captivating story titled "${title}" by ${author}. This is a placeholder description generated locally to simulate content filling without an external API connection.`,
    genre: randomGenre,
    suggestedPrice: randomPrice
  };
};
