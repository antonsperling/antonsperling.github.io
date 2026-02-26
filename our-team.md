---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team

{% for member in site.data.team %}
## {{ member.name }}
**Rolle:** {{ member.role }}

{{ member.bio }}

{% endfor %}
