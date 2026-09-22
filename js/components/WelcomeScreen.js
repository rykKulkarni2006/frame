/**
 * WELCOME SCREEN COMPONENT (Screen 1)
 * Student Learning Note: First landing screen introducing Lockly features,
 * login/registration shortcuts, and tagline.
 */

import { t } from '../i18n/translations.js';

export function renderWelcomeScreen(lang = 'en') {
  return `
    <div class="container animate-fade-in" style="padding-top: 3rem; padding-bottom: 4rem;">
      <div style="max-width: 760px; margin: 0 auto; text-align: center;">
        
        <!-- Animated Hero Icon -->
        <div class="animate-float" style="margin-bottom: 1.5rem;">
          <div style="
            width: 80px; 
            height: 80px; 
            margin: 0 auto; 
            background: linear-gradient(135deg, var(--primary), #059669); 
            border-radius: 22px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: var(--glow-emerald);
          ">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        <h1 style="font-size: 2.8rem; margin-bottom: 0.75rem;">
          ${t('welcomeTitle', lang)}
        </h1>
        
        <p style="font-size: 1.35rem; color: var(--primary); font-weight: 600; margin-bottom: 1.25rem; font-family: var(--font-heading);">
          ${t('welcomeSubtitle', lang)}
        </p>

        <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.6;">
          ${t('welcomeDesc', lang)}
        </p>

        <!-- CTA Buttons Area -->
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3.5rem;">
          <button class="btn btn-primary" id="welcome-login-btn" style="font-size: 1.05rem; padding: 0.85rem 2rem; border-radius: 14px;">
            ${t('loginAccountBtn', lang)} 🔓
          </button>
          <button class="btn btn-secondary" id="welcome-register-btn" style="font-size: 1.05rem; padding: 0.85rem 2rem; border-radius: 14px;">
            ${t('createAccountBtn', lang)} 👤
          </button>
        </div>

        <!-- Feature Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; text-align: left;">
          <div class="card-panel" style="padding: 1.25rem;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔐</div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem;">${t('featureMasterPass', lang)}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${t('featureMasterDesc', lang)}</p>
          </div>

          <div class="card-panel" style="padding: 1.25rem;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚡</div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem;">${t('featureGen', lang)}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${t('featureGenDesc', lang)}</p>
          </div>

          <div class="card-panel" style="padding: 1.25rem;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📱</div>
            <h3 style="font-size: 1.05rem; margin-bottom: 0.35rem;">${t('featureDash', lang)}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${t('featureDashDesc', lang)}</p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachWelcomeEvents({ onGotoLogin, onGotoRegister }) {
  const loginBtn = document.getElementById('welcome-login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', onGotoLogin);
  }

  const regBtn = document.getElementById('welcome-register-btn');
  if (regBtn) {
    regBtn.addEventListener('click', onGotoRegister);
  }
}
