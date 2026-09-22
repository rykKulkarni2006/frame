/**
 * ADD / EDIT ACCOUNT MODAL COMPONENT (Screen 5)
 * Student Learning Note: Modal dialog allowing users to enter new credentials or edit existing ones,
 * generate secure passwords dynamically, and save changes to localStorage.
 */

import { generatePassword, evaluateStrength } from '../utils/passwordGenerator.js';
import { t } from '../i18n/translations.js';

export function renderAddAccountModal(isOpen, editingAccount = null, lang = 'en') {
  const isEdit = !!editingAccount;
  const name = isEdit ? editingAccount.name : '';
  const username = isEdit ? editingAccount.username : '';
  const category = isEdit ? editingAccount.category : 'social';
  const password = isEdit ? editingAccount.password : '';
  const notes = isEdit ? (editingAccount.notes || '') : '';
  const id = isEdit ? editingAccount.id : '';

  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="add-account-modal">
      <div class="modal-container animate-fade-in">
        
        <div class="modal-header">
          <h3 class="modal-title" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${isEdit ? '✏️' : '➕'}</span> ${isEdit ? t('editTitle', lang) : t('addTitle', lang)}
          </h3>
          <button class="btn-icon-only" id="close-add-modal" title="Close Modal">✕</button>
        </div>

        <form id="add-account-form">
          <input type="hidden" id="add-id" value="${id}" />
          
          <!-- Website / App Name -->
          <div class="form-group">
            <label class="form-label" for="add-name">${t('websiteLabel', lang)} *</label>
            <input 
              type="text" 
              id="add-name" 
              class="input-field" 
              placeholder="e.g. Instagram, GitHub, College Portal" 
              value="${name}"
              required
            />
          </div>

          <!-- Username / Email -->
          <div class="form-group">
            <label class="form-label" for="add-username">${t('usernameEmailLabel', lang)} *</label>
            <input 
              type="text" 
              id="add-username" 
              class="input-field" 
              placeholder="e.g. user@example.com or @handle" 
              value="${username}"
              required
            />
          </div>

          <!-- Category Select -->
          <div class="form-group">
            <label class="form-label" for="add-category">${t('categoryLabel', lang)}</label>
            <select id="add-category" class="input-field" style="cursor: pointer;">
              <option value="social" ${category === 'social' ? 'selected' : ''}>${t('socialCat', lang)} (Instagram, X, etc.)</option>
              <option value="developer" ${category === 'developer' ? 'selected' : ''}>${t('developerCat', lang)} (GitHub, Vercel, AWS)</option>
              <option value="personal" ${category === 'personal' ? 'selected' : ''}>${t('personalCat', lang)} (College Accounts)</option>
            </select>
          </div>

          <!-- Password Field with Generator Button & Visibility Toggle -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" for="add-password" style="margin-bottom: 0;">${t('passwordLabel', lang)} *</label>
              <button type="button" class="btn btn-outline" id="btn-generate-pass" style="padding: 0.25rem 0.6rem; font-size: 0.775rem;">
                ${t('generatePassBtn', lang)}
              </button>
            </div>
            
            <div class="input-wrapper">
              <input 
                type="password" 
                id="add-password" 
                class="input-field mono" 
                placeholder="Enter password or click generate..." 
                value="${password}"
                required
              />
              <button type="button" class="input-icon-btn" id="toggle-add-pass" title="Toggle visibility">
                👁️
              </button>
            </div>

            <!-- Password Strength Bar -->
            <div class="strength-meter" id="add-pass-strength">
              <div class="strength-segment"></div>
              <div class="strength-segment"></div>
              <div class="strength-segment"></div>
            </div>
          </div>

          <!-- Embedded Password Generator Tools Controls (Expandable) -->
          <div id="generator-controls" style="
            background: rgba(0, 0, 0, 0.25); 
            border: 1px dashed var(--border-color); 
            border-radius: 8px; 
            padding: 0.85rem; 
            margin-bottom: 1.25rem; 
            display: none;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem;">
              <span>Password Length: <span id="gen-length-val">16</span> chars</span>
            </div>
            <input type="range" id="gen-length-slider" min="8" max="32" value="16" style="width: 100%; accent-color: var(--primary); margin-bottom: 0.75rem;" />

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.775rem; color: var(--text-muted);">
              <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                <input type="checkbox" id="gen-upper" checked /> Uppercase (A-Z)
              </label>
              <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                <input type="checkbox" id="gen-lower" checked /> Lowercase (a-z)
              </label>
              <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                <input type="checkbox" id="gen-num" checked /> Numbers (0-9)
              </label>
              <label style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                <input type="checkbox" id="gen-sym" checked /> Symbols (!@#$)
              </label>
            </div>
          </div>

          <!-- Optional Notes Field -->
          <div class="form-group">
            <label class="form-label" for="add-notes">${t('notesLabel', lang)}</label>
            <textarea 
              id="add-notes" 
              class="input-field" 
              rows="2" 
              placeholder="Recovery codes, 2FA backup hints, account notes..."
            >${notes}</textarea>
          </div>

          <!-- Modal Actions -->
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary" id="cancel-add-btn">${t('cancelBtn', lang)}</button>
            <button type="submit" class="btn btn-primary">${isEdit ? t('updateAccountBtn', lang) : t('saveAccountBtn', lang)}</button>
          </div>

        </form>

      </div>
    </div>
  `;
}

export function attachAddAccountEvents({ onSaveAccount, onCloseModal }) {
  const modal = document.getElementById('add-account-modal');
  const form = document.getElementById('add-account-form');
  const closeBtn = document.getElementById('close-add-modal');
  const cancelBtn = document.getElementById('cancel-add-btn');
  const passInput = document.getElementById('add-password');
  const toggleBtn = document.getElementById('toggle-add-pass');
  const genBtn = document.getElementById('btn-generate-pass');
  const genControls = document.getElementById('generator-controls');
  const slider = document.getElementById('gen-length-slider');
  const lengthVal = document.getElementById('gen-length-val');
  const strengthBar = document.getElementById('add-pass-strength');

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', onCloseModal);
  if (cancelBtn) cancelBtn.addEventListener('click', onCloseModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) onCloseModal();
    });
  }

  // Password Visibility Toggle
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? '🙈' : '👁️';
    });
  }

  // Toggle / Trigger Password Generator Tool
  if (genBtn && genControls) {
    genBtn.addEventListener('click', () => {
      genControls.style.display = 'block';
      triggerGenerate();
    });
  }

  function triggerGenerate() {
    if (!passInput) return;
    const length = parseInt(slider.value, 10);
    const upper = document.getElementById('gen-upper').checked;
    const lower = document.getElementById('gen-lower').checked;
    const num = document.getElementById('gen-num').checked;
    const sym = document.getElementById('gen-sym').checked;

    const newPass = generatePassword({
      length,
      includeUppercase: upper,
      includeLowercase: lower,
      includeNumbers: num,
      includeSymbols: sym
    });

    passInput.value = newPass;
    updateStrength();
  }

  // Generator Controls Events
  if (slider && lengthVal) {
    slider.addEventListener('input', (e) => {
      lengthVal.textContent = e.target.value;
      triggerGenerate();
    });
  }

  ['gen-upper', 'gen-lower', 'gen-num', 'gen-sym'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', triggerGenerate);
  });

  // Strength Evaluator for Add Form
  function updateStrength() {
    if (!passInput || !strengthBar) return;
    const evaluation = evaluateStrength(passInput.value);
    const segments = strengthBar.querySelectorAll('.strength-segment');
    segments.forEach((seg, idx) => {
      seg.className = 'strength-segment';
      if (idx < evaluation.score) {
        seg.classList.add(evaluation.class);
      }
    });
  }

  if (passInput) {
    passInput.addEventListener('input', updateStrength);
    // Initial evaluation on open
    updateStrength();
  }

  // Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const existingId = document.getElementById('add-id').value;
      const name = document.getElementById('add-name').value.trim();
      const username = document.getElementById('add-username').value.trim();
      const category = document.getElementById('add-category').value;
      const password = passInput.value.trim();
      const notes = document.getElementById('add-notes').value.trim();

      // Simple icon assignment helper based on name
      let icon = '🔑';
      const nameLower = name.toLowerCase();
      if (nameLower.includes('insta')) icon = '📸';
      else if (nameLower.includes('git')) icon = '🐙';
      else if (nameLower.includes('twitter') || nameLower.includes('x')) icon = '𝕏';
      else if (nameLower.includes('college') || nameLower.includes('edu')) icon = '🎓';
      else if (nameLower.includes('mail') || nameLower.includes('google')) icon = '📧';

      const accountData = {
        id: existingId || ('acc-' + Date.now()),
        name,
        username,
        password,
        category,
        icon,
        notes,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      onSaveAccount(accountData, !!existingId);
    });
  }
}
