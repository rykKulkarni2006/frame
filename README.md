# 🔒 Lockly – Your Personal Security Vault

Lockly is a modern password manager built to securely organize and manage your digital credentials. Instead of being just another password saver, Lockly focuses on **security, account recovery, activity tracking, and password health insights** while maintaining a clean and minimal user experience.

> **Status:** Under Development (Frontend + Security Features in Progress)

---

## ✨ Features

### 🔐 Secure Authentication

* Create an account using:

  * Username
  * Email
  * Mobile Number
  * Password
* Secure login system
* Password visibility toggle
* Session-based authentication
* Logout functionality

### 📩 OTP Account Recovery

Recover your account using:

* Email OTP
* Mobile OTP (SMS)

Recovery Flow:

1. Forgot Password
2. Enter registered email or phone
3. Receive OTP
4. Verify OTP
5. Reset password
6. Login again

---

## 🛡 Security Center

Lockly includes a dedicated Security Center that helps users improve their password hygiene.

### Security Score

* Overall password health score

### Password Health

* Weak passwords
* Reused passwords
* Old passwords

### Security Recommendations

Examples:

* Change weak passwords
* Replace reused passwords
* Update old credentials

---

## 📜 Security Activity

Track important account events such as:

* Account created
* Login successful
* Failed login attempts
* Password changed
* Account edited
* Account deleted
* Vault locked/unlocked
* Recovery requested
* OTP events
* Logout

Each activity includes:

* Date
* Time
* Event type
* Safe metadata

---

## 🔑 Password Vault

Store credentials securely with features like:

* Add accounts
* Edit accounts
* Delete accounts
* Search accounts
* Category filters
* Show/Hide passwords
* Copy password
* Password generator

Supported categories include:

* Social
* Developer
* Personal
* Custom categories

---

## 🎨 Modern UI

### Dark Mode

* Premium dark interface
* Green Lockly accent
* Clean dashboard

### Light Mode

* White header
* Clean minimal background
* Professional card layout
* Consistent styling

---

## 🌍 Multi-Language Support

Supported languages:

* English
* Hindi
* Marathi

Language preference is saved for future sessions.

---

## ⚙ Settings

The Settings panel includes:

### Appearance

* Light Mode
* Dark Mode
* Themes

### Language

* English
* Hindi
* Marathi

### Account

* Profile
* Change Password
* Security options
* Logout

---

## 🔐 Security Principles

Lockly is designed with security-first architecture.

### Current Security Goals

* Password hashing
* Secure session management
* OTP verification
* Rate limiting
* Vault encryption architecture
* Separate account recovery from vault recovery

### Never Store

* Plaintext passwords
* Plaintext OTPs
* API keys
* Session secrets

---

## 🚀 Tech Stack

| Technology | Purpose           |
| ---------- | ----------------- |
| React      | Frontend          |
| JavaScript | Application Logic |
| Node.js    | Runtime           |
| npm        | Package Manager   |
| CSS        | UI Styling        |

> Additional backend/database technologies will be integrated during later development phases.

---

## 📂 Project Structure

```text
Lockly/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── styles/
│   └── utils/
│
├── package.json
├── README.md
└── ...
```

---

## ▶ Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
npm install
```

### Run the Project

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📋 Development Roadmap

### Phase 1 (Completed/In Progress)

* [x] Lockly UI
* [x] Dashboard
* [x] Vault layout
* [x] Add Account
* [x] Search
* [x] Password generator
* [x] Dark Mode
* [x] Light Mode improvements

### Phase 2

* [ ] Backend integration
* [ ] Database
* [ ] Secure authentication
* [ ] Email OTP
* [ ] Mobile OTP
* [ ] Account recovery

### Phase 3

* [ ] Security Center
* [ ] Activity history
* [ ] Password health detection
* [ ] Recovery codes

### Phase 4

* [ ] Multi-device sync
* [ ] Browser extension
* [ ] Mobile app
* [ ] Public deployment

---

## 💡 Future Features

* Secure Notes
* Developer Vault
* Temporary credential sharing
* Emergency Lock
* Passkey support
* Browser Autofill
* Cross-device synchronization
* Advanced Security Analytics

---

## 📸 Screens

Current screens include:

* Landing Page
* Login / Unlock Screen
* Dashboard
* Add Account
* Settings
* Security Center (In Progress)
* Recovery Flow (In Progress)

---

## 🤝 Contributing

Contributions, ideas, and security suggestions are welcome as Lockly continues to evolve into a secure personal password management platform.

---

## 👨‍💻 Developer

**Aaditya Ramhari Phapal**

* Full Stack Developer
* NMIET
* Lockly Creator

---

## 📄 License

This project is currently developed for learning, portfolio, and future production expansion. A formal license can be added before public release.
