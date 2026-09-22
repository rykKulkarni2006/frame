/**
 * LOCKLY INTERNATIONALIZATION (i18n) DICTIONARIES
 * Student Learning Note: Provides translations for English (en), Hindi (hi), and Marathi (mr).
 * Structured as key-value maps so additional languages can easily be added in the future.
 */

export const TRANSLATIONS = {
  en: {
    // Navigation & General Badges
    brandTagline: "Your Personal Password Vault",
    vaultUnlocked: "Vault Unlocked",
    vaultLocked: "Vault Locked",
    settings: "Settings",
    lockVault: "Lock Vault",
    uiPrototype: "Local Prototype",
    localVaultNotice: "Lockly Local Vault: Client-Side Persistent Storage",

    // Welcome Screen
    welcomeTitle: "Lockly",
    welcomeSubtitle: "Your Personal Password Vault",
    welcomeDesc: "Store credentials for Instagram, GitHub, X/Twitter, and your college accounts in a clean, modern, personal security hub.",
    getStarted: "Get Started",
    loginAccountBtn: "Login to Account",
    createAccountBtn: "Create New Account",
    featureMasterPass: "Master Password",
    featureMasterDesc: "One master key protects your entire credential collection.",
    featureGen: "Password Generator",
    featureGenDesc: "Instantly create strong, random passwords with custom parameters.",
    featureDash: "Clean Dashboard",
    featureDashDesc: "Organized account cards with one-click copy and search filtering.",

    // Authentication & Registration
    registerTitle: "Create Account",
    registerSubtitle: "Register your personal Lockly account",
    usernameLabel: "Username",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number (10 digits)",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
    signUpSubmitBtn: "Create Account ➔",
    alreadyHaveAccount: "Already have an account? Login here",
    invalidEmailMsg: "Please enter a valid email address.",
    invalidPhoneMsg: "Please enter a valid 10-digit phone number.",
    invalidUsernameMsg: "Username must be at least 3 alphanumeric characters.",
    passMismatchMsg: "Passwords do not match!",

    // Login Screen
    loginTitle: "Login to Lockly",
    loginSubtitle: "Enter your registered credentials to access your vault",
    userOrEmailLabel: "Username or Email",
    loginSubmitBtn: "Login to Account 🔓",
    forgotPasswordLink: "Forgot Password?",
    noAccountYet: "Don't have an account yet?",
    signUpLink: "Sign Up",
    loginErrorMsg: "Invalid username/email or password.",

    // Vault Unlock Screen
    unlockTitle: "Unlock Lockly Vault",
    unlockSubtitle: "Enter your vault master password to decrypt credentials",
    unlockSubmitBtn: "Unlock Vault 🔓",
    unlockErrorMsg: "Incorrect master password. Please try again.",

    // Forgot Password & Recovery
    forgotTitle: "Account Recovery",
    forgotSubtitle: "Enter your registered email or phone number to receive an OTP",
    recoveryInputLabel: "Registered Email or Phone Number",
    sendOtpBtn: "Send OTP 📩",
    backToLogin: "Back to Login",
    accountNotFoundMsg: "No account found matching that email or phone number.",

    // OTP Screen
    otpTitle: "Enter OTP Code",
    otpSubtitle: "We sent a 6-digit verification code to",
    verifyOtpBtn: "Verify & Continue ➔",
    resendOtpBtn: "Resend OTP",
    resendInText: "Resend available in",
    secondsText: "seconds",
    maxAttemptsReached: "Maximum OTP attempts reached. Please request a new OTP.",
    invalidOtpMsg: "Invalid OTP code. Please check and try again.",
    otpDevHint: "Dev Mode OTP:",

    // Reset Password Screen
    resetTitle: "Reset Password",
    resetSubtitle: "Create a new secure password for your Lockly account",
    newPasswordLabel: "New Password",
    confirmNewPasswordLabel: "Confirm New Password",
    resetPasswordSubmitBtn: "Reset Password 💾",
    passwordChangedSuccess: "Password changed successfully! Please login with your new password.",

    // Dashboard
    myVault: "My Vault Credentials",
    showingAccounts: "Showing {count} of {total} secured accounts",
    addAccountBtn: "Add Account",
    searchPlaceholder: "Search accounts by name or username (e.g. Instagram, GitHub)...",
    allCat: "All",
    socialCat: "Social",
    developerCat: "Developer",
    personalCat: "Personal",
    noAccountsFound: "No accounts found",
    noAccountsDesc: "Try clearing your search query or add a new account credential.",
    addAccountNow: "Add Account Now",
    updatedDate: "Updated:",

    // Add / Edit Modal
    addTitle: "Add New Credential",
    editTitle: "Edit Credential",
    websiteLabel: "Website / App Name",
    usernameEmailLabel: "Username / Email",
    categoryLabel: "Category",
    generatePassBtn: "⚡ Generate Password",
    notesLabel: "Optional Notes",
    cancelBtn: "Cancel",
    saveAccountBtn: "Save Account 💾",
    updateAccountBtn: "Update Account 💾",

    // Settings Modal
    settingsTitle: "Vault Settings & Customization",
    themeLabel: "Color Theme Accent",
    modeLabel: "Appearance Mode",
    darkMode: "🌙 Dark Security Mode",
    lightMode: "☀️ Clean Light Mode",
    languageLabel: "Application Language",
    statsTitle: "Vault Statistics & Breakdown",
    totalStored: "Total Stored:",
    credentialsCount: "Credentials",
    resetStorageBtn: "🔄 Reset Vault Storage",
    closeBtn: "Close",

    // Themes
    themeEmerald: "Emerald Cyber (Green)",
    themeSapphire: "Sapphire Neon (Blue)",
    themeRuby: "Ruby Crimson (Red)",
    themeViolet: "Violet Nebula (Purple)",
    themeGold: "Gold Vault (Amber)",

    // Account & Security
    logout: "Log Out",
    profile: "Profile",
    securityCenter: "Security Center",
    accountSecurity: "Account & Security",
    changePassword: "Change Master Password",
    confirmLogoutTitle: "Are you sure you want to log out?",
    confirmLogoutDesc: "Your vault will be locked and current session will be closed.",
    cancel: "Cancel"
  },

  hi: { // Hindi (हिन्दी)
    // Navigation & General Badges
    brandTagline: "आपका व्यक्तिगत पासवर्ड वॉल्ट",
    vaultUnlocked: "वॉल्ट अनलॉक है",
    vaultLocked: "वॉल्ट लॉक है",
    settings: "सेटिंग्स",
    lockVault: "वॉल्ट लॉक करें",
    uiPrototype: "लोकल प्रोटोटाइप",
    localVaultNotice: "Lockly लोकल वॉल्ट: सुरक्षित क्लाइंट डेटा",

    // Welcome Screen
    welcomeTitle: "Lockly",
    welcomeSubtitle: "आपका व्यक्तिगत पासवर्ड वॉल्ट",
    welcomeDesc: "Instagram, GitHub, X/Twitter और कॉलेज खातों के क्रेडेंशियल्स को एक सुरक्षित हब में रखें।",
    getStarted: "शुरू करें",
    loginAccountBtn: "खाते में लॉग इन करें",
    createAccountBtn: "नया खाता बनाएं",
    featureMasterPass: "मास्टर पासवर्ड",
    featureMasterDesc: "एक मास्टर कुंजी आपके पूरे पासवर्ड संग्रह की सुरक्षा करती है।",
    featureGen: "पासवर्ड जेनरेटर",
    featureGenDesc: "तुरंत मजबूत और यादृच्छिक पासवर्ड बनाएं।",
    featureDash: "स्वच्छ डैशबोर्ड",
    featureDashDesc: "एक-क्लिक कॉपी और खोज फ़िल्टरिंग के साथ व्यवस्थित कार्ड।",

    // Authentication & Registration
    registerTitle: "खाता बनाएं",
    registerSubtitle: "अपना Lockly व्यक्तिगत खाता पंजीकृत करें",
    usernameLabel: "उपयोगकर्ता नाम (Username)",
    emailLabel: "ईमेल पता (Email)",
    phoneLabel: "फ़ोन नंबर (10 अंक)",
    passwordLabel: "पासवर्ड",
    confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
    signUpSubmitBtn: "खाता बनाएं ➔",
    alreadyHaveAccount: "पहले से खाता है? यहां लॉग इन करें",
    invalidEmailMsg: "कृपया एक वैध ईमेल पता दर्ज करें।",
    invalidPhoneMsg: "कृपया 10 अंकों का वैध फ़ोन नंबर दर्ज करें।",
    invalidUsernameMsg: "उपयोगकर्ता नाम कम से कम 3 अक्षरों का होना चाहिए।",
    passMismatchMsg: "पासवर्ड मेल नहीं खाते!",

    // Login Screen
    loginTitle: "Lockly में लॉग इन करें",
    loginSubtitle: "अपने वॉल्ट तक पहुंचने के लिए क्रेडेंशियल दर्ज करें",
    userOrEmailLabel: "उपयोगकर्ता नाम या ईमेल",
    loginSubmitBtn: "लॉग इन करें 🔓",
    forgotPasswordLink: "पासवर्ड भूल गए?",
    noAccountYet: "अभी तक खाता नहीं है?",
    signUpLink: "साइन अप करें",
    loginErrorMsg: "अमान्य उपयोगकर्ता नाम/ईमेल या पासवर्ड।",

    // Vault Unlock Screen
    unlockTitle: "Lockly वॉल्ट अनलॉक करें",
    unlockSubtitle: "क्रेडेंशियल्स डिक्रिप्ट करने के लिए मास्टर पासवर्ड दर्ज करें",
    unlockSubmitBtn: "वॉल्ट अनलॉक करें 🔓",
    unlockErrorMsg: "गलत मास्टर पासवर्ड। कृपया पुनः प्रयास करें।",

    // Forgot Password & Recovery
    forgotTitle: "खाता रिकवरी",
    forgotSubtitle: "OTP प्राप्त करने के लिए अपना ईमेल या फ़ोन नंबर दर्ज करें",
    recoveryInputLabel: "पंजीकृत ईमेल या फ़ोन नंबर",
    sendOtpBtn: "OTP भेजें 📩",
    backToLogin: "लॉग इन पर वापस जाएं",
    accountNotFoundMsg: "इस ईमेल या फ़ोन नंबर से कोई खाता नहीं मिला।",

    // OTP Screen
    otpTitle: "OTP कोड दर्ज करें",
    otpSubtitle: "हमने 6-अंकीय सत्यापन कोड भेजा है:",
    verifyOtpBtn: "सत्यापित करें और आगे बढ़ें ➔",
    resendOtpBtn: "OTP पुनः भेजें",
    resendInText: "पुनः भेजने का समय:",
    secondsText: "सेकंड",
    maxAttemptsReached: "अधिकतम OTP प्रयास पूर्ण हुए। कृपया नया OTP अनुरोध करें।",
    invalidOtpMsg: "अमान्य OTP कोड। कृपया जाँचें और पुनः प्रयास करें।",
    otpDevHint: "डेव मोड OTP:",

    // Reset Password Screen
    resetTitle: "पासवर्ड रीसेट करें",
    resetSubtitle: "अपने खाता के लिए एक नया मजबूत पासवर्ड बनाएं",
    newPasswordLabel: "नया पासवर्ड",
    confirmNewPasswordLabel: "नए पासवर्ड की पुष्टि करें",
    resetPasswordSubmitBtn: "पासवर्ड रीसेट करें 💾",
    passwordChangedSuccess: "पासवर्ड सफलतापूर्वक बदल दिया गया है! नए पासवर्ड से लॉग इन करें।",

    // Dashboard
    myVault: "मेरे वॉल्ट क्रेडेंशियल्स",
    showingAccounts: "{total} में से {count} सुरक्षित खाते दिख रहे हैं",
    addAccountBtn: "खाता जोड़ें",
    searchPlaceholder: "खाते खोजें (उदा. Instagram, GitHub)...",
    allCat: "सभी",
    socialCat: "सोशल",
    developerCat: "डेवलपर",
    personalCat: "व्यक्तिगत",
    noAccountsFound: "कोई खाते नहीं मिले",
    noAccountsDesc: "अपनी खोज बदलें या नया खाता क्रेडेंशियल जोड़ें।",
    addAccountNow: "अभी खाता जोड़ें",
    updatedDate: "अद्यतन:",

    // Add / Edit Modal
    addTitle: "नया क्रेडेंशियल जोड़ें",
    editTitle: "क्रेडेंशियल संपादित करें",
    websiteLabel: "वेबसाइट / ऐप नाम",
    usernameEmailLabel: "उपयोगकर्ता नाम / ईमेल",
    categoryLabel: "श्रेणी",
    generatePassBtn: "⚡ पासवर्ड जेनरेट करें",
    notesLabel: "वैकल्पिक नोट्स",
    cancelBtn: "रद्द करें",
    saveAccountBtn: "सहेजें 💾",
    updateAccountBtn: "अद्यतन करें 💾",

    // Settings Modal
    settingsTitle: "वॉल्ट सेटिंग्स और अनुकूलन",
    themeLabel: "रंग थीम",
    modeLabel: "दिखावट मोड",
    darkMode: "🌙 डार्क मोड",
    lightMode: "☀️ लाइट मोड",
    languageLabel: "भाषा (Language)",
    statsTitle: "वॉल्ट आंकड़े",
    totalStored: "कुल सहेजे गए:",
    credentialsCount: "क्रेडेंशियल्स",
    resetStorageBtn: "🔄 वॉल्ट डेटा रीसेट करें",
    closeBtn: "बंद करें",

    // Themes
    themeEmerald: "एमराल्ड साइबर (हरा)",
    themeSapphire: "सेफायर नियॉन (नीला)",
    themeRuby: "रूबी क्रिमसन (लाल)",
    themeViolet: "वायलेट नेबुला (बैंगनी)",
    themeGold: "गोल्ड वॉल्ट (सुनहरा)",

    // Account & Security
    logout: "लॉग आउट",
    profile: "प्रोफ़ाइल",
    securityCenter: "सुरक्षा केंद्र",
    accountSecurity: "खाता और सुरक्षा",
    changePassword: "मास्टर पासवर्ड बदलें",
    confirmLogoutTitle: "क्या आप वाकई लॉग आउट करना चाहते हैं?",
    confirmLogoutDesc: "आपका वॉल्ट लॉक हो जाएगा और वर्तमान सत्र समाप्त हो जाएगा।",
    cancel: "रद्द करें"
  },

  mr: { // Marathi (मराठी)
    // Navigation & General Badges
    brandTagline: "तुमचा वैयक्तिक पासवर्ड वॉल्ट",
    vaultUnlocked: "वॉल्ट अनलॉक आहे",
    vaultLocked: "वॉल्ट लॉक आहे",
    settings: "सेटिंग्ज",
    lockVault: "वॉल्ट लॉक करा",
    uiPrototype: "लोकल प्रोटोटाइप",
    localVaultNotice: "Lockly लोकल वॉल्ट: सुरक्षित क्लायंट डेटा",

    // Welcome Screen
    welcomeTitle: "Lockly",
    welcomeSubtitle: "तुमचा वैयक्तिक पासवर्ड वॉल्ट",
    welcomeDesc: "Instagram, GitHub, X/Twitter आणि कॉलेज खात्यांचे पासवर्ड एका सुरक्षित हबमध्ये सुरक्षित ठेवा.",
    getStarted: "शुरुवात करा",
    loginAccountBtn: "खात्यात लॉगिन करा",
    createAccountBtn: "नवीन खाते तयार करा",
    featureMasterPass: "मास्टर पासवर्ड",
    featureMasterDesc: "एक मास्टर की तुमच्या सर्व पासवर्ड संग्रहाचे संरक्षण करते.",
    featureGen: "पासवर्ड जनरेटर",
    featureGenDesc: "झटपट मजबूत आणि यादृच्छिक पासवर्ड तयार करा.",
    featureDash: "स्वच्छ डॅशबोर्ड",
    featureDashDesc: "एक-क्लिक कॉपी आणि शोध वैशिष्ट्यासह व्यवस्थित कार्ड्स.",

    // Authentication & Registration
    registerTitle: "खाते तयार करा",
    registerSubtitle: "तुमचे वैयक्तिक Lockly खाते नोंदणीकृत करा",
    usernameLabel: "वापरकर्ता नाव (Username)",
    emailLabel: "ईमेल पत्ता (Email)",
    phoneLabel: "फोन नंबर (10 अंक)",
    passwordLabel: "पासवर्ड",
    confirmPasswordLabel: "पासवर्डची खात्री करा",
    signUpSubmitBtn: "खाते तयार करा ➔",
    alreadyHaveAccount: "आधीपासून खाते आहे? येथे लॉगिन करा",
    invalidEmailMsg: "कृपया वैध ईमेल पत्ता प्रविष्ट करा.",
    invalidPhoneMsg: "कृपया 10 अंकी वैध फोन नंबर प्रविष्ट करा.",
    invalidUsernameMsg: "वापरकर्ता नाव किमान 3 अक्षरांचे असावे.",
    passMismatchMsg: "पासवर्ड जुळत नाहीत!",

    // Login Screen
    loginTitle: "Lockly मध्ये लॉगिन करा",
    loginSubtitle: "तुमच्या वॉल्टमध्ये प्रवेश करण्यासाठी क्रेडेंशियल प्रविष्ट करा",
    userOrEmailLabel: "वापरकर्ता नाव किंवा ईमेल",
    loginSubmitBtn: "लॉगिन करा 🔓",
    forgotPasswordLink: "पासवर्ड विसरलात?",
    noAccountYet: "अजून खाते नाही?",
    signUpLink: "साइन अप करा",
    loginErrorMsg: "अवैध वापरकर्ता नाव/ईमेल किंवा पासवर्ड.",

    // Vault Unlock Screen
    unlockTitle: "Lockly वॉल्ट अनलॉक करा",
    unlockSubtitle: "क्रेडेंशियल्स अनलॉक करण्यासाठी मास्टर पासवर्ड टाका",
    unlockSubmitBtn: "वॉल्ट अनलॉक करा 🔓",
    unlockErrorMsg: "चुकीचा मास्टर पासवर्ड. कृपया पुन्हा प्रयत्न करा.",

    // Forgot Password & Recovery
    forgotTitle: "खाते रिकव्हरी",
    forgotSubtitle: "OTP मिळवण्यासाठी नोंदणीकृत ईमेल किंवा फोन नंबर प्रविष्ट करा",
    recoveryInputLabel: "नोंदणीकृत ईमेल किंवा फोन नंबर",
    sendOtpBtn: "OTP पाठवा 📩",
    backToLogin: "लॉगिनवर परत जा",
    accountNotFoundMsg: "या ईमेल किंवा फोन नंबरशी जुळणारे खाते आढळले नाही.",

    // OTP Screen
    otpTitle: "OTP कोड प्रविष्ट करा",
    otpSubtitle: "आम्ही 6-अंकी पडताळणी कोड पाठवला आहे:",
    verifyOtpBtn: "पडताळणी करा आणि पुढे जा ➔",
    resendOtpBtn: "OTP पुन्हा पाठवा",
    resendInText: "पुन्हा पाठवण्याची वेळ:",
    secondsText: "सेकंद",
    maxAttemptsReached: "कमाल OTP प्रयत्न पूर्ण झाले. कृपया नवीन OTP ची विनंती करा.",
    invalidOtpMsg: "अवैध OTP कोड. कृपया तपासा आणि पुन्हा प्रयत्न करा.",
    otpDevHint: "डेव्ह मोड OTP:",

    // Reset Password Screen
    resetTitle: "पासवर्ड रीसेट करा",
    resetSubtitle: "तुमच्या खात्यासाठी नवीन मजबूत पासवर्ड तयार करा",
    newPasswordLabel: "नवीन पासवर्ड",
    confirmNewPasswordLabel: "नवीन पासवर्डची खात्री करा",
    resetPasswordSubmitBtn: "पासवर्ड रीसेट करा 💾",
    passwordChangedSuccess: "पासवर्ड यशस्वीरित्या बदलला आहे! नवीन पासवर्डने लॉगिन करा.",

    // Dashboard
    myVault: "माझे वॉल्ट क्रेडेंशियल्स",
    showingAccounts: "{total} पैकी {count} सुरक्षित खाती दिसत आहेत",
    addAccountBtn: "खाते जोडा",
    searchPlaceholder: "खाती शोधा (उदा. Instagram, GitHub)...",
    allCat: "सर्व",
    socialCat: "सोशल",
    developerCat: "डेव्हलपर",
    personalCat: "वैयक्तिक",
    noAccountsFound: "कोणतीही खाती आढळली नाहीत",
    noAccountsDesc: "तुमचा शोध बदला किंवा नवीन खाते क्रेडेंशियल जोडा.",
    addAccountNow: "आत्ता खाते जोडा",
    updatedDate: "अद्यतनित:",

    // Add / Edit Modal
    addTitle: "नवीन क्रेडेंशियल जोडा",
    editTitle: "क्रेडेंशियल संपादन करा",
    websiteLabel: "वेबसाइट / ॲप नाव",
    usernameEmailLabel: "वापरकर्ता नाव / ईमेल",
    categoryLabel: "वर्ग",
    generatePassBtn: "⚡ पासवर्ड जनरेट करा",
    notesLabel: "पर्यायी नोट्स",
    cancelBtn: "रद्द करा",
    saveAccountBtn: "साठवा 💾",
    updateAccountBtn: "अद्यतनित करा 💾",

    // Settings Modal
    settingsTitle: "वॉल्ट सेटिंग्ज आणि सानुकूलन",
    themeLabel: "रंग थीम",
    modeLabel: "देखावा मोड",
    darkMode: "🌙 डार्क मोड",
    lightMode: "☀️ लाईट मोड",
    languageLabel: "भाषा (Language)",
    statsTitle: "वॉल्ट आकडेवारी",
    totalStored: "एकूण साठवलेले:",
    credentialsCount: "क्रेडेंशियल्स",
    resetStorageBtn: "🔄 वॉल्ट डेटा रीसेट करा",
    closeBtn: "बंद करा",

    // Themes
    themeEmerald: "एमराल्ड सायबर (हिरवा)",
    themeSapphire: "सॅफायर नॉयॉन (निळा)",
    themeRuby: "रुबी क्रिमसन (लाल)",
    themeViolet: "व्हायोलेट नेबुला (जांभळा)",
    themeGold: "गोल्ड वॉल्ट (सोनेरी)",

    // Account & Security
    logout: "लॉग आउट",
    profile: "प्रोफाइल",
    securityCenter: "सुरक्षा केंद्र",
    accountSecurity: "खाते आणि सुरक्षा",
    changePassword: "मास्टर पासवर्ड बदला",
    confirmLogoutTitle: "तुम्हाला खात्री आहे की तुम्ही लॉग आउट करू इच्छिता?",
    confirmLogoutDesc: "तुमचा वॉल्ट लॉक केला जाईल आणि सध्याचे सत्र बंद होईल.",
    cancel: "रद्द करा"
  }
};

/**
 * i18n Translation Helper
 * Returns translated string for key in given language, fallback to English.
 */
export function t(key, lang = 'en', vars = {}) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || key;

  // Replace variable placeholders like {count} or {total}
  Object.keys(vars).forEach(v => {
    text = text.replace(new RegExp(`\\{${v}\\}`, 'g'), vars[v]);
  });

  return text;
}
