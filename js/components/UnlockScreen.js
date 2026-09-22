/**
 * LOGIN / UNLOCK SCREEN COMPONENT (Screen 3)
 * Student Learning Note: Screen presented when returning to an existing locked vault.
 * Requires master password verification to access dashboard credentials.
 */

import { t } from '../i18n/translations.js';

export function renderUnlockScreen(state) {
  const lang = state.lang || 'en';

  return `
    <div class="container animate-fade-in" style="padding-top: 3.5rem; padding-bottom: 4rem;">
      <div style="max-width: 440px; margin: 0 auto;">
        
        <div class="card-panel auth-card" style="text-align: center;">
          
          <!-- Modern Security Lock Visual -->
          <div class="lock-visual-container">
            <div class="lock-visual-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2.5" ry="2.5"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16.5" r="1.5" fill="currentColor"></circle>
                <path d="M12 18v1.5"></path>
              </svg>
            </div>
            <div class="lock-visual-badge">
              <span class="lock-visual-dot"></span>
              <span>LOCKED VAULT</span>
            </div>
          </div>

          <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">${t('unlockTitle', lang)}</h2>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.75rem;">
            ${t('unlockSubtitle', lang)}
          </p>

          <form id="unlock-form" style="text-align: left;">
            
            <!-- Master Password Input -->
            <div class="form-group">
              <label class="form-label" for="unlock-pass">${t('passwordLabel', lang)}</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="unlock-pass" 
                  class="input-field mono" 
                  placeholder="Enter master password..." 
                  required 
                  autofocus
                />
                <button type="button" class="input-icon-btn" id="toggle-unlock-pass" title="Toggle visibility">
                  👁️
                </button>
              </div>
              <div id="unlock-error" style="color: var(--danger); font-size: 0.8rem; margin-top: 0.4rem; display: none;">
                ${t('unlockErrorMsg', lang)}
              </div>
            </div>

            <!-- Unlock CTA -->
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem; margin-top: 0.5rem;">
              ${t('unlockSubmitBtn', lang)}
            </button>

          </form>

          <!-- Navigation Options -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; font-size: 0.85rem;">
            <a href="#" id="unlock-goto-login-btn" style="color: var(--text-muted); text-decoration: none; font-weight: 600;">
              ← ${t('backToLogin', lang)}
            </a>
            <a href="#" id="unlock-goto-forgot-btn" style="color: var(--primary); text-decoration: none; font-weight: 600;">
              ${t('forgotPasswordLink', lang)}
            </a>
          </div>

          <!-- Prototype Hint Box -->
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.775rem; color: var(--text-dark);">
            💡 <em>Prototype Mode:</em> Enter the master password you created, or any password with 8+ characters to test the unlock flow.
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachUnlockEvents(state, { onUnlock, onGotoLogin, onGotoForgot }) {
  const form = document.getElementById('unlock-form');
  const passInput = document.getElementById('unlock-pass');
  const toggleBtn = document.getElementById('toggle-unlock-pass');
  const errorMsg = document.getElementById('unlock-error');
  const gotoLoginBtn = document.getElementById('unlock-goto-login-btn');
  const gotoForgotBtn = document.getElementById('unlock-goto-forgot-btn');

  if (gotoForgotBtn && onGotoForgot) {
    gotoForgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoForgot();
    });
  }

  // Toggle Visibility
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Go to Login
  if (gotoLoginBtn && onGotoLogin) {
    gotoLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoLogin();
    });
  }

  // Submit Password
  if (form && passInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = passInput.value.trim();

      // Check against stored master password or fallback for prototype
      if (entered === state.masterPassword || entered.length >= 8) {
        if (errorMsg) errorMsg.style.display = 'none';
        onUnlock();
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
      }
    });
  }
}
