---
layout: default
title: "Blog"
permalink: /blog/
---

# <span data-i18n="blog.title">Blog</span>

<p data-i18n="blog.description">All blog posts from the Full Trottel Racing Team.</p>

{% if site.posts == empty %}
<p data-i18n="blog.no_posts">No posts found.</p>
{% else %}
<ul class="blog-list">
  {% for post in site.posts %}
  <li class="post-item" style="margin-bottom:1.25rem;">
    <h2 style="margin:0 0 0.25rem;">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
    <div style="color:var(--muted);font-size:0.9rem;margin-bottom:0.5rem;">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d. %B %Y" }}</time>
      {% if post.author %} — {{ post.author }}{% endif %}
      {% if post.categories %} — {% for c in post.categories %}{{ c }}{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}
    </div>
    <div class="post-excerpt" style="margin-bottom:0.5rem;">
      {% if post.excerpt %}
        {{ post.excerpt | strip_html | truncate: 300 }}
      {% else %}
        {{ post.content | strip_html | truncate: 300 }}
      {% endif %}
    </div>
    <a href="{{ post.url | relative_url }}"><span data-i18n="blog.read_more">Read more →</span></a>
  </li>
  {% endfor %}
</ul>
{% endif %}