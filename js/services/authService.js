/**
 * USER AUTHENTICATION & RECOVERY SERVICE
 * Student Learning Note: Manages user account registration, password hashing (SHA-256),
 * multi-identifier login (username/email/phone), and recovery lookup.
 */

import { hashPassword } from '../utils/crypto.js';

const USERS_KEY = 'lockly_registered_users';

// Pre-seeded verified demo user for immediate prototype testing
// Password: AlexPassword!2026
const DEFAULT_DEMO_USER = {
  id: 'usr-demo-001',
  username: 'alex_developer',
  email: 'alex@example.com',
  phone: '9876543210',
  passwordHash: '26cc20e6a21ad048f7f401ce85363eeab266bbfbe8c921a1f573dbef32ff3bb7',
  verifiedRecoveryMethods: ['email', 'phone'],
  createdAt: '2026-09-01T10:00:00.000Z'
};

/**
 * Get all registered user accounts
 */
export function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(USERS_KEY);
    if (data) {
      const users = JSON.parse(data);
      if (Array.isArray(users) && users.length > 0) {
        return users;
      }
    }
    // Seed default demo user if storage is empty
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
    return [DEFAULT_DEMO_USER];
  } catch (err) {
    console.error('Error reading registered users:', err);
    return [DEFAULT_DEMO_USER];
  }
}

/**
 * Register a new user account (Requires Username, Password, and Email OR Phone)
 */
export async function registerUser({ username, email, phone, password }) {
  const users = getRegisteredUsers();
  const cleanUser = username.trim();
  const cleanEmail = email ? email.trim().toLowerCase() : '';
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  if (!cleanEmail && !cleanPhone) {
    throw new Error('Please provide either a valid email address or mobile phone number.');
  }

  // Check uniqueness of username, email, and phone
  const existingUser = users.find(u => {
    const matchName = u.username.toLowerCase() === cleanUser.toLowerCase();
    const matchEmail = cleanEmail && u.email && u.email.toLowerCase() === cleanEmail;
    const matchPhone = cleanPhone && u.phone && u.phone.replace(/\D/g, '') === cleanPhone;
    return matchName || matchEmail || matchPhone;
  });

  if (existingUser) {
    throw new Error('An account with this username, email, or mobile number already exists.');
  }

  const passwordHash = await hashPassword(password);

  const verifiedMethods = [];
  if (cleanEmail) verifiedMethods.push('email');
  if (cleanPhone) verifiedMethods.push('phone');

  const newUser = {
    id: 'usr-' + Date.now(),
    username: cleanUser,
    email: cleanEmail,
    phone: cleanPhone,
    passwordHash,
    verifiedRecoveryMethods: verifiedMethods,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return newUser;
}

/**
 * Authenticate user with username/email/phone + password
 */
export async function authenticateUser(identifier, password) {
  const users = getRegisteredUsers();
  const lowerId = identifier.trim().toLowerCase();
  const digitsOnly = identifier.replace(/\D/g, '');

  const user = users.find(u => {
    const matchName = u.username.toLowerCase() === lowerId;
    const matchEmail = u.email && u.email.toLowerCase() === lowerId;
    const matchPhone = digitsOnly && u.phone && u.phone.replace(/\D/g, '') === digitsOnly;
    return matchName || matchEmail || matchPhone;
  });

  if (!user) {
    return null;
  }

  const inputHash = await hashPassword(password);
  if (user.passwordHash === inputHash) {
    return user;
  }

  return null;
}

/**
 * Find user account by recovery input (Email address or Mobile number)
 */
export function findAccountForRecovery(recoveryInput) {
  const users = getRegisteredUsers();
  const input = recoveryInput.trim();

  // If input contains @, match by email
  if (input.includes('@')) {
    const lowerEmail = input.toLowerCase();
    return users.find(u => u.email && u.email.toLowerCase() === lowerEmail) || null;
  }

  // Otherwise, match digits against phone number
  const digits = input.replace(/\D/g, '');
  if (digits.length >= 7) {
    return users.find(u => u.phone && u.phone.replace(/\D/g, '').endsWith(digits.slice(-10))) || null;
  }

  return null;
}

/**
 * Update user account password after successful OTP identity verification
 */
export async function updateUserPassword(userId, newPassword) {
  const users = getRegisteredUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    throw new Error('User account not found.');
  }

  const newHash = await hashPassword(newPassword);
  users[index].passwordHash = newHash;
  users[index].updatedAt = new Date().toISOString();

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}
