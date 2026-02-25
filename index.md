---
layout: default
title: "Full Trottel Racing"
permalink: /
---

# Full Trottel Racing

Willkommen auf der Seite des Full Trottel Racing Teams!

Hier findest du unsere kommenden Trackdays:

<table>
  <thead>
    <tr>
      <th>Datum</th>
      <th>Event</th>
      <th>Strecke</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    {% for e in site.data.events %}
    <tr>
      <td>{{ e.date }}</td>
      <td>{{ e.event }}</td>
      <td>{{ e.track }}</td>
      <td>{{ e.notes }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<nav>
- [Our Team](/our-team/)
- [Blog](/blog/)
- [Impressum](/impressum/)
- [Datenschutz](/datenschutz/)
</nav>
