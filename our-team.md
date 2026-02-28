---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team
<div class="team-grid">
{% for member in site.data.team %}
<article class="team-card">
  <img src="{{ member.photo | relative_url }}" alt="Photo of {{ member.name }}" class="team-photo" />
  <h2>{{ member.name }}</h2>
  <p class="team-role"><strong>Rolle:</strong> {{ member.role }}</p>
  <p class="team-bio">{{ member.bio }}</p>
</article>
{% endfor %}
</div>