
// Security Utilities

/**
 * Generates a SHA-256 hash of the input string.
 * Used to verify passwords without storing them in plain text.
 */
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Sanitizes a string to prevent XSS attacks.
 * Removes potentially dangerous HTML tags and attributes.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates that a price is a valid number and positive.
 * Prevents logic injection via numeric fields.
 */
export function validatePrice(price: string | number): number {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num) || num < 0) {
    return 0;
  }
  return parseFloat(num.toFixed(2));
}
