---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team
<div class="team-grid" id="team-grid">
{% for member in site.data.team %}
<article class="team-card" data-member-index="{{ forloop.index0 }}">
  <img src="{{ member.photo | relative_url }}" alt="Photo of {{ member.name.en }}" class="team-photo" />
  <h2 class="team-name">{{ member.name.en }}</h2>
  <p class="team-role"><strong data-i18n="nav.team">Team</strong>: <span class="member-role">{{ member.role.en }}</span></p>
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
        
        if (nameEl && member.name[currentLang]) {
          nameEl.textContent = member.name[currentLang];
        }
        if (roleEl && member.role[currentLang]) {
          roleEl.textContent = member.role[currentLang];
        }
        if (bioEl && member.bio[currentLang]) {
          bioEl.textContent = member.bio[currentLang];
        }
      }
    });
  }
  
  updateTeamTranslations();
  
  // Listen for language changes
  var observer = setInterval(function() {
    if (window.i18n) {
      updateTeamTranslations();
    }
  }, 500);
});
</script>