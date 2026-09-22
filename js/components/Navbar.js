/**
 * NAVBAR COMPONENT
 * Student Learning Note: Encapsulates header rendering and navigation actions.
 */

import { t } from '../i18n/translations.js';

export function renderNavbar(state, { onNavigate, onLock, onOpenSettings, onChangeLanguage, onPromptLogout, onOpenProfile, onOpenSecurity }) {
  const isUnlocked = state.currentScreen === 'dashboard';
  const lang = state.lang || 'en';
  const username = state.currentUser ? state.currentUser.username : 'Alex Dev';
  const userEmail = state.currentUser ? state.currentUser.email : 'alex@example.com';

  return `
    <nav class="navbar">
      <div class="container navbar-inner">
        <div class="brand-logo" id="nav-brand-logo">
          <div class="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <span>Lockly</span>
        </div>

        ${isUnlocked ? `
          <div class="navbar-actions">
            <!-- Language Selector inside Authenticated Dashboard -->
            <select id="nav-language-select" class="nav-lang-select" title="Change Language">
              <option value="en" ${lang === 'en' ? 'selected' : ''}>🌐 EN</option>
              <option value="hi" ${lang === 'hi' ? 'selected' : ''}>🇮🇳 HI</option>
              <option value="mr" ${lang === 'mr' ? 'selected' : ''}>🇮🇳 MR</option>
            </select>

            <span class="status-badge unlocked">
              <span class="status-dot"></span>
              <span>${t('vaultUnlocked', lang)}</span>
            </span>

            <button class="btn btn-secondary" id="nav-settings-btn" title="Vault Settings">
              ⚙️ <span>${t('settings', lang)}</span>
            </button>

            <button class="btn btn-danger" id="nav-lock-btn" title="Lock Vault">
              🔒 <span>${t('lockVault', lang)}</span>
            </button>

            <!-- User / Profile Menu -->
            <div class="profile-menu-container">
              <button class="profile-trigger-btn" id="nav-profile-menu-btn" title="User Profile Menu">
                <span>👤</span>
                <span>${username}</span>
                <span style="font-size: 0.65rem; opacity: 0.7;">▼</span>
              </button>

              <div class="profile-dropdown-menu" id="nav-profile-dropdown">
                <div class="profile-menu-header">
                  <span class="profile-menu-name">${username}</span>
                  <span class="profile-menu-role">${userEmail}</span>
                </div>
                <button type="button" class="profile-menu-item" id="dropdown-profile-btn">
                  <span>👤</span> ${t('profile', lang)}
                </button>
                <button type="button" class="profile-menu-item" id="dropdown-settings-btn">
                  <span>⚙️</span> ${t('settings', lang)}
                </button>
                <button type="button" class="profile-menu-item" id="dropdown-security-btn">
                  <span>🛡️</span> ${t('securityCenter', lang)}
                </button>
                <div class="dropdown-divider"></div>
                <button type="button" class="profile-menu-item danger" id="dropdown-logout-btn">
                  <span>🚪</span> ${t('logout', lang)}
                </button>
              </div>
            </div>
          </div>
        ` : `
          <!-- When locked or on login/register/recovery screens, hide Settings completely -->
          <div class="navbar-actions">
            <span class="status-badge locked">
              <span class="status-dot"></span>
              <span>${t('vaultLocked', lang)}</span>
            </span>
          </div>
        `}
      </div>
    </nav>
  `;
}

export function attachNavbarEvents(state, {
  onNavigate,
  onLock,
  onOpenSettings,
  onChangeLanguage,
  onPromptLogout,
  onOpenProfile,
  onOpenSecurity
}) {
  const brand = document.getElementById('nav-brand-logo');
  if (brand) {
    brand.addEventListener('click', () => {
      if (state.vaultCreated && state.isUnlocked) {
        onNavigate('dashboard');
      } else if (state.vaultCreated) {
        onNavigate('unlock');
      } else {
        onNavigate('welcome');
      }
    });
  }

  // Language selector
  const langSelect = document.getElementById('nav-language-select');
  if (langSelect && onChangeLanguage) {
    langSelect.addEventListener('change', (e) => {
      onChangeLanguage(e.target.value);
    });
  }

  const lockBtn = document.getElementById('nav-lock-btn');
  if (lockBtn) {
    lockBtn.addEventListener('click', onLock);
  }

  const settingsBtn = document.getElementById('nav-settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', onOpenSettings);
  }

  // Profile Menu Dropdown logic
  const profileTrigger = document.getElementById('nav-profile-menu-btn');
  const profileDropdown = document.getElementById('nav-profile-dropdown');

  if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target) && e.target !== profileTrigger) {
        profileDropdown.classList.remove('active');
      }
    });

    const dropProfileBtn = document.getElementById('dropdown-profile-btn');
    if (dropProfileBtn && onOpenProfile) {
      dropProfileBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        onOpenProfile();
      });
    }

    const dropSettingsBtn = document.getElementById('dropdown-settings-btn');
    if (dropSettingsBtn && onOpenSettings) {
      dropSettingsBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        onOpenSettings();
      });
    }

    const dropSecurityBtn = document.getElementById('dropdown-security-btn');
    if (dropSecurityBtn && onOpenSecurity) {
      dropSecurityBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        onOpenSecurity();
      });
    }

    const dropLogoutBtn = document.getElementById('dropdown-logout-btn');
    if (dropLogoutBtn && onPromptLogout) {
      dropLogoutBtn.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
        onPromptLogout();
      });
    }
  }
}
