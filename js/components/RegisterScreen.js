/**
 * USER REGISTRATION SCREEN COMPONENT
 * Student Learning Note: Account registration form with real-time field validation
 * (email regex, 10-digit phone, min 3 char username, password strength & match).
 */

import { t } from '../i18n/translations.js';
import { evaluateStrength } from '../utils/passwordGenerator.js';

export function renderRegisterScreen(lang = 'en') {
  return `
    <div class="container animate-fade-in" style="padding-top: 2.5rem; padding-bottom: 4rem;">
      <div style="max-width: 480px; margin: 0 auto;">
        
        <div class="card-panel auth-card">
          
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
                <span>SECURE ENROLLMENT</span>
              </div>
            </div>

            <h2 style="font-size: 1.6rem; margin-bottom: 0.35rem;">${t('registerTitle', lang)}</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted);">
              ${t('registerSubtitle', lang)}
            </p>
          </div>

          <form id="register-form">
            
            <!-- Username Input -->
            <div class="form-group">
              <label class="form-label" for="reg-username">${t('usernameLabel', lang)} *</label>
              <input 
                type="text" 
                id="reg-username" 
                class="input-field" 
                placeholder="e.g. alex_developer" 
                required 
                minlength="3"
              />
              <div id="username-error" class="val-error" style="display:none; color:var(--danger); font-size:0.775rem; margin-top:0.25rem;">
                ${t('invalidUsernameMsg', lang)}
              </div>
            </div>

            <!-- Email Input -->
            <div class="form-group">
              <label class="form-label" for="reg-email">${t('emailLabel', lang)} *</label>
              <input 
                type="email" 
                id="reg-email" 
                class="input-field" 
                placeholder="e.g. alex@example.com" 
                required 
              />
              <div id="email-error" class="val-error" style="display:none; color:var(--danger); font-size:0.775rem; margin-top:0.25rem;">
                ${t('invalidEmailMsg', lang)}
              </div>
            </div>

            <!-- Phone Input -->
            <div class="form-group">
              <label class="form-label" for="reg-phone">${t('phoneLabel', lang)} *</label>
              <input 
                type="tel" 
                id="reg-phone" 
                class="input-field" 
                placeholder="e.g. 9876543210" 
                required 
                maxlength="10"
              />
              <div id="phone-error" class="val-error" style="display:none; color:var(--danger); font-size:0.775rem; margin-top:0.25rem;">
                ${t('invalidPhoneMsg', lang)}
              </div>
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <label class="form-label" for="reg-password">
                <span>${t('passwordLabel', lang)} *</span>
                <span id="reg-strength-label" style="font-size:0.75rem; color:var(--text-muted);">Strength</span>
              </label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-password" 
                  class="input-field mono" 
                  placeholder="Enter strong account password..." 
                  required 
                  minlength="8"
                />
                <button type="button" class="input-icon-btn" id="toggle-reg-pass-1" title="Toggle visibility">
                  👁️
                </button>
              </div>

              <!-- Strength meter bar -->
              <div class="strength-meter" id="reg-strength-bar">
                <div class="strength-segment"></div>
                <div class="strength-segment"></div>
                <div class="strength-segment"></div>
              </div>
            </div>

            <!-- Confirm Password Input -->
            <div class="form-group">
              <label class="form-label" for="reg-confirm-password">${t('confirmPasswordLabel', lang)} *</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  class="input-field mono" 
                  placeholder="Re-enter password to confirm..." 
                  required 
                />
                <button type="button" class="input-icon-btn" id="toggle-reg-pass-2" title="Toggle visibility">
                  👁️
                </button>
              </div>
              <div id="reg-match-error" class="val-error" style="display:none; color:var(--danger); font-size:0.775rem; margin-top:0.25rem;">
                ${t('passMismatchMsg', lang)}
              </div>
            </div>

            <!-- Global Error Box -->
            <div id="reg-global-error" style="display:none; color:var(--danger); background:var(--danger-light); border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; padding:0.65rem; font-size:0.825rem; margin-bottom:1rem;">
            </div>

            <!-- Submit CTA -->
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem; margin-top: 0.5rem;">
              ${t('signUpSubmitBtn', lang)}
            </button>

          </form>

          <!-- Login Link -->
          <div style="text-align: center; margin-top: 1.25rem; font-size: 0.85rem;">
            <a href="#" id="goto-login-btn" style="color: var(--primary); text-decoration: none; font-weight: 600;">
              ${t('alreadyHaveAccount', lang)}
            </a>
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachRegisterEvents(lang = 'en', { onRegisterSuccess, onGotoLogin }) {
  const form = document.getElementById('register-form');
  const passInput = document.getElementById('reg-password');
  const confirmInput = document.getElementById('reg-confirm-password');
  const toggle1 = document.getElementById('toggle-reg-pass-1');
  const toggle2 = document.getElementById('toggle-reg-pass-2');
  const strengthLabel = document.getElementById('reg-strength-label');
  const strengthBar = document.getElementById('reg-strength-bar');
  const gotoLogin = document.getElementById('goto-login-btn');
  const globalError = document.getElementById('reg-global-error');

  // Toggle Visibility 1
  if (toggle1 && passInput) {
    toggle1.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggle1.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Toggle Visibility 2
  if (toggle2 && confirmInput) {
    toggle2.addEventListener('click', () => {
      const isPass = confirmInput.type === 'password';
      confirmInput.type = isPass ? 'text' : 'password';
      toggle2.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Strength Evaluator
  if (passInput && strengthLabel && strengthBar) {
    passInput.addEventListener('input', () => {
      const evaluation = evaluateStrength(passInput.value);
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

  // Go to Login
  if (gotoLogin) {
    gotoLogin.addEventListener('click', (e) => {
      e.preventDefault();
      onGotoLogin();
    });
  }

  // Submit Registration
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const password = passInput.value.trim();
      const confirmPassword = confirmInput.value.trim();

      // Reset Error Displays
      document.querySelectorAll('.val-error').forEach(el => el.style.display = 'none');
      if (globalError) globalError.style.display = 'none';

      let hasError = false;

      // Validate Username
      if (username.length < 3) {
        document.getElementById('username-error').style.display = 'block';
        hasError = true;
      }

      // Validate Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        hasError = true;
      }

      // Validate Phone (10 digits)
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        document.getElementById('phone-error').style.display = 'block';
        hasError = true;
      }

      // Validate Password Match
      if (password !== confirmPassword) {
        document.getElementById('reg-match-error').style.display = 'block';
        hasError = true;
      }

      if (hasError) return;

      try {
        await onRegisterSuccess({ username, email, phone: phoneDigits, password });
      } catch (err) {
        if (globalError) {
          globalError.textContent = err.message || 'Registration failed.';
          globalError.style.display = 'block';
        }
      }
    });
  }
}
