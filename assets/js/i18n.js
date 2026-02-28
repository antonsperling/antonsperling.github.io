// Internationalization (i18n) support
(function () {
  window.i18n = {
    currentLang: 'en',
    availableLangs: ['en', 'de', 'it', 'nl', 'fr', 'tr', 'ru', 'uk'],
    langNames: {
      en: 'English',
      de: 'Deutsch',
      it: 'Italiano',
      nl: 'Nederlands',
      fr: 'Français',
      tr: 'Türkçe',
      ru: 'Русский',
      uk: 'Українська'
    }
  };

  // Get user's preferred language (from localStorage, browser, or default to 'en')
  function getPreferredLanguage() {
    // Check localStorage first
    var stored = localStorage.getItem('site_language');
    if (stored && window.i18n.availableLangs.indexOf(stored) !== -1) {
      return stored;
    }

    // Check browser language
    var browserLang = navigator.language || navigator.userLanguage;
    var browserLangCode = browserLang.substring(0, 2);
    if (browserLangCode && window.i18n.availableLangs.indexOf(browserLangCode) !== -1) {
      return browserLangCode;
    }

    // Default to English
    return 'en';
  }

  // Set language and update page
  function setLanguage(lang) {
    if (window.i18n.availableLangs.indexOf(lang) === -1) return;

    window.i18n.currentLang = lang;
    localStorage.setItem('site_language', lang);

    // Update all elements with data-i18n attributes
    updatePageTranslations();

    // Update language switcher button
    var langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      var nextLangIdx = (window.i18n.availableLangs.indexOf(lang) + 1) % window.i18n.availableLangs.length;
      var nextLang = window.i18n.availableLangs[nextLangIdx];
      langBtn.textContent = window.i18n.langNames[nextLang];
    }
  }

  // Update all translated elements on the page
  function updatePageTranslations() {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var translation = getTranslation(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // Handle cookie banner separately since it has HTML content
    updateCookieBanner();
  }

  // Get translation from the translations object
  function getTranslation(key) {
    if (!window.translations || !window.translations[window.i18n.currentLang]) {
      return null;
    }

    var keys = key.split('.');
    var value = window.translations[window.i18n.currentLang];

    for (var i = 0; i < keys.length; i++) {
      value = value[keys[i]];
      if (!value) return null;
    }

    return value;
  }

  // Update cookie banner text (special handling for HTML)
  function updateCookieBanner() {
    var message = getTranslation('cookie.message');
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');
    var privacyLink = getTranslation('cookie.privacy_link');

    if (message) {
      var messageSpan = document.querySelector('[data-i18n="cookie.message"]');
      if (messageSpan) {
        messageSpan.textContent = message;
      }
    }

    if (acceptBtn) {
      var acceptText = getTranslation('cookie.accept');
      if (acceptText) acceptBtn.textContent = acceptText;
    }

    if (declineBtn) {
      var declineText = getTranslation('cookie.decline');
      if (declineText) declineBtn.textContent = declineText;
    }
  }

  // Initialize on page load
  // Initialize on page load
  window.addEventListener('DOMContentLoaded', function () {
    var preferredLang = getPreferredLanguage();
    setLanguage(preferredLang);

    // Set up language switcher button
    var langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        var currentIdx = window.i18n.availableLangs.indexOf(window.i18n.currentLang);
        var nextIdx = (currentIdx + 1) % window.i18n.availableLangs.length;
        var nextLang = window.i18n.availableLangs[nextIdx];
        setLanguage(nextLang);
      });
    }
  });

  // Expose setLanguage for external use
  window.setLanguage = setLanguage;
})();
