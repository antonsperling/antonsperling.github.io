---
layout: default
title: "Our Team"
permalink: /our-team/
---

# Our Team
<table>
{% for member in site.data.team %}
<tr>
<td rowspan="3">
    <img src="{{ member.photo | relative_url }}" alt="no picture" style="height:100px;width:auto;display:block;margin-right:0.5rem;" />
</td>
<td>
## {{ member.name }}
</td>
</tr>
<tr>
<td>
**Rolle:** {{ member.role }}
</td>
</tr>
<tr>
<td>
{{ member.bio }}
</td>
</tr>

{% endfor %}
</table>