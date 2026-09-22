/**
 * SETTINGS MODAL COMPONENT (Customization & Preferences)
 * Student Learning Note: Renders Theme picker, Light/Dark mode toggle,
 * Language selector (EN, HI, MR), live category stats breakdown, and storage reset.
 */

import { t } from '../i18n/translations.js';

export function renderSettingsModal(isOpen, state) {
  const { lang, theme, mode, accounts } = state;

  const socialCount = accounts.filter(a => a.category === 'social').length;
  const devCount = accounts.filter(a => a.category === 'developer').length;
  const personalCount = accounts.filter(a => a.category === 'personal').length;

  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="settings-modal">
      <div class="modal-container animate-fade-in">
        
        <div class="modal-header">
          <h3 class="modal-title" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>⚙️</span> ${t('settingsTitle', lang)}
          </h3>
          <button class="btn-icon-only" id="close-settings-modal" title="Close Modal">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Customization Section: Language -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${t('languageLabel', lang)}</label>
            <select id="setting-language" class="input-field" style="cursor: pointer; font-weight: 600;">
              <option value="en" ${lang === 'en' ? 'selected' : ''}>🌐 English (US)</option>
              <option value="hi" ${lang === 'hi' ? 'selected' : ''}>🇮🇳 Hindi (हिन्दी)</option>
              <option value="mr" ${lang === 'mr' ? 'selected' : ''}>🇮🇳 Marathi (मराठी)</option>
            </select>
          </div>

          <!-- Customization Section: Appearance Mode (Dark / Light) -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${t('modeLabel', lang)}</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              <button 
                type="button" 
                class="btn ${mode === 'dark' ? 'btn-primary' : 'btn-secondary'}" 
                id="mode-dark-btn"
                style="padding: 0.6rem;"
              >
                ${t('darkMode', lang)}
              </button>
              <button 
                type="button" 
                class="btn ${mode === 'light' ? 'btn-primary' : 'btn-secondary'}" 
                id="mode-light-btn"
                style="padding: 0.6rem;"
              >
                ${t('lightMode', lang)}
              </button>
            </div>
          </div>

          <!-- Customization Section: Theme Accent Picker -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">${t('themeLabel', lang)}</label>
            <select id="setting-theme" class="input-field" style="cursor: pointer; font-weight: 600;">
              <option value="emerald" ${theme === 'emerald' ? 'selected' : ''}>🟢 ${t('themeEmerald', lang)}</option>
              <option value="sapphire" ${theme === 'sapphire' ? 'selected' : ''}>🔵 ${t('themeSapphire', lang)}</option>
              <option value="ruby" ${theme === 'ruby' ? 'selected' : ''}>🔴 ${t('themeRuby', lang)}</option>
              <option value="violet" ${theme === 'violet' ? 'selected' : ''}>🟣 ${t('themeViolet', lang)}</option>
              <option value="gold" ${theme === 'gold' ? 'selected' : ''}>🟡 ${t('themeGold', lang)}</option>
            </select>
          </div>

          <!-- Account & Security Section -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem;">
            <h4 style="font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between;">
              <span>🛡️ ${t('accountSecurity', lang)}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 500;">Local AES-256</span>
            </h4>

            <!-- Profile Info Snapshot -->
            <div style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.5;">
              <div><strong>User:</strong> <span style="color: var(--text-main);">${state.currentUser ? state.currentUser.username : 'Alex Developer'}</span></div>
              <div><strong>Email:</strong> <span style="color: var(--text-main);">${state.currentUser ? state.currentUser.email : 'alex@example.com'}</span></div>
            </div>

            <!-- Change Master Password Accordion Toggle -->
            <div style="margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-secondary" id="toggle-change-pass-btn" style="width: 100%; font-size: 0.8rem; padding: 0.45rem;">
                🔑 ${t('changePassword', lang)}
              </button>

              <div id="change-pass-panel" style="display: none; margin-top: 0.65rem; padding: 0.75rem; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px;">
                <div class="form-group" style="margin-bottom: 0.5rem;">
                  <label class="form-label" style="font-size: 0.75rem;">Current Password</label>
                  <input type="password" id="cp-current" class="input-field mono" style="font-size: 0.85rem; padding: 0.45rem 0.65rem;" placeholder="Current master pass..." />
                </div>
                <div class="form-group" style="margin-bottom: 0.75rem;">
                  <label class="form-label" style="font-size: 0.75rem;">New Master Password (8+ chars)</label>
                  <input type="password" id="cp-new" class="input-field mono" style="font-size: 0.85rem; padding: 0.45rem 0.65rem;" placeholder="New strong pass..." />
                </div>
                <div id="cp-msg" style="display: none; font-size: 0.75rem; margin-bottom: 0.5rem;"></div>
                <button type="button" class="btn btn-primary" id="save-new-pass-btn" style="width: 100%; font-size: 0.8rem; padding: 0.45rem;">
                  Update Master Password
                </button>
              </div>
            </div>

            <!-- Log Out Action in Settings -->
            <button type="button" class="btn btn-danger" id="settings-logout-btn" style="width: 100%; font-size: 0.85rem; padding: 0.5rem;">
              🚪 ${t('logout', lang)}
            </button>
          </div>

          <!-- Vault Stats Panel -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem;">
            <h4 style="font-size: 0.85rem; color: var(--primary); margin-bottom: 0.55rem; text-transform: uppercase; letter-spacing: 0.05em;">
              ${t('statsTitle', lang)}
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; margin-bottom: 0.75rem;">
              <div>
                <span style="color: var(--text-muted);">${t('totalStored', lang)}</span>
                <strong style="display: block; font-size: 1.15rem; color: var(--text-main);">${accounts.length} ${t('credentialsCount', lang)}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted);">${t('vaultLocked', lang)} / Unlocked:</span>
                <strong style="display: block; font-size: 0.95rem; color: var(--success); margin-top: 0.2rem;">
                  ✓ ${state.isUnlocked ? 'Unlocked' : 'Locked'}
                </strong>
              </div>
            </div>

            <!-- Category Breakdown Pills -->
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; font-size: 0.75rem;">
              <span style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; padding: 0.2rem 0.5rem; border-radius: 6px;">
                ${t('socialCat', lang)}: ${socialCount}
              </span>
              <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 0.2rem 0.5rem; border-radius: 6px;">
                ${t('developerCat', lang)}: ${devCount}
              </span>
              <span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; padding: 0.2rem 0.5rem; border-radius: 6px;">
                ${t('personalCat', lang)}: ${personalCount}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
            <button class="btn btn-danger" id="reset-vault-btn" style="font-size: 0.8rem; padding: 0.5rem 0.85rem;">
              ${t('resetStorageBtn', lang)}
            </button>
            <button class="btn btn-secondary" id="done-settings-btn">${t('closeBtn', lang)}</button>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachSettingsEvents(state, {
  onCloseModal,
  onChangeLanguage,
  onChangeMode,
  onChangeTheme,
  onResetVault,
  onPromptLogout,
  onChangeMasterPassword
}) {
  const modal = document.getElementById('settings-modal');
  const closeBtn = document.getElementById('close-settings-modal');
  const doneBtn = document.getElementById('done-settings-btn');
  const resetBtn = document.getElementById('reset-vault-btn');
  const langSelect = document.getElementById('setting-language');
  const themeSelect = document.getElementById('setting-theme');
  const modeDarkBtn = document.getElementById('mode-dark-btn');
  const modeLightBtn = document.getElementById('mode-light-btn');
  const logoutBtn = document.getElementById('settings-logout-btn');
  const toggleCpBtn = document.getElementById('toggle-change-pass-btn');
  const cpPanel = document.getElementById('change-pass-panel');
  const saveCpBtn = document.getElementById('save-new-pass-btn');

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', onCloseModal);
  if (doneBtn) doneBtn.addEventListener('click', onCloseModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) onCloseModal();
    });
  }

  // Language Change
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      onChangeLanguage(e.target.value);
    });
  }

  // Theme Change
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      onChangeTheme(e.target.value);
    });
  }

  // Mode Change
  if (modeDarkBtn) {
    modeDarkBtn.addEventListener('click', () => {
      onChangeMode('dark');
    });
  }

  if (modeLightBtn) {
    modeLightBtn.addEventListener('click', () => {
      onChangeMode('light');
    });
  }

  // Toggle Change Password Panel
  if (toggleCpBtn && cpPanel) {
    toggleCpBtn.addEventListener('click', () => {
      cpPanel.style.display = cpPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Save New Master Password
  if (saveCpBtn && onChangeMasterPassword) {
    saveCpBtn.addEventListener('click', () => {
      const current = document.getElementById('cp-current').value.trim();
      const newPass = document.getElementById('cp-new').value.trim();
      const msg = document.getElementById('cp-msg');

      if (!newPass || newPass.length < 8) {
        if (msg) {
          msg.textContent = 'New password must be at least 8 characters.';
          msg.style.color = 'var(--danger)';
          msg.style.display = 'block';
        }
        return;
      }

      const success = onChangeMasterPassword(current, newPass);
      if (success) {
        if (msg) {
          msg.textContent = 'Master password updated successfully!';
          msg.style.color = 'var(--primary)';
          msg.style.display = 'block';
        }
        document.getElementById('cp-current').value = '';
        document.getElementById('cp-new').value = '';
      } else {
        if (msg) {
          msg.textContent = 'Current master password does not match.';
          msg.style.color = 'var(--danger)';
          msg.style.display = 'block';
        }
      }
    });
  }

  // Log Out from Settings
  if (logoutBtn && onPromptLogout) {
    logoutBtn.addEventListener('click', () => {
      onCloseModal();
      onPromptLogout();
    });
  }

  // Reset Storage
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the mock vault data back to initial defaults?')) {
        onResetVault();
      }
    });
  }
}
