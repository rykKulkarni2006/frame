/**
 * SECURE OTP RECOVERY PROVIDER
 * Student Learning Note: Implements cryptographically secure OTP generation,
 * SHA-256 hash comparison, 5-minute expiry, rate-limiting, attempt-limiting,
 * target masking, and real vs. development provider abstraction.
 */

import { hashPassword } from '../utils/crypto.js';

class SecureRecoveryProvider {
  constructor() {
    this.session = null;
    this.requestHistory = []; // Tracks timestamps for rate limiting: [{ target, timestamp }]
  }

  /**
   * Helper to mask email address: e.g. alex.developer@gmail.com -> a***r@gmail.com
   */
  maskEmail(email) {
    if (!email || !email.includes('@')) return email || '';
    const [user, domain] = email.toLowerCase().split('@');
    if (user.length <= 2) {
      return `${user[0]}***@${domain}`;
    }
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  }

  /**
   * Helper to mask phone number: e.g. 9876543210 -> ******3210
   */
  maskPhone(phone) {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length <= 4) return '****' + digits;
    const lastFour = digits.slice(-4);
    const maskedPrefix = '*'.repeat(Math.max(digits.length - 4, 6));
    return maskedPrefix + lastFour;
  }

  /**
   * Check rate limit: max 3 OTP requests per 15 minutes per target
   */
  isRateLimited(target) {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    // Purge older records
    this.requestHistory = this.requestHistory.filter(r => now - r.timestamp < windowMs);
    const targetRequests = this.requestHistory.filter(r => r.target === target);
    return targetRequests.length >= 3;
  }

  /**
   * Request OTP for a registered user account
   */
  async requestOtp(user, inputTarget) {
    const isEmail = inputTarget.includes('@') || (user.email && user.email.toLowerCase() === inputTarget.toLowerCase());
    const rawTarget = isEmail ? user.email : user.phone;
    const targetType = isEmail ? 'email' : 'phone';

    // 1. Rate Limiting Check
    if (this.isRateLimited(rawTarget)) {
      return {
        success: false,
        reason: 'rate_limited',
        message: 'Too many OTP requests. For security, please wait 15 minutes before requesting again.'
      };
    }

    // 2. Resend Cooldown Check
    if (this.session && this.session.targetRaw === rawTarget && Date.now() < this.session.resendCooldownUntil) {
      const waitSec = Math.ceil((this.session.resendCooldownUntil - Date.now()) / 1000);
      return {
        success: false,
        reason: 'cooldown',
        message: `Please wait ${waitSec} seconds before requesting a new OTP.`
      };
    }

    // 3. Generate Cryptographically Secure 6-Digit OTP
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const otpCode = String(100000 + (array[0] % 900000));

    // 4. Hash OTP with SHA-256 for secure in-memory verification
    const otpHash = await hashPassword(otpCode);

    // 5. Mask target for safe presentation
    const maskedTarget = isEmail ? this.maskEmail(rawTarget) : this.maskPhone(rawTarget);

    // 6. Record timestamp for rate-limiting
    this.requestHistory.push({ target: rawTarget, timestamp: Date.now() });

    // 7. Store secure verification session (NO plaintext OTP stored)
    const expiresInSeconds = 5 * 60; // 5 minutes expiry
    this.session = {
      userId: user.id,
      targetRaw: rawTarget,
      maskedTarget,
      targetType,
      otpHash,
      createdAt: Date.now(),
      expiresAt: Date.now() + expiresInSeconds * 1000,
      attempts: 0,
      maxAttempts: 3,
      resendCooldownUntil: Date.now() + 60 * 1000 // 60 seconds cooldown
    };

    // 8. Provider Configuration Check
    // In production, backend reads EMAIL_PROVIDER_API_KEY or SMS_PROVIDER_API_KEY
    // Here we explicitly declare development mode since external keys are not configured.
    const isProviderConfigured = false;
    const providerNotice = isEmail
      ? 'Email OTP provider is not configured (EMAIL_PROVIDER_API_KEY required).'
      : 'SMS OTP provider is not configured (SMS_PROVIDER_API_KEY required).';

    return {
      success: true,
      target: maskedTarget,
      targetType,
      isConfigured: isProviderConfigured,
      providerNotice,
      // In development mode, provide simulated testing hint so user can test UI flows locally:
      devMode: true,
      otpDevHint: otpCode,
      expiresInSeconds
    };
  }

  /**
   * Verify entered OTP code
   */
  async verifyOtp(enteredCode) {
    if (!this.session) {
      return {
        success: false,
        reason: 'no_session',
        message: 'No active OTP verification session. Please request a new code.'
      };
    }

    // Check expiry
    if (Date.now() > this.session.expiresAt) {
      this.session = null;
      return {
        success: false,
        reason: 'expired',
        message: 'OTP has expired (valid for 5 minutes). Please request a new code.'
      };
    }

    // Check max attempts
    if (this.session.attempts >= this.session.maxAttempts) {
      this.session = null;
      return {
        success: false,
        reason: 'max_attempts',
        message: 'Maximum attempts (3) reached. For security, this OTP is invalidated. Please request a new code.'
      };
    }

    this.session.attempts++;

    // Hash entered code and compare with secure stored hash
    const inputHash = await hashPassword(enteredCode.trim());

    if (inputHash === this.session.otpHash) {
      const verifiedUserId = this.session.userId;
      // Single-use: immediately invalidate OTP session after successful verification
      this.session = null;

      return {
        success: true,
        userId: verifiedUserId,
        verificationToken: 'vtok-' + Date.now()
      };
    }

    const remaining = this.session.maxAttempts - this.session.attempts;
    if (remaining <= 0) {
      this.session = null;
      return {
        success: false,
        reason: 'max_attempts',
        message: 'Maximum attempts reached. For security, this OTP is invalidated. Please request a new code.'
      };
    }

    return {
      success: false,
      reason: 'invalid',
      remainingAttempts: remaining,
      message: `Invalid OTP code. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`
    };
  }

  /**
   * Get active countdown seconds (0 to 300)
   */
  getRemainingSeconds() {
    if (!this.session) return 0;
    const diff = Math.ceil((this.session.expiresAt - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  }

  /**
   * Get formatted countdown string (e.g. "04:32")
   */
  getFormattedTime() {
    const totalSec = this.getRemainingSeconds();
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  /**
   * Check if resend cooldown is active
   */
  canResend() {
    if (!this.session) return true;
    return Date.now() >= this.session.resendCooldownUntil;
  }
}

export const recoveryProvider = new SecureRecoveryProvider();
