(function(){
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var accepted = localStorage.getItem('ft_cookie_accept');
  if (!accepted) banner.style.display = 'block';
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  acceptBtn.addEventListener('click', function(){
    localStorage.setItem('ft_cookie_accept', 'yes');
    banner.style.display = 'none';
    document.dispatchEvent(new Event('cookieConsentGiven'));
  });
  declineBtn.addEventListener('click', function(){
    localStorage.setItem('ft_cookie_accept', 'no');
    banner.style.display = 'none';
  });
})();
