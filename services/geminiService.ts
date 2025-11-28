import { GoogleGenAI, Type } from "@google/genai";

// We use the available environment variable for the API key
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export interface GeneratedBookDetails {
  description: string;
  genre: string;
  suggestedPrice: number;
}

/**
 * Generates a description, genre, and estimated price for a book based on title and author.
 */
export const generateBookDetails = async (title: string, author: string): Promise<GeneratedBookDetails> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return {
      description: "API Key missing. This is a placeholder description.",
      genre: "General",
      suggestedPrice: 19.99
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a compelling short description (max 50 words), a fitting genre, and a suggested realistic price (number only) for a book titled "${title}" by author "${author}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            genre: { type: Type.STRING },
            suggestedPrice: { type: Type.NUMBER },
          },
          required: ["description", "genre", "suggestedPrice"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedBookDetails;
    }
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return {
      description: "An intriguing book waiting to be read.",
      genre: "Fiction",
      suggestedPrice: 20.00
    };
  }
};
