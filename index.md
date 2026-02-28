---
layout: default
title: "Full Trottel Racing"
permalink: /
---

<div class="hero-logo">
  <img src="/assets/images/logo.png" alt="Full Trottel Racing Logo" />
</div>

# Full Trottel Racing

<p data-i18n="events.title" style="margin-bottom: 1rem;">Hier findest du unsere kommenden Trackdays:</p>

<table id="events-table">
  <thead>
    <tr>
      <th data-i18n="events.date">Datum</th>
      <th data-i18n="events.event">Event</th>
      <th data-i18n="events.track">Strecke</th>
      <th data-i18n="events.notes">Notes</th>
    </tr>
  </thead>
  <tbody id="events-tbody">
    <!-- Events will be populated by JavaScript -->
  </tbody>
</table>

<script>
  var eventsData = {{ site.data.events | jsonify }};
  
  function renderEvents() {
    var tbody = document.getElementById('events-tbody');
    var currentLang = window.i18n ? window.i18n.currentLang : 'en';
    
    tbody.innerHTML = '';
    eventsData.forEach(function(event) {
      var row = document.createElement('tr');
      row.innerHTML = 
        '<td>' + event.date + '</td>' +
        '<td>' + (window.getLocalizedValue ? window.getLocalizedValue(event.event, currentLang) : event.event) + '</td>' +
        '<td>' + (window.getLocalizedValue ? window.getLocalizedValue(event.track, currentLang) : event.track) + '</td>' +
        '<td>' + (window.getLocalizedValue ? window.getLocalizedValue(event.notes, currentLang) : event.notes) + '</td>';
      tbody.appendChild(row);
    });
  }
  
  // Render on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderEvents);
  } else {
    renderEvents();
  }
  
  // Re-render when language changes (hook into i18n)
  var originalSetLanguage = window.setLanguage;
  window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    renderEvents();
  };
</script>
