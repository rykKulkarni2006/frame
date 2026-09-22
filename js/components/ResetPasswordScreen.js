/**
 * RESET PASSWORD SCREEN COMPONENT
 * Student Learning Note: Screen displayed after identity is verified via OTP.
 * Allows user to set a new password, preserves client-side zero-knowledge vault separation,
 * and renders a clear success message with a Return to Login action.
 */

import { t } from '../i18n/translations.js';
import { evaluateStrength } from '../utils/passwordGenerator.js';

export function renderResetPasswordScreen(lang = 'en', { isSuccess = false } = {}) {
  return `
    <div class="container animate-fade-in" style="padding-top: 3.5rem; padding-bottom: 4rem;">
      <div style="max-width: 460px; margin: 0 auto;">
        
        <div class="card-panel auth-card">
          
          ${isSuccess ? `
            <!-- Success Confirmation Screen -->
            <div style="text-align: center; padding: 1rem 0;">
              
              <div class="lock-visual-container">
                <div class="lock-visual-icon" style="background: var(--primary-light); color: var(--primary);">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div class="lock-visual-badge">
                  <span class="lock-visual-dot"></span>
                  <span>PASSWORD UPDATED</span>
                </div>
              </div>

              <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-main);">
                Password Reset Successfully!
              </h2>

              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">
                Your account password has been reset successfully. You can now login using your new credentials.
              </p>

              <!-- Zero-Knowledge Vault Protection Disclaimer -->
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 1.75rem; text-align: left; font-size: 0.8rem; line-height: 1.5; color: var(--text-muted);">
                <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.4rem;">
                  <span>🛡️</span> Zero-Knowledge Vault Protection
                </div>
                <span>
                  Account password recovery updates your account authentication. Your encrypted credential vault remains securely sealed client-side until decrypted with your Vault Master Password or Emergency Recovery Key.
                </span>
              </div>

              <!-- Return to Login Button -->
              <button type="button" class="btn btn-primary" id="return-login-btn" style="width: 100%; padding: 0.85rem;">
                Back to Login ➔
              </button>

            </div>
          ` : `
            <!-- Form View -->
            <div style="text-align: center; margin-bottom: 1.5rem;">
              
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
                  <span>NEW CREDENTIALS</span>
                </div>
              </div>

              <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">${t('resetTitle', lang)}</h2>
              <p style="font-size: 0.875rem; color: var(--text-muted);">
                ${t('resetSubtitle', lang)}
              </p>
            </div>

            <form id="reset-pass-form">
              
              <!-- New Password Input -->
              <div class="form-group">
                <label class="form-label" for="reset-pass-1">
                  <span>${t('newPasswordLabel', lang)} *</span>
                  <span id="reset-strength-label" style="font-size: 0.75rem; color: var(--text-muted);">Strength</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    type="password" 
                    id="reset-pass-1" 
                    class="input-field mono" 
                    placeholder="Enter new password (min 8 chars)..." 
                    required 
                    minlength="8"
                    autofocus
                  />
                  <button type="button" class="input-icon-btn" id="toggle-reset-1" title="Toggle visibility">
                    👁️
                  </button>
                </div>

                <!-- Strength meter bar -->
                <div class="strength-meter" id="reset-strength-bar">
                  <div class="strength-segment"></div>
                  <div class="strength-segment"></div>
                  <div class="strength-segment"></div>
                </div>
              </div>

              <!-- Confirm New Password Input -->
              <div class="form-group">
                <label class="form-label" for="reset-pass-2">${t('confirmNewPasswordLabel', lang)} *</label>
                <div class="input-wrapper">
                  <input 
                    type="password" 
                    id="reset-pass-2" 
                    class="input-field mono" 
                    placeholder="Re-enter new password..." 
                    required 
                  />
                  <button type="button" class="input-icon-btn" id="toggle-reset-2" title="Toggle visibility">
                    👁️
                  </button>
                </div>
                <div id="reset-match-error" style="display:none; color:var(--danger); font-size:0.8rem; margin-top:0.35rem;">
                  ${t('passMismatchMsg', lang)}
                </div>
              </div>

              <!-- Zero-Knowledge Security Notice -->
              <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.65rem 0.85rem; font-size: 0.775rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                🔒 <strong>Zero-Knowledge Separation:</strong> Resetting your password updates your account login. Encrypted vault contents require your Vault Master Password or Emergency Recovery Key to unlock.
              </div>

              <!-- Submit CTA -->
              <button type="submit" class="btn btn-primary" id="reset-submit-btn" style="width: 100%; padding: 0.85rem;">
                ${t('resetPasswordSubmitBtn', lang)}
              </button>

            </form>
          `}

        </div>

      </div>
    </div>
  `;
}

export function attachResetPasswordEvents(lang = 'en', { onResetSubmit, onGotoLogin }) {
  const returnLoginBtn = document.getElementById('return-login-btn');
  if (returnLoginBtn && onGotoLogin) {
    returnLoginBtn.addEventListener('click', onGotoLogin);
    return;
  }

  const form = document.getElementById('reset-pass-form');
  const pass1Input = document.getElementById('reset-pass-1');
  const pass2Input = document.getElementById('reset-pass-2');
  const toggle1 = document.getElementById('toggle-reset-1');
  const toggle2 = document.getElementById('toggle-reset-2');
  const strengthLabel = document.getElementById('reset-strength-label');
  const strengthBar = document.getElementById('reset-strength-bar');
  const matchError = document.getElementById('reset-match-error');

  // Toggle Visibility 1
  if (toggle1 && pass1Input) {
    toggle1.addEventListener('click', () => {
      const isPass = pass1Input.type === 'password';
      pass1Input.type = isPass ? 'text' : 'password';
      toggle1.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Toggle Visibility 2
  if (toggle2 && pass2Input) {
    toggle2.addEventListener('click', () => {
      const isPass = pass2Input.type === 'password';
      pass2Input.type = isPass ? 'text' : 'password';
      toggle2.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Strength Evaluator
  if (pass1Input && strengthLabel && strengthBar) {
    pass1Input.addEventListener('input', () => {
      const evaluation = evaluateStrength(pass1Input.value);
      strengthLabel.textContent = evaluation.label;

      const segments = strengthBar.querySelectorAll('.strength-segment');
      segments.forEach((seg, idx) => {
        seg.className = 'strength-segment';
        if (idx < evaluation.score) {
          seg.classList.add(evaluation.class);
        }
      });
    });
  }

  // Form Submit
  if (form && pass1Input && pass2Input) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = pass1Input.value.trim();
      const p2 = pass2Input.value.trim();

      if (p1.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }

      if (p1 !== p2) {
        if (matchError) matchError.style.display = 'block';
        return;
      }

      if (matchError) matchError.style.display = 'none';
      await onResetSubmit(p1);
    });
  }
}
