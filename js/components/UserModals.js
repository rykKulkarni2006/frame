/**
 * USER MODALS (Logout Confirmation, Profile Info, and Security Center)
 */

import { t } from '../i18n/translations.js';

export function renderLogoutModal(isOpen, lang = 'en') {
  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="logout-confirm-modal">
      <div class="modal-container animate-fade-in" style="max-width: 420px; text-align: center;">
        
        <div style="
          width: 52px; 
          height: 52px; 
          margin: 0 auto 1rem; 
          background: var(--danger-light); 
          border: 1px solid rgba(239, 68, 68, 0.3); 
          border-radius: 16px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: var(--danger);
        ">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>

        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-main);">
          ${t('confirmLogoutTitle', lang)}
        </h3>

        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.75rem; line-height: 1.5;">
          ${t('confirmLogoutDesc', lang)}
        </p>

        <div style="display: flex; gap: 0.75rem; justify-content: center;">
          <button type="button" class="btn btn-secondary" id="cancel-logout-btn" style="flex: 1;">
            ${t('cancel', lang)}
          </button>
          <button type="button" class="btn btn-danger" id="confirm-logout-btn" style="flex: 1;">
            🚪 ${t('logout', lang)}
          </button>
        </div>

      </div>
    </div>
  `;
}

export function attachLogoutEvents({ onConfirm, onCancel }) {
  const cancelBtn = document.getElementById('cancel-logout-btn');
  const confirmBtn = document.getElementById('confirm-logout-btn');
  const modal = document.getElementById('logout-confirm-modal');

  if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
  if (confirmBtn) confirmBtn.addEventListener('click', onConfirm);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) onCancel();
    });
  }
}

export function renderProfileModal(isOpen, state) {
  const lang = state.lang || 'en';
  const user = state.currentUser || { username: 'Alex Developer', email: 'alex@example.com', phone: '9876543210' };

  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="profile-modal">
      <div class="modal-container animate-fade-in" style="max-width: 440px;">
        
        <div class="modal-header">
          <h3 class="modal-title" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>👤</span> ${t('profile', lang)}
          </h3>
          <button class="btn-icon-only" id="close-profile-modal" title="Close">✕</button>
        </div>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="
            width: 68px; 
            height: 68px; 
            margin: 0 auto 0.75rem; 
            background: linear-gradient(135deg, var(--primary), #059669); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: #fff; 
            font-size: 1.8rem; 
            font-weight: 700;
            box-shadow: var(--shadow-md);
          ">
            ${(user.username || 'A')[0].toUpperCase()}
          </div>
          <h3 style="font-size: 1.25rem;">${user.username}</h3>
          <span style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">Verified Vault Owner</span>
        </div>

        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">
          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">${t('emailLabel', lang)}:</span>
              <strong style="color: var(--text-main);">${user.email || 'alex@example.com'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">${t('phoneLabel', lang)}:</span>
              <strong style="color: var(--text-main);">${user.phone ? '+91 ' + user.phone : 'Not provided'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">${t('totalStored', lang)}:</span>
              <strong style="color: var(--primary);">${state.accounts.length} ${t('credentialsCount', lang)}</strong>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" id="done-profile-btn">${t('closeBtn', lang)}</button>
        </div>

      </div>
    </div>
  `;
}

export function attachProfileEvents({ onClose }) {
  const closeBtn = document.getElementById('close-profile-modal');
  const doneBtn = document.getElementById('done-profile-btn');
  const modal = document.getElementById('profile-modal');

  if (closeBtn) closeBtn.addEventListener('click', onClose);
  if (doneBtn) doneBtn.addEventListener('click', onClose);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) onClose();
    });
  }
}

export function renderSecurityModal(isOpen, state) {
  const lang = state.lang || 'en';

  return `
    <div class="modal-overlay ${isOpen ? 'active' : ''}" id="security-modal">
      <div class="modal-container animate-fade-in" style="max-width: 460px;">
        
        <div class="modal-header">
          <h3 class="modal-title" style="display: flex; align-items: center; gap: 0.5rem;">
            <span>🛡️</span> ${t('securityCenter', lang)}
          </h3>
          <button class="btn-icon-only" id="close-security-modal" title="Close">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          
          <div style="display: flex; gap: 0.85rem; align-items: flex-start; padding: 0.85rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px;">
            <div style="font-size: 1.5rem;">🔒</div>
            <div>
              <strong style="display: block; font-size: 0.95rem; color: var(--primary);">Client-Side Zero-Knowledge</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Your passwords and master key never leave this browser. Encrypted locally with standard algorithms.</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.85rem; align-items: flex-start; padding: 0.85rem; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 10px;">
            <div style="font-size: 1.5rem;">⏱️</div>
            <div>
              <strong style="display: block; font-size: 0.95rem; color: var(--text-main);">Auto-Lock Security</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Vault automatically seals itself when idle or when clicking Lock Vault.</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.85rem; align-items: flex-start; padding: 0.85rem; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: 10px;">
            <div style="font-size: 1.5rem;">📱</div>
            <div>
              <strong style="display: block; font-size: 0.95rem; color: var(--text-main);">OTP Recovery Active</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Password resets require verified 6-digit OTP code authentication.</span>
            </div>
          </div>

        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" class="btn btn-secondary" id="done-security-btn">${t('closeBtn', lang)}</button>
        </div>

      </div>
    </div>
  `;
}

export function attachSecurityEvents({ onClose }) {
  const closeBtn = document.getElementById('close-security-modal');
  const doneBtn = document.getElementById('done-security-btn');
  const modal = document.getElementById('security-modal');

  if (closeBtn) closeBtn.addEventListener('click', onClose);
  if (doneBtn) doneBtn.addEventListener('click', onClose);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) onClose();
    });
  }
}