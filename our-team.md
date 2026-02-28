---
layout: default
title: "Our Team"
permalink: /our-team/
---

<div class="team-grid" id="team-grid">
{% for member in site.data.team %}
<article class="team-card" data-member-index="{{ forloop.index0 }}">
  <img src="{{ member.photo | relative_url }}" alt="Photo of {{ member.name.en }}" class="team-photo" />
  <h2 class="team-name">{{ member.name.en }}</h2>
  <p class="team-role"><strong class="role-label" data-i18n="team.role">Role</strong>: <span class="member-role">{{ member.role.en }}</span></p>
  <p class="team-bio">{{ member.bio.en }}</p>
</article>
{% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  function updateTeamTranslations() {
    var teamMembers = {{ site.data.team | jsonify }};
    var currentLang = window.i18n ? window.i18n.currentLang : 'en';
    var cards = document.querySelectorAll('.team-card');
    
    cards.forEach(function(card) {
      var index = parseInt(card.getAttribute('data-member-index'));
      var member = teamMembers[index];
      
      if (member) {
        var nameEl = card.querySelector('.team-name');
        var roleEl = card.querySelector('.member-role');
        var bioEl = card.querySelector('.team-bio');
        var roleLabel = card.querySelector('.role-label');
        
        if (nameEl && member.name[currentLang]) {
          nameEl.textContent = member.name[currentLang];
        }
        if (roleEl && member.role[currentLang]) {
          roleEl.textContent = member.role[currentLang];
        }
        if (bioEl && member.bio[currentLang]) {
          bioEl.textContent = member.bio[currentLang];
        }
        if (roleLabel && window.getTranslation) {
          var translation = window.getTranslation('team.role');
          if (translation) {
            roleLabel.textContent = translation;
          }
        }
      }
    });
  }
  
  // Wait for i18n to initialize
  var waitForI18n = setInterval(function() {
    if (window.i18n && window.i18n.currentLang) {
      clearInterval(waitForI18n);
      updateTeamTranslations();
    }
  }, 50);
  
  // Listen for language changes
  document.addEventListener('languageChanged', function(e) {
    updateTeamTranslations();
  });
});
</script>