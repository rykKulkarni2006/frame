/**
 * DASHBOARD SCREEN COMPONENT (Screen 4)
 * Student Learning Note: Main password management dashboard displaying credential cards,
 * search filtering, category filters, quick action buttons (+ Add Account, Settings).
 */

import { renderAccountCard } from './AccountCard.js';
import { t } from '../i18n/translations.js';

export function renderDashboardScreen(state) {
  const { accounts, searchQuery, selectedCategory, unmaskedCards, lang = 'en' } = state;

  // Filter accounts by search query and category
  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = 
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.notes && acc.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = 
      selectedCategory === 'all' || acc.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return `
    <div class="container animate-fade-in" style="padding-top: 2rem; padding-bottom: 4rem;">
      
      <!-- Top Action Bar -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.75rem;">
        
        <div>
          <h2 style="font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
            ${t('myVault', lang)}
          </h2>
          <p style="font-size: 0.875rem; color: var(--text-muted);">
            ${t('showingAccounts', lang, { count: filteredAccounts.length, total: accounts.length })}
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-secondary" id="dash-settings-btn">
            ⚙️ <span>${t('settings', lang)}</span>
          </button>
          <button class="btn btn-primary" id="dash-add-account-btn">
            ➕ <span>${t('addAccountBtn', lang)}</span>
          </button>
        </div>

      </div>

      <!-- Search Bar & Category Filters -->
      <div class="card-panel" style="padding: 1.25rem; margin-bottom: 1.75rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;">
          
          <!-- Search Input -->
          <div style="flex: 1; min-width: 260px; position: relative;">
            <span style="position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">
              🔍
            </span>
            <input 
              type="text" 
              id="dash-search-input" 
              class="input-field" 
              placeholder="${t('searchPlaceholder', lang)}" 
              value="${searchQuery}" 
              style="padding-left: 2.5rem;"
            />
          </div>

          <!-- Category Pills -->
          <div style="display: flex; gap: 0.4rem; overflow-x: auto; padding-bottom: 2px;">
            <button class="category-pill ${selectedCategory === 'all' ? 'active' : ''}" data-cat="all">${t('allCat', lang)}</button>
            <button class="category-pill ${selectedCategory === 'social' ? 'active' : ''}" data-cat="social">${t('socialCat', lang)}</button>
            <button class="category-pill ${selectedCategory === 'developer' ? 'active' : ''}" data-cat="developer">${t('developerCat', lang)}</button>
            <button class="category-pill ${selectedCategory === 'personal' ? 'active' : ''}" data-cat="personal">${t('personalCat', lang)}</button>
          </div>

        </div>
      </div>

      <!-- Accounts Grid -->
      ${filteredAccounts.length > 0 ? `
        <div class="account-grid">
          ${filteredAccounts.map(acc => renderAccountCard(acc, !!unmaskedCards[acc.id])).join('')}
        </div>
      ` : `
        <div class="card-panel" style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-size: 1.1rem; margin-bottom: 0.35rem;">${t('noAccountsFound', lang)}</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            ${t('noAccountsDesc', lang)}
          </p>
          <button class="btn btn-primary" id="empty-add-btn">➕ ${t('addAccountNow', lang)}</button>
        </div>
      `}

    </div>

    <style>
      .category-pill {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color);
        color: var(--text-muted);
        padding: 0.45rem 0.9rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
        white-space: nowrap;
      }
      .category-pill:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-main);
      }
      .category-pill.active {
        background: var(--primary-light);
        border-color: var(--primary);
        color: var(--primary);
      }
    </style>
  `;
}

export function attachDashboardEvents(state, {
  onSearch,
  onCategorySelect,
  onToggleUnmask,
  onCopyPassword,
  onEditAccount,
  onDeleteAccount,
  onOpenAddModal,
  onOpenSettingsModal
}) {
  // Search Input
  const searchInput = document.getElementById('dash-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      onSearch(e.target.value);
    });
  }

  // Category Pills
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.cat;
      onCategorySelect(cat);
    });
  });

  // Action Buttons
  const addBtn = document.getElementById('dash-add-account-btn');
  if (addBtn) addBtn.addEventListener('click', onOpenAddModal);

  const emptyAddBtn = document.getElementById('empty-add-btn');
  if (emptyAddBtn) emptyAddBtn.addEventListener('click', onOpenAddModal);

  const settingsBtn = document.getElementById('dash-settings-btn');
  if (settingsBtn) settingsBtn.addEventListener('click', onOpenSettingsModal);

  // Toggle View Buttons on Cards
  const viewBtns = document.querySelectorAll('.toggle-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      onToggleUnmask(id);
    });
  });

  // Copy Buttons on Cards
  const copyBtns = document.querySelectorAll('.copy-pass-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const password = btn.dataset.password;
      const id = btn.dataset.id;
      const account = state.accounts.find(a => a.id === id);
      onCopyPassword(password, account ? account.name : 'Account');
    });
  });

  // Edit Buttons
  const editBtns = document.querySelectorAll('.edit-account-btn');
  editBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (onEditAccount) onEditAccount(id);
    });
  });

  // Delete Buttons
  const deleteBtns = document.querySelectorAll('.delete-account-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      onDeleteAccount(id);
    });
  });
}
