---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team

Hier sind unsere Team-Mitglieder. Ergänze die Profiles in _data/team.yml.

{% for member in site.data.team %}
## {{ member.name }}
**Rolle:** {{ member.role }}

{{ member.bio }}

{% endfor %}
