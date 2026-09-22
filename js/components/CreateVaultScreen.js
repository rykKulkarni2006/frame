/**
 * CREATE MASTER PASSWORD SCREEN COMPONENT (Screen 2)
 * Student Learning Note: User sets up their vault's master password.
 * Includes interactive visibility toggles, strength validation, and explicit warnings.
 */

import { evaluateStrength } from '../utils/passwordGenerator.js';

export function renderCreateVaultScreen() {
  return `
    <div class="container animate-fade-in" style="padding-top: 2.5rem; padding-bottom: 4rem;">
      <div style="max-width: 480px; margin: 0 auto;">
        
        <div class="card-panel auth-card">
          
          <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="
              width: 56px; 
              height: 56px; 
              margin: 0 auto 1rem; 
              background: rgba(16, 185, 129, 0.12); 
              border: 1px solid rgba(16, 185, 129, 0.3); 
              border-radius: 16px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: var(--primary);
            ">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 style="font-size: 1.5rem;">Create Master Password</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">
              Set up a strong password to protect your Lockly vault.
            </p>
          </div>

          <!-- Explicit Safety Warning Box -->
          <div class="warning-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div>
              <strong>Important Warning:</strong> You must remember this master password! If forgotten, your vault data cannot be recovered. Lockly never sends or stores your password on any server.
            </div>
          </div>

          <form id="create-vault-form">
            
            <!-- Master Password Field -->
            <div class="form-group">
              <label class="form-label" for="create-master-pass">
                <span>Master Password</span>
                <span id="strength-label" style="font-size: 0.75rem; color: var(--text-muted);">Strength</span>
              </label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="create-master-pass" 
                  class="input-field mono" 
                  placeholder="Enter a strong master password..." 
                  required 
                  minlength="8"
                />
                <button type="button" class="input-icon-btn" id="toggle-pass-1" title="Toggle visibility">
                  👁️
                </button>
              </div>
              
              <!-- Strength meter bar -->
              <div class="strength-meter" id="strength-meter-bar">
                <div class="strength-segment"></div>
                <div class="strength-segment"></div>
                <div class="strength-segment"></div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="form-group">
              <label class="form-label" for="confirm-master-pass">Confirm Password</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="confirm-master-pass" 
                  class="input-field mono" 
                  placeholder="Re-enter your master password..." 
                  required 
                />
                <button type="button" class="input-icon-btn" id="toggle-pass-2" title="Toggle visibility">
                  👁️
                </button>
              </div>
              <div id="match-error" style="color: var(--danger); font-size: 0.8rem; margin-top: 0.35rem; display: none;">
                Passwords do not match!
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.85rem;">
              Create Vault & Continue 🔒
            </button>
          
          </form>

        </div>
      </div>
    </div>
  `;
}

export function attachCreateVaultEvents({ onCreateVault }) {
  const form = document.getElementById('create-vault-form');
  const pass1Input = document.getElementById('create-master-pass');
  const pass2Input = document.getElementById('confirm-master-pass');
  const toggle1 = document.getElementById('toggle-pass-1');
  const toggle2 = document.getElementById('toggle-pass-2');
  const strengthLabel = document.getElementById('strength-label');
  const matchError = document.getElementById('match-error');
  const strengthBar = document.getElementById('strength-meter-bar');

  // Toggle Visibility for Field 1
  if (toggle1 && pass1Input) {
    toggle1.addEventListener('click', () => {
      const isPass = pass1Input.type === 'password';
      pass1Input.type = isPass ? 'text' : 'password';
      toggle1.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Toggle Visibility for Field 2
  if (toggle2 && pass2Input) {
    toggle2.addEventListener('click', () => {
      const isPass = pass2Input.type === 'password';
      pass2Input.type = isPass ? 'text' : 'password';
      toggle2.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Real-time Strength Meter Evaluator
  if (pass1Input && strengthLabel && strengthBar) {
    pass1Input.addEventListener('input', () => {
      const val = pass1Input.value;
      const evaluation = evaluateStrength(val);
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

  // Form Submit Handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = pass1Input.value.trim();
      const p2 = pass2Input.value.trim();

      if (p1 !== p2) {
        matchError.style.display = 'block';
        return;
      }

      matchError.style.display = 'none';
      onCreateVault(p1);
    });
  }
}
