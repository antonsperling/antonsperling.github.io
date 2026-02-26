// Cookie consent with smooth auto-close and cross-tab sync
(function () {
  // if this script is accidentally included twice (or executed again), do nothing
  if (window.__cookieConsentInit) return;
  window.__cookieConsentInit = true;

  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  // Show banner only if no decision yet.  Read value each time so
  // any synchronous changes are respected.
  function shouldShowBanner() {
    var val = localStorage.getItem('ft_cookie_accept');
    return !(val === 'yes' || val === 'no');
  }

  if (shouldShowBanner()) {
    banner.style.display = 'block';
    console.log('cookie-banner: showing (no consent yet)');
  }

  // Small helper to fade out then hide
  function fadeOutAndHide(el, duration) {
    duration = duration || 300;
    el.style.transition = 'opacity ' + duration + 'ms ease, transform ' + duration + 'ms ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    // trigger a reflow so transition runs on some browsers
    /* eslint-disable no-unused-expressions */
    el.offsetHeight;
    /* eslint-enable no-unused-expressions */
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(function () {
      el.style.display = 'none';
      // Clean up inline styles we added (keep markup simple)
      el.style.transition = '';
      el.style.opacity = '';
      el.style.transform = '';
    }, duration + 10);
  }

  // Safe click handlers (guard for missing elements)
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      try {
        localStorage.setItem('ft_cookie_accept', 'yes');
      } catch (e) {
        console.warn('cookie-banner: failed to save consent', e);
      }
      fadeOutAndHide(banner, 300);
      document.dispatchEvent(new Event('cookieConsentGiven'));
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      try {
        localStorage.setItem('ft_cookie_accept', 'no');
      } catch (e) {
        console.warn('cookie-banner: failed to save decline', e);
      }
      fadeOutAndHide(banner, 300);
    });
  }

  // If another tab/window changes consent, close banner here too
  window.addEventListener('storage', function (ev) {
    if (ev.key === 'ft_cookie_accept' && (ev.newValue === 'yes' || ev.newValue === 'no')) {
      // If banner still visible, close it
      if (banner.style.display !== 'none') {
        fadeOutAndHide(banner, 250);
      }
    }
  });

  // Optional: if acceptance was already given, ensure banner hidden (defensive)
  if (accepted === 'yes' || accepted === 'no') {
    banner.style.display = 'none';
  }
})();