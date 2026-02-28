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
    },
    langFlags: {
      en: '🇬🇧',
      de: '🇩🇪',
      it: '🇮🇹',
      nl: '🇳🇱',
      fr: '🇫🇷',
      tr: '🇹🇷',
      ru: '🇷🇺',
      uk: '🇺🇦'
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

    // Update dropdown if it exists
    var langDropdown = document.getElementById('lang-switch-dropdown');
    if (langDropdown) {
      langDropdown.value = lang;
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
  window.addEventListener('DOMContentLoaded', function () {
    var preferredLang = getPreferredLanguage();
    setLanguage(preferredLang);

    // Set up language switcher dropdown
    var langDropdown = document.getElementById('lang-switch-dropdown');
    if (langDropdown) {
      // Populate dropdown options
      window.i18n.availableLangs.forEach(function(lang) {
        var option = document.createElement('option');
        option.value = lang;
        option.textContent = window.i18n.langFlags[lang] + ' ' + window.i18n.langNames[lang];
        langDropdown.appendChild(option);
      });
      
      // Set current language
      langDropdown.value = preferredLang;
      
      // Add change event listener
      langDropdown.addEventListener('change', function () {
        setLanguage(this.value);
      });
    }
  });

  // Expose setLanguage for external use
  window.setLanguage = setLanguage;
  
  // Expose getTranslation for external use
  window.getTranslation = getTranslation;

  // Helper function to get translation for an object with language keys
  window.getLocalizedValue = function(obj, lang) {
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object' && obj !== null) {
      return obj[lang] || obj['en'] || null;
    }
    return null;
  };

  // Helper function to filter blog posts by current language
  window.filterPostsByLanguage = function(posts, lang) {
    if (!posts) return [];
    return posts.filter(function(post) {
      return post.lang === lang;
    });
  };
})();
