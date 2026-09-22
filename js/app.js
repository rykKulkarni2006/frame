/**
 * LOCKLY MAIN APPLICATION STATE & ROUTER (Phase 3)
 * Student Learning Note: Core app controller handling Authentication (Register, Login, Forgot Password, OTP, Reset),
 * Customization (Themes, Light/Dark mode, Multi-language i18n), and Vault management.
 */

import { renderNavbar, attachNavbarEvents } from './components/Navbar.js';
import { renderWelcomeScreen, attachWelcomeEvents } from './components/WelcomeScreen.js';
import { renderRegisterScreen, attachRegisterEvents } from './components/RegisterScreen.js';
import { renderLoginScreen, attachLoginEvents } from './components/LoginScreen.js';
import { renderForgotPasswordScreen, attachForgotPasswordEvents } from './components/ForgotPasswordScreen.js';
import { renderOtpScreen, attachOtpEvents } from './components/OtpScreen.js';
import { renderResetPasswordScreen, attachResetPasswordEvents } from './components/ResetPasswordScreen.js';
import { renderCreateVaultScreen, attachCreateVaultEvents } from './components/CreateVaultScreen.js';
import { renderUnlockScreen, attachUnlockEvents } from './components/UnlockScreen.js';
import { renderDashboardScreen, attachDashboardEvents } from './components/DashboardScreen.js';
import { renderAddAccountModal, attachAddAccountEvents } from './components/AddAccountModal.js';
import { renderSettingsModal, attachSettingsEvents } from './components/SettingsModal.js';
import { 
  renderLogoutModal, 
  attachLogoutEvents, 
  renderProfileModal, 
  attachProfileEvents, 
  renderSecurityModal, 
  attachSecurityEvents 
} from './components/UserModals.js';
import { showToast } from './utils/toast.js';

import { 
  getVaultMeta, 
  saveVaultMeta, 
  getStoredAccounts, 
  saveStoredAccounts, 
  resetVaultStorage 
} from './utils/storage.js';

import { 
  registerUser, 
  authenticateUser, 
  findAccountForRecovery, 
  updateUserPassword 
} from './services/authService.js';

import { recoveryProvider } from './services/recoveryProvider.js';

class LocklyApp {
  constructor() {
    const meta = getVaultMeta();
    const accounts = getStoredAccounts();
    const storedLang = localStorage.getItem('lockly_lang') || 'en';
    const storedTheme = localStorage.getItem('lockly_theme') || 'emerald';
    const storedMode = localStorage.getItem('lockly_mode') || 'dark';

    this.state = {
      currentScreen: 'welcome', // welcome | register | login | forgot-password | otp | reset-password | create-vault | unlock | dashboard
      currentUser: null,
      vaultCreated: meta.vaultCreated,
      masterPassword: meta.masterPassword,
      isUnlocked: false,
      accounts: accounts,
      searchQuery: '',
      selectedCategory: 'all',
      unmaskedCards: {},
      editingAccount: null,
      isAddModalOpen: false,
      isSettingsModalOpen: false,
      isLogoutModalOpen: false,
      isProfileModalOpen: false,
      isSecurityModalOpen: false,

      // Customization State
      lang: storedLang,
      theme: storedTheme,
      mode: storedMode,

      // Password Recovery State
      recoveryUser: null,
      recoveryTarget: '',
      otpDevHint: '',
      recoveryProviderNotice: '',
      isResetSuccess: false
    };

    this.init();
  }

  init() {
    this.applyCustomizations();
    this.render();
  }

  // Apply CSS attributes for theme and dark/light mode
  applyCustomizations() {
    document.documentElement.dataset.theme = this.state.theme;
    document.documentElement.dataset.mode = this.state.mode;
  }

  // State Updater with automatic DOM re-render
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.applyCustomizations();
    this.render();
  }

  // Main UI Renderer
  render() {
    const root = document.getElementById('app-root');
    if (!root) return;

    // Remember currently focused element and selection range
    const activeId = document.activeElement ? document.activeElement.id : null;
    const selectionStart = document.activeElement ? document.activeElement.selectionStart : null;
    const selectionEnd = document.activeElement ? document.activeElement.selectionEnd : null;

    const { currentScreen, isAddModalOpen, isSettingsModalOpen, editingAccount, lang } = this.state;

    // Render HTML layout
    root.innerHTML = `
      <!-- Prototype Notice Banner -->
      <div class="prototype-banner">
        <span class="badge">Local Vault Active</span>
        <span>Lockly Phase 3: Auth, OTP Recovery & Multi-Language Customization Active</span>
      </div>

      <!-- Navigation Header -->
      ${renderNavbar(this.state, {
        onNavigate: (screen) => this.navigate(screen),
        onLock: () => this.lockVault(),
        onOpenSettings: () => this.setState({ isSettingsModalOpen: true }),
        onChangeLanguage: (newLang) => {
          localStorage.setItem('lockly_lang', newLang);
          this.setState({ lang: newLang });
          showToast(`Language: ${newLang.toUpperCase()}`);
        },
        onPromptLogout: () => this.setState({ isLogoutModalOpen: true }),
        onOpenProfile: () => this.setState({ isProfileModalOpen: true }),
        onOpenSecurity: () => this.setState({ isSecurityModalOpen: true })
      })}

      <!-- Screen Router Area -->
      <main style="flex: 1;">
        ${this.renderCurrentScreen()}
      </main>

      <!-- Modal Overlays -->
      ${renderAddAccountModal(isAddModalOpen, editingAccount, lang)}
      ${renderSettingsModal(isSettingsModalOpen, this.state)}
      ${renderLogoutModal(this.state.isLogoutModalOpen, lang)}
      ${renderProfileModal(this.state.isProfileModalOpen, this.state)}
      ${renderSecurityModal(this.state.isSecurityModalOpen, this.state)}
    `;

    // Attach Event Listeners
    this.attachEvents();

    // Restore focus and cursor selection if search input or text field was active
    if (activeId) {
      const el = document.getElementById(activeId);
      if (el && typeof el.focus === 'function') {
        el.focus();
        if (typeof selectionStart === 'number' && typeof selectionEnd === 'number' && typeof el.setSelectionRange === 'function') {
          el.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }
  }

  // Render active screen component based on currentScreen state
  renderCurrentScreen() {
    const { currentScreen, lang } = this.state;

    switch (currentScreen) {
      case 'welcome':
        return renderWelcomeScreen(lang);
      case 'register':
        return renderRegisterScreen(lang);
      case 'login':
        return renderLoginScreen(lang);
      case 'forgot-password':
        return renderForgotPasswordScreen(lang);
      case 'otp':
        return renderOtpScreen(lang, {
          target: this.state.recoveryTarget,
          otpDevHint: this.state.otpDevHint,
          providerNotice: this.state.recoveryProviderNotice,
          isConfigured: false
        });
      case 'reset-password':
        return renderResetPasswordScreen(lang, {
          isSuccess: this.state.isResetSuccess
        });
      case 'create-vault':
        return renderCreateVaultScreen();
      case 'unlock':
        return renderUnlockScreen(this.state);
      case 'dashboard':
        return renderDashboardScreen(this.state);
      default:
        return renderWelcomeScreen(lang);
    }
  }

  // Attach event handlers for active elements
  attachEvents() {
    const { lang, currentScreen } = this.state;

    // Navbar Events
    attachNavbarEvents(this.state, {
      onNavigate: (screen) => this.navigate(screen),
      onLock: () => this.lockVault(),
      onOpenSettings: () => this.setState({ isSettingsModalOpen: true }),
      onChangeLanguage: (newLang) => {
        localStorage.setItem('lockly_lang', newLang);
        this.setState({ lang: newLang });
        showToast(`Language: ${newLang.toUpperCase()}`);
      },
      onPromptLogout: () => this.setState({ isLogoutModalOpen: true }),
      onOpenProfile: () => this.setState({ isProfileModalOpen: true }),
      onOpenSecurity: () => this.setState({ isSecurityModalOpen: true })
    });

    // Screen Specific Event Handlers
    if (currentScreen === 'welcome') {
      attachWelcomeEvents({
        onGotoLogin: () => this.setState({ currentScreen: 'login' }),
        onGotoRegister: () => this.setState({ currentScreen: 'register' })
      });
    } else if (currentScreen === 'register') {
      attachRegisterEvents(lang, {
        onRegisterSuccess: async (userData) => {
          const user = await registerUser(userData);
          this.setState({ currentUser: user, currentScreen: 'login' });
          showToast('Account created successfully! Please login.');
        },
        onGotoLogin: () => this.setState({ currentScreen: 'login' })
      });
    } else if (currentScreen === 'login') {
      attachLoginEvents(lang, {
        onLoginSuccess: async (identifier, password) => {
          const user = await authenticateUser(identifier, password);
          if (user) {
            this.setState({ currentUser: user });
            showToast(`Welcome back, ${user.username}!`);
            
            // Route to vault unlock or create vault
            if (this.state.vaultCreated) {
              this.navigate('unlock');
            } else {
              this.navigate('create-vault');
            }
            return true;
          }
          return false;
        },
        onGotoRegister: () => this.setState({ currentScreen: 'register' }),
        onGotoForgot: () => this.setState({ currentScreen: 'forgot-password' })
      });
    } else if (currentScreen === 'forgot-password') {
      attachForgotPasswordEvents(lang, {
        onSendOtp: async (recoveryInput) => {
          const user = findAccountForRecovery(recoveryInput);
          if (!user) return false;

          const res = await recoveryProvider.requestOtp(user, recoveryInput);
          if (!res.success) {
            showToast(res.message || 'Unable to request OTP.');
            return false;
          }

          this.setState({
            recoveryUser: user,
            recoveryTarget: res.target,
            otpDevHint: res.otpDevHint,
            recoveryProviderNotice: res.providerNotice,
            isResetSuccess: false,
            currentScreen: 'otp'
          });

          showToast(`OTP generated for ${res.target}`);
          return true;
        },
        onGotoLogin: () => this.setState({ currentScreen: 'login' })
      });
    } else if (currentScreen === 'otp') {
      attachOtpEvents(lang, {
        onVerify: async (code) => {
          const res = await recoveryProvider.verifyOtp(code);
          if (res.success) {
            this.setState({ currentScreen: 'reset-password', isResetSuccess: false });
            showToast('Identity verified! Please set a new password.');
            return { success: true };
          }
          return res;
        },
        onResend: async () => {
          if (this.state.recoveryUser) {
            const res = await recoveryProvider.requestOtp(this.state.recoveryUser, this.state.recoveryTarget);
            if (res.success) {
              this.setState({
                otpDevHint: res.otpDevHint,
                recoveryProviderNotice: res.providerNotice
              });
              showToast(`New OTP sent to ${res.target}`);
            } else {
              showToast(res.message);
            }
          }
        },
        getRemainingSeconds: () => recoveryProvider.getRemainingSeconds(),
        getFormattedTime: () => recoveryProvider.getFormattedTime(),
        onGotoLogin: () => this.setState({ currentScreen: 'login', recoveryUser: null })
      });
    } else if (currentScreen === 'reset-password') {
      attachResetPasswordEvents(lang, {
        onResetSubmit: async (newPassword) => {
          if (this.state.recoveryUser) {
            await updateUserPassword(this.state.recoveryUser.id, newPassword);
            this.setState({
              isResetSuccess: true
            });
            showToast('Password reset successfully!');
          }
        },
        onGotoLogin: () => {
          this.setState({
            recoveryUser: null,
            recoveryTarget: '',
            otpDevHint: '',
            isResetSuccess: false,
            currentScreen: 'login'
          });
        }
      });
    } else if (currentScreen === 'create-vault') {
      attachCreateVaultEvents({
        onCreateVault: (password) => {
          const meta = { vaultCreated: true, masterPassword: password, autolock: 15 };
          saveVaultMeta(meta);

          this.setState({
            vaultCreated: true,
            masterPassword: password,
            isUnlocked: true,
            currentScreen: 'dashboard'
          });

          showToast('Master Vault created successfully!');
        }
      });
    } else if (currentScreen === 'unlock') {
      attachUnlockEvents(this.state, {
        onUnlock: () => {
          showToast('Vault Unlocked!');
          this.setState({ isUnlocked: true, currentScreen: 'dashboard' });
        },
        onGotoLogin: () => this.setState({ currentScreen: 'login' }),
        onGotoForgot: () => this.setState({ currentScreen: 'forgot-password' })
      });
    } else if (currentScreen === 'dashboard') {
      attachDashboardEvents(this.state, {
        onSearch: (query) => this.setState({ searchQuery: query }),
        onCategorySelect: (cat) => this.setState({ selectedCategory: cat }),
        onToggleUnmask: (id) => {
          const current = !!this.state.unmaskedCards[id];
          this.setState({
            unmaskedCards: { ...this.state.unmaskedCards, [id]: !current }
          });
        },
        onCopyPassword: (password, accountName) => this.copyToClipboard(password, accountName),
        onEditAccount: (id) => this.editAccount(id),
        onDeleteAccount: (id) => this.deleteAccount(id),
        onOpenAddModal: () => this.setState({ isAddModalOpen: true, editingAccount: null }),
        onOpenSettingsModal: () => this.setState({ isSettingsModalOpen: true })
      });
    }

    // Modal Events
    if (this.state.isAddModalOpen) {
      attachAddAccountEvents({
        onSaveAccount: (accountData, isEdit) => {
          this.saveAccountRecord(accountData, isEdit);
        },
        onCloseModal: () => this.setState({ isAddModalOpen: false, editingAccount: null })
      });
    }

    if (this.state.isSettingsModalOpen) {
      attachSettingsEvents(this.state, {
        onCloseModal: () => this.setState({ isSettingsModalOpen: false }),
        onChangeLanguage: (newLang) => {
          localStorage.setItem('lockly_lang', newLang);
          this.setState({ lang: newLang });
          showToast(`Language changed to ${newLang.toUpperCase()}`);
        },
        onChangeTheme: (newTheme) => {
          localStorage.setItem('lockly_theme', newTheme);
          this.setState({ theme: newTheme });
          showToast(`Theme changed to ${newTheme.toUpperCase()}`);
        },
        onChangeMode: (newMode) => {
          localStorage.setItem('lockly_mode', newMode);
          this.setState({ mode: newMode });
          showToast(`Mode switched to ${newMode.toUpperCase()}`);
        },
        onResetVault: () => {
          resetVaultStorage();
          const freshAccounts = getStoredAccounts();
          const meta = getVaultMeta();
          
          this.setState({
            accounts: freshAccounts,
            vaultCreated: meta.vaultCreated,
            masterPassword: meta.masterPassword,
            unmaskedCards: {},
            searchQuery: '',
            selectedCategory: 'all',
            isSettingsModalOpen: false
          });
          showToast('Vault storage reset to initial defaults.');
        },
        onPromptLogout: () => this.setState({ isLogoutModalOpen: true }),
        onChangeMasterPassword: (current, newPass) => {
          if (current !== this.state.masterPassword && this.state.masterPassword) {
            return false;
          }
          const meta = getVaultMeta();
          meta.masterPassword = newPass;
          saveVaultMeta(meta);
          this.setState({ masterPassword: newPass });
          showToast('Master password updated successfully!');
          return true;
        }
      });
    }

    // Logout Modal Events
    if (this.state.isLogoutModalOpen) {
      attachLogoutEvents({
        onConfirm: () => this.logout(),
        onCancel: () => this.setState({ isLogoutModalOpen: false })
      });
    }

    // Profile Modal Events
    if (this.state.isProfileModalOpen) {
      attachProfileEvents({
        onClose: () => this.setState({ isProfileModalOpen: false })
      });
    }

    // Security Modal Events
    if (this.state.isSecurityModalOpen) {
      attachSecurityEvents({
        onClose: () => this.setState({ isSecurityModalOpen: false })
      });
    }
  }

  // Save/Update Account Helper
  saveAccountRecord(accountData, isEdit) {
    let updatedAccounts;
    if (isEdit) {
      updatedAccounts = this.state.accounts.map(a => a.id === accountData.id ? accountData : a);
    } else {
      updatedAccounts = [accountData, ...this.state.accounts];
    }

    saveStoredAccounts(updatedAccounts);

    this.setState({
      accounts: updatedAccounts,
      isAddModalOpen: false,
      editingAccount: null
    });

    showToast(`${isEdit ? 'Updated' : 'Saved'} credentials for ${accountData.name}!`);
  }

  // Open Edit Mode for an existing account
  editAccount(id) {
    const acc = this.state.accounts.find(a => a.id === id);
    if (acc) {
      this.setState({
        editingAccount: acc,
        isAddModalOpen: true
      });
    }
  }

  // Delete Account Helper
  deleteAccount(id) {
    const acc = this.state.accounts.find(a => a.id === id);
    const name = acc ? acc.name : 'Account';
    if (confirm(`Are you sure you want to remove ${name} from your vault?`)) {
      const updated = this.state.accounts.filter(a => a.id !== id);
      saveStoredAccounts(updated);

      this.setState({ accounts: updated });
      showToast(`Removed ${name} from vault.`);
    }
  }

  // Navigation Guard & Router
  navigate(screen) {
    if (screen === 'dashboard' && !this.state.isUnlocked) {
      this.setState({ currentScreen: 'unlock' });
      return;
    }
    this.setState({ currentScreen: screen });
  }

  // Lock Vault Action
  lockVault() {
    this.setState({
      isUnlocked: false,
      unmaskedCards: {},
      currentScreen: 'unlock'
    });
    showToast('Vault Locked for Security');
  }

  // Log Out Action
  logout() {
    this.setState({
      isUnlocked: false,
      currentUser: null,
      unmaskedCards: {},
      recoveryUser: null,
      isLogoutModalOpen: false,
      isSettingsModalOpen: false,
      isProfileModalOpen: false,
      isSecurityModalOpen: false,
      currentScreen: 'login'
    });
    showToast('Logged out successfully.');
  }

  // Clipboard Helper
  copyToClipboard(text, accountName) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${accountName} password to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(text, accountName);
      });
    } else {
      this.fallbackCopy(text, accountName);
    }
  }

  fallbackCopy(text, accountName) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`Copied ${accountName} password!`);
  }
}

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.locklyApp = new LocklyApp();
});
