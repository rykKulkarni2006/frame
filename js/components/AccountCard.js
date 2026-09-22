/**
 * ACCOUNT CARD COMPONENT
 * Student Learning Note: Renders a single credential card with password masking,
 * copy to clipboard functionality, and view toggle.
 */

export function renderAccountCard(account, isUnmasked) {
  // Mask password string (e.g. ••••••••••••)
  const maskedText = '••••••••••••••••';
  const displayText = isUnmasked ? account.password : maskedText;

  return `
    <div class="account-card animate-fade-in" data-category="${account.category}" id="card-${account.id}">
      
      <div class="account-card-header">
        <div class="account-info">
          <div class="account-avatar">${account.icon || '🔑'}</div>
          <div>
            <div class="account-name">${account.name}</div>
            <div class="account-username">${account.username}</div>
          </div>
        </div>
        <span class="account-category-tag">${account.category}</span>
      </div>

      <!-- Password Box -->
      <div class="password-box">
        <div class="password-text" id="pass-text-${account.id}">
          ${displayText}
        </div>
        
        <div class="password-actions">
          <button 
            class="btn-icon-only toggle-view-btn" 
            data-id="${account.id}" 
            title="${isUnmasked ? 'Hide Password' : 'View Password'}"
          >
            ${isUnmasked ? '🙈' : '👁️'}
          </button>
          
          <button 
            class="btn-icon-only copy-pass-btn" 
            data-id="${account.id}" 
            data-password="${account.password}" 
            title="Copy Password"
          >
            📋
          </button>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-dark); margin-top: 0.25rem;">
        <span>Updated: ${account.updatedAt || 'Recently'}</span>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-icon-only edit-account-btn" data-id="${account.id}" style="border: none; background: transparent; padding: 2px; cursor: pointer;" title="Edit Account">
            ✏️
          </button>
          <button class="btn-icon-only delete-account-btn" data-id="${account.id}" style="border: none; background: transparent; padding: 2px; cursor: pointer;" title="Delete Account">
            🗑️
          </button>
        </div>
      </div>

    </div>
  `;
}
