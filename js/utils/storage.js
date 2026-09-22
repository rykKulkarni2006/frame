/**
 * LOCAL STORAGE VAULT DATA LAYER
 * Student Learning Note: Encapsulates all browser localStorage operations.
 * Allows Lockly to save master password metadata and credential records persistently.
 */

import { INITIAL_ACCOUNTS } from '../data/initialAccounts.js';

const STORAGE_KEYS = {
  VAULT_META: 'lockly_vault_meta',
  ACCOUNTS: 'lockly_accounts'
};

/**
 * Load vault metadata (master password state & settings)
 */
export function getVaultMeta() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VAULT_META);
    return data ? JSON.parse(data) : { vaultCreated: false, masterPassword: '', autolock: 15 };
  } catch (err) {
    console.error('Error loading vault meta from localStorage:', err);
    return { vaultCreated: false, masterPassword: '', autolock: 15 };
  }
}

/**
 * Save vault metadata
 */
export function saveVaultMeta(meta) {
  try {
    localStorage.setItem(STORAGE_KEYS.VAULT_META, JSON.stringify(meta));
  } catch (err) {
    console.error('Error saving vault meta to localStorage:', err);
  }
}

/**
 * Load stored accounts from localStorage.
 * If vault is brand new and never initialized, seeds with INITIAL_ACCOUNTS.
 */
export function getStoredAccounts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (data !== null) {
      return JSON.parse(data);
    }
    // Seed initial mock accounts on first launch
    saveStoredAccounts(INITIAL_ACCOUNTS);
    return INITIAL_ACCOUNTS;
  } catch (err) {
    console.error('Error loading accounts from localStorage:', err);
    return INITIAL_ACCOUNTS;
  }
}

/**
 * Save accounts array to localStorage
 */
export function saveStoredAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Error saving accounts to localStorage:', err);
  }
}

/**
 * Clear all stored vault data and reset to initial defaults
 */
export function resetVaultStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.VAULT_META);
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS));
  } catch (err) {
    console.error('Error resetting vault storage:', err);
  }
}
