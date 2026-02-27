---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team
<table id="our-team-table" class="team-table">
{% for member in site.data.team %}
<tr>
<td rowspan="3">
    <img src="{{ member.photo | relative_url }}" alt="Photo of {{ member.name }}" class="team-photo" style="display:block;margin-right:0.5rem;" />
</td>
<td><h2>{{ member.name }}</h2></td>
</tr>
<tr>
<td><b>Rolle:</b> {{ member.role }}</td>
</tr>
<tr>
<td>{{ member.bio }}</td>
</tr>

{% endfor %}
</table>