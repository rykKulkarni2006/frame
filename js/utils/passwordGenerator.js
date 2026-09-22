/**
 * PASSWORD GENERATOR & STRENGTH EVALUATOR UTILITY
 * Student Learning Note: Cryptographic random generation uses window.crypto.getRandomValues
 * rather than Math.random() because Math.random() is predictable and unsuitable for security.
 */

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generate a cryptographically secure random password based on options
 */
export function generatePassword({
  length = 16,
  includeUppercase = true,
  includeLowercase = true,
  includeNumbers = true,
  includeSymbols = true
} = {}) {
  let charPool = '';
  if (includeUppercase) charPool += UPPERCASE;
  if (includeLowercase) charPool += LOWERCASE;
  if (includeNumbers) charPool += NUMBERS;
  if (includeSymbols) charPool += SYMBOLS;

  // Fallback to lowercase if nothing selected
  if (!charPool) charPool = LOWERCASE;

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charPool[array[i] % charPool.length];
  }

  return password;
}

/**
 * Evaluate password strength score (0 to 4)
 * Returns object with score, label, and CSS class indicator
 */
export function evaluateStrength(password) {
  if (!password) return { score: 0, label: 'Empty', class: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 1, label: 'Weak', class: 'active-weak' };
  if (score <= 4) return { score: 2, label: 'Medium', class: 'active-medium' };
  return { score: 3, label: 'Vault Grade (Strong)', class: 'active-strong' };
}
