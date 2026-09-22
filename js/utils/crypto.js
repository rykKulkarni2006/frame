/**
 * CRYPTOGRAPHIC HELPERS
 * Student Learning Note: Uses browser Web Crypto API (window.crypto.subtle)
 * to securely hash user passwords with SHA-256 rather than storing plain text.
 */

/**
 * Hash string with SHA-256 asynchronously
 */
export async function hashPassword(password) {
  if (!password) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
