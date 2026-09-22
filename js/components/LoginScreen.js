/**
 * ACCOUNT LOGIN SCREEN COMPONENT
 * Student Learning Note: Separate account authentication layer allowing users
 * to log in with registered credentials (username/email + password).
 */

import { t } from '../i18n/translations.js';

export function renderLoginScreen(lang = 'en') {
  return `
    <div class="container animate-fade-in" style="padding-top: 3.5rem; padding-bottom: 4rem;">
      <div style="max-width: 440px; margin: 0 auto;">
        
        <div class="card-panel auth-card">
          
          <div style="text-align: center; margin-bottom: 1.75rem;">
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
                <span>SECURE VAULT</span>
              </div>
            </div>

            <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">${t('loginTitle', lang)}</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted);">
              ${t('loginSubtitle', lang)}
            </p>
          </div>

          <form id="login-form">
            
            <!-- Identifier Input -->
            <div class="form-group">
              <label class="form-label" for="login-identifier">${t('userOrEmailLabel', lang)} *</label>
              <input 
                type="text" 
                id="login-identifier" 
                class="input-field" 
                placeholder="Username or email..." 
                required 
                autofocus
              />
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <label class="form-label" for="login-password" style="margin-bottom:0;">${t('passwordLabel', lang)} *</label>
                <a href="#" id="goto-forgot-btn" style="font-size: 0.775rem; color: var(--primary); text-decoration: none; font-weight: 600;">
                  ${t('forgotPasswordLink', lang)}
                </a>
              </div>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="login-password" 
                  class="input-field mono" 
                  placeholder="Enter password..." 
                  required 
                />
                <button type="button" class="input-icon-btn" id="toggle-login-pass" title="Toggle visibility">
                  👁️
                </button>
              </div>
            </div>

            <!-- Global Error Message -->
            <div id="login-error" style="display:none; color:var(--danger); background:var(--danger-light); border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; padding:0.65rem; font-size:0.825rem; margin-bottom:1.25rem;">
              ${t('loginErrorMsg', lang)}
            </div>

            <!-- Submit CTA -->
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem;">
              ${t('loginSubmitBtn', lang)}
            </button>

          </form>

          <!-- Register Link -->
          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <span style="color: var(--text-muted);">${t('noAccountYet', lang)}</span>
            <a href="#" id="goto-register-btn" style="color: var(--primary); text-decoration: none; font-weight: 700; margin-left: 0.25rem;">
              ${t('signUpLink', lang)}
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachLoginEvents(lang = 'en', { onLoginSuccess, onGotoRegister, onGotoForgot }) {
  const form = document.getElementById('login-form');
  const passInput = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-login-pass');
  const errorBox = document.getElementById('login-error');
  const gotoRegister = document.getElementById('goto-register-btn');
  const gotoForgot = document.getElementById('goto-forgot-btn');

  // Toggle Visibility
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Navigation Links
  if (gotoRegister) {
    gotoRegister.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoRegister();
    });
  }

  if (gotoForgot) {
    gotoForgot.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoForgot();
    });
  }

  // Form Submit
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const identifier = document.getElementById('login-identifier').value.trim();
      const password = passInput.value.trim();

      if (errorBox) errorBox.style.display = 'none';

      try {
        const success = await onLoginSuccess(identifier, password);
        if (!success && errorBox) {
          errorBox.style.display = 'block';
        }
      } catch (err) {
        if (errorBox) {
          errorBox.textContent = err.message || t('loginErrorMsg', lang);
          errorBox.style.display = 'block';
        }
      }
    });
  }
}
