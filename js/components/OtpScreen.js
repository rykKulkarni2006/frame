/**
 * SECURE OTP VERIFICATION SCREEN COMPONENT
 * Student Learning Note: Displays 6-digit OTP entry with live mm:ss countdown (5 minutes),
 * single-use attempt tracking, masked target display, and explicit development mode banner.
 */

import { t } from '../i18n/translations.js';

export function renderOtpScreen(lang = 'en', { target, otpDevHint, providerNotice, isConfigured = false }) {
  return `
    <div class="container animate-fade-in" style="padding-top: 3.5rem; padding-bottom: 4rem;">
      <div style="max-width: 440px; margin: 0 auto;">
        
        <div class="card-panel auth-card">
          
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <!-- Modern Security Lock Visual -->
            <div class="lock-visual-container">
              <div class="lock-visual-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div class="lock-visual-badge">
                <span class="lock-visual-dot"></span>
                <span>IDENTITY VERIFICATION</span>
              </div>
            </div>

            <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">${t('otpTitle', lang)}</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
              ${t('otpSubtitle', lang)} <strong style="color:var(--text-main); font-family:var(--font-mono);">${target}</strong>
            </p>
          </div>

          <!-- Explicit Development Mode State Notice -->
          ${!isConfigured ? `
            <div class="dev-mode-badge">
              <div style="display: flex; align-items: center; gap: 0.4rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>⚠️</span>
                <span>DEVELOPMENT MODE ONLY</span>
              </div>
              <div style="font-size: 0.775rem; opacity: 0.9; margin-bottom: 0.4rem;">
                ${providerNotice || 'Email/SMS OTP provider is not configured. (Requires EMAIL_PROVIDER_API_KEY / SMS_PROVIDER_API_KEY).'}
              </div>
              ${otpDevHint ? `
                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.25); padding: 0.4rem 0.65rem; border-radius: 6px; font-size: 0.775rem;">
                  <span>Simulated test OTP:</span>
                  <code style="font-family:var(--font-mono); font-weight:700; color:var(--primary); font-size:1rem; letter-spacing:0.15em;">${otpDevHint}</code>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <form id="otp-form">
            
            <!-- OTP Input -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <label class="form-label" for="otp-code-input" style="margin-bottom:0;">Enter 6-Digit Code *</label>
                <div class="otp-timer-badge" id="otp-timer-pill" title="Time remaining before OTP expires">
                  <span>⏱️</span>
                  <span id="otp-timer-text">05:00</span>
                </div>
              </div>
              
              <input 
                type="text" 
                id="otp-code-input" 
                class="input-field mono" 
                placeholder="••••••" 
                maxlength="6" 
                pattern="[0-9]{6}"
                inputmode="numeric"
                required 
                style="text-align:center; font-size:1.5rem; letter-spacing:0.35em; padding:0.75rem;" 
                autofocus
              />
            </div>

            <!-- Error Box -->
            <div id="otp-error-msg" style="display:none; color:var(--danger); background:var(--danger-light); border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; padding:0.65rem; font-size:0.825rem; margin-bottom:1.25rem; text-align:center;">
            </div>

            <!-- Resend Cooldown Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:1.25rem; color:var(--text-muted);">
              <span id="resend-cooldown-text">Resend available in: <strong id="cooldown-sec" style="color:var(--primary);">60</strong>s</span>
              <button type="button" class="btn btn-outline" id="resend-otp-btn" disabled style="padding:0.3rem 0.75rem; font-size:0.775rem;">
                ${t('resendOtpBtn', lang)}
              </button>
            </div>

            <!-- Submit CTA -->
            <button type="submit" class="btn btn-primary" id="verify-otp-submit-btn" style="width: 100%; padding: 0.85rem;">
              ${t('verifyOtpBtn', lang)}
            </button>

          </form>

          <!-- Back to Login -->
          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem;">
            <a href="#" id="goto-login-from-otp" style="color: var(--text-muted); text-decoration: none; font-weight: 600;">
              ← Cancel and Return to Login
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachOtpEvents(lang = 'en', { onVerify, onResend, getRemainingSeconds, getFormattedTime, onGotoLogin }) {
  const form = document.getElementById('otp-form');
  const otpInput = document.getElementById('otp-code-input');
  const errorMsg = document.getElementById('otp-error-msg');
  const timerText = document.getElementById('otp-timer-text');
  const timerPill = document.getElementById('otp-timer-pill');
  const cooldownSec = document.getElementById('cooldown-sec');
  const resendBtn = document.getElementById('resend-otp-btn');
  const resendText = document.getElementById('resend-cooldown-text');
  const backBtn = document.getElementById('goto-login-from-otp');

  if (backBtn && onGotoLogin) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoLogin();
    });
  }

  // 60-second Resend Cooldown tracking
  let cooldownRemaining = 60;
  const cooldownInterval = setInterval(() => {
    cooldownRemaining--;
    if (cooldownSec) cooldownSec.textContent = Math.max(0, cooldownRemaining);

    if (cooldownRemaining <= 0) {
      clearInterval(cooldownInterval);
      if (resendBtn) resendBtn.disabled = false;
      if (resendText) resendText.innerHTML = 'Didn\'t receive code?';
    }
  }, 1000);

  // 5-minute Expiry Countdown tracking
  const expiryInterval = setInterval(() => {
    const sec = getRemainingSeconds ? getRemainingSeconds() : 0;
    if (timerText && getFormattedTime) {
      timerText.textContent = getFormattedTime();
    }

    // Turn pill red when under 1 minute
    if (sec <= 60 && timerPill) {
      timerPill.classList.add('urgent');
    }

    if (sec <= 0) {
      clearInterval(expiryInterval);
      if (timerText) timerText.textContent = 'Expired';
      if (otpInput) otpInput.disabled = true;
      if (errorMsg) {
        errorMsg.textContent = 'OTP has expired. Please click Resend OTP to request a new code.';
        errorMsg.style.display = 'block';
      }
    }
  }, 1000);

  // Resend OTP Action
  if (resendBtn) {
    resendBtn.addEventListener('click', async () => {
      resendBtn.disabled = true;
      cooldownRemaining = 60;
      if (resendText) resendText.innerHTML = 'Resend available in: <strong id="cooldown-sec" style="color:var(--primary);">60</strong>s';
      if (otpInput) otpInput.disabled = false;
      if (errorMsg) errorMsg.style.display = 'none';

      await onResend();
    });
  }

  // Form Submit
  if (form && otpInput) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = otpInput.value.trim();

      if (errorMsg) errorMsg.style.display = 'none';

      const result = await onVerify(code);

      if (!result.success && errorMsg) {
        errorMsg.textContent = result.message || t('invalidOtpMsg', lang);
        errorMsg.style.display = 'block';
      }
    });
  }
}
