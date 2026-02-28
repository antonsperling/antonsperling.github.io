---
layout: default
title: "Full Trottel Racing"
permalink: /
---

<div class="hero-logo">
  <img src="/assets/images/logo.png" alt="Full Trottel Racing Logo" />
</div>

<p data-i18n="events.title" style="margin-bottom: 1rem;">Hier findest du unsere kommenden Trackdays:</p>

<div class="events-grid" id="events-grid" aria-live="polite">
  <!-- Events will be populated by JavaScript -->
</div>

<script>
  var eventsData = {{ site.data.events | jsonify }};

  var trackImageByName = {
    'Spa Francorchamps': 'spa-francorchamps.svg',
    'Spa-Francorchamps': 'spa-francorchamps.svg',
    'Circuit Jules Tacheny': 'mettet.svg',
    'Mettet': 'mettet.svg',
    'Assen TT Circuit': 'assen.svg',
    'TT Circuit Assen': 'assen.svg',
    'Motorsport Arena Oschersleben': 'oschersleben.svg',
    'Oschersleben': 'oschersleben.svg',
    'Bugatti Circuit': 'le-mans.svg',
    'Le Mans': 'le-mans.svg',
    'Sachsenring': 'sachsenring.svg',
    'Bilster Berg': 'bilster-berg.svg',
    'Automotodrom Grobnik': 'grobnik.png',
    'Grobnik': 'grobnik.png',
    'Autodrom Most': 'most.svg',
    'Most': 'most.svg',
    'Mugello': 'mugello.svg',
    'Misano': 'misano.svg',
    'Misano World Circuit': 'misano.svg',
    'Brno': 'brno.svg',
    'Masaryk Circuit': 'brno.svg',
    'Hockenheim': 'hockenheim.svg',
    'Hockenheimring': 'hockenheim.svg',
    'Nürburgring GP': 'nurburgring-gp.svg',
    'Nürburgring-GP': 'nurburgring-gp.svg',
    'Nurburgring GP': 'nurburgring-gp.svg',
    'Nurburgring-GP': 'nurburgring-gp.svg'
  };
  
  function renderEvents() {
    var grid = document.getElementById('events-grid');
    var currentLang = window.i18n ? window.i18n.currentLang : 'en';

    if (!grid) return;
    grid.innerHTML = '';

    if (!eventsData || !eventsData.length) return;

    eventsData.forEach(function(event) {
      var card = document.createElement('article');
      card.className = 'event-card';

      var eventName = (window.getLocalizedValue ? window.getLocalizedValue(event.event, currentLang) : event.event);
      var trackName = (window.getLocalizedValue ? window.getLocalizedValue(event.track, currentLang) : event.track);
      var notes = (window.getLocalizedValue ? window.getLocalizedValue(event.notes, currentLang) : event.notes);

      var trackNameEn = (event.track && typeof event.track === 'object') ? event.track.en : event.track;
      var trackImage = event.track_image || trackImageByName[trackNameEn] || '';
      var trackImgSrc = trackImage ? ('/assets/images/tracks/' + trackImage) : '';

      if (trackImgSrc) {
        var img = document.createElement('img');
        img.className = 'event-track-map';
        img.src = trackImgSrc;
        img.alt = 'Track map: ' + trackName;
        img.loading = 'lazy';
        card.appendChild(img);
      }

      var body = document.createElement('div');
      body.className = 'event-body';

      var dateEl = document.createElement('div');
      dateEl.className = 'event-date';
      dateEl.textContent = event.date;

      var titleEl = document.createElement('h3');
      titleEl.className = 'event-title';
      titleEl.textContent = eventName;

      var trackEl = document.createElement('div');
      trackEl.className = 'event-track';
      trackEl.textContent = trackName;

      var notesEl = document.createElement('p');
      notesEl.className = 'event-notes';
      notesEl.textContent = notes;

      body.appendChild(dateEl);
      body.appendChild(titleEl);
      body.appendChild(trackEl);
      body.appendChild(notesEl);
      card.appendChild(body);

      grid.appendChild(card);
    });
  }
  
  // Render on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Wait for i18n to initialize
      var waitForI18n = setInterval(function() {
        if (window.i18n && window.i18n.currentLang) {
          clearInterval(waitForI18n);
          renderEvents();
        }
      }, 50);
    });
  } else {
    if (window.i18n && window.i18n.currentLang) {
      renderEvents();
    }
  }
  
  // Listen for language changes
  document.addEventListener('languageChanged', function(e) {
    renderEvents();
  });
</script>
