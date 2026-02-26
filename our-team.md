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
{{ member.photo }}
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