---
layout: default
title: "Full Trottel Racing"
permalink: /
---

<div class="hero-logo">
  <img src="/assets/images/logo.png" alt="Full Trottel Racing Logo" />
</div>

# Full Trottel Racing



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


