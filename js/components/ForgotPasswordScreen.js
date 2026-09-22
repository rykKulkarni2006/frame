/**
 * FORGOT PASSWORD / ACCOUNT RECOVERY SCREEN COMPONENT
 * Student Learning Note: First step of password recovery. Looks up registered user
 * by email or phone and triggers the OTP Recovery Provider.
 */

import { t } from '../i18n/translations.js';

export function renderForgotPasswordScreen(lang = 'en') {
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
                <span>ACCOUNT RECOVERY</span>
              </div>
            </div>

            <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">Forgot Password</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
              Enter your registered email address or mobile number to receive a verification OTP.
            </p>
          </div>

          <form id="forgot-form">
            
            <div class="form-group">
              <label class="form-label" for="recovery-input">Email or Mobile Number *</label>
              <input 
                type="text" 
                id="recovery-input" 
                class="input-field" 
                placeholder="e.g. alex@example.com or 9876543210" 
                required 
                autofocus
              />
            </div>

            <!-- Error Box -->
            <div id="forgot-error" style="display:none; color:var(--danger); background:var(--danger-light); border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; padding:0.65rem; font-size:0.825rem; margin-bottom:1.25rem;">
              No registered account found matching that email or mobile number.
            </div>

            <!-- Submit Action -->
            <button type="submit" class="btn btn-primary" id="send-otp-submit-btn" style="width: 100%; padding: 0.85rem;">
              Send OTP 📩
            </button>

          </form>

          <!-- Back to Login -->
          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem;">
            <a href="#" id="goto-login-from-forgot" style="color: var(--primary); text-decoration: none; font-weight: 600;">
              ← ${t('backToLogin', lang)}
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachForgotPasswordEvents(lang = 'en', { onSendOtp, onGotoLogin }) {
  const form = document.getElementById('forgot-form');
  const errorBox = document.getElementById('forgot-error');
  const backBtn = document.getElementById('goto-login-from-forgot');

  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoLogin();
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('recovery-input').value.trim();

      if (errorBox) errorBox.style.display = 'none';

      const success = await onSendOtp(input);
      if (!success && errorBox) {
        errorBox.style.display = 'block';
      }
    });
  }
}
