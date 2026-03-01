---
layout: default
title: "Blog"
permalink: /blog/
---

# <span data-i18n="blog.title">Blog</span>

<p data-i18n="blog.description">All blog posts from the Full Trottel Racing Team.</p>

<ul class="blog-list" id="blog-list">
  <!-- Blog posts will be populated by JavaScript -->
</ul>

<script>
  var allPosts = [
    {% for post in site.posts %}
    {
      title: {{ post.title | jsonify }},
      url: {{ post.url | relative_url | jsonify }},
      date: {{ post.date | date: "%-d. %B %Y" | jsonify }},
      author: {{ post.author | jsonify }},
      categories: {{ post.categories | join: ", " | jsonify }},
      excerpt: {{ post.excerpt | strip_html | truncate: 300 | jsonify }},
      lang: {{ post.lang | jsonify }},
      background_image: {{ post.background_image | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  
  function renderBlogPosts() {
    var blogList = document.getElementById('blog-list');
    var currentLang = window.i18n ? window.i18n.currentLang : 'en';
    
    // Filter posts by current language
    var filteredPosts = allPosts.filter(function(post) {
      return post.lang === currentLang;
    });
    
    if (filteredPosts.length === 0) {
      blogList.innerHTML = '<li><p data-i18n="blog.no_posts">No posts found.</p></li>';
      return;
    }
    
    blogList.innerHTML = '';
    filteredPosts.forEach(function(post) {
      var li = document.createElement('li');
      li.className = 'blog-post-card';
      
      // Create background overlay if image exists
      if (post.background_image) {
        var bgDiv = document.createElement('div');
        bgDiv.className = 'blog-card-bg';
        bgDiv.style.backgroundImage = 'url(' + post.background_image + ')';
        li.appendChild(bgDiv);
      }
      
      // Create content overlay
      var contentDiv = document.createElement('div');
      contentDiv.className = 'blog-card-content';
      
      var titleEl = document.createElement('h2');
      titleEl.className = 'blog-card-title';
      var titleLink = document.createElement('a');
      titleLink.href = post.url;
      titleLink.textContent = post.title;
      titleEl.appendChild(titleLink);
      
      var metaDiv = document.createElement('div');
      metaDiv.className = 'blog-card-meta';
      var authorText = post.author ? ' — ' + post.author : '';
      var categoriesText = post.categories ? ' — ' + post.categories : '';
      metaDiv.innerHTML = '<time datetime="' + post.date + '">' + post.date + '</time>' + authorText + categoriesText;
      
      var excerptDiv = document.createElement('div');
      excerptDiv.className = 'blog-card-excerpt';
      excerptDiv.textContent = post.excerpt;
      
      var readMoreLink = document.createElement('a');
      readMoreLink.href = post.url;
      readMoreLink.className = 'blog-card-readmore';
      var readMoreSpan = document.createElement('span');
      readMoreSpan.setAttribute('data-i18n', 'blog.read_more');
      readMoreSpan.textContent = 'Read more →';
      readMoreLink.appendChild(readMoreSpan);
      
      contentDiv.appendChild(titleEl);
      contentDiv.appendChild(metaDiv);
      contentDiv.appendChild(excerptDiv);
      contentDiv.appendChild(readMoreLink);
      
      li.appendChild(contentDiv);
      blogList.appendChild(li);
    });
    
    // Retranslate read_more links after rendering
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        var translation = window.getTranslation ? window.getTranslation(key) : null;
        if (translation) {
          el.textContent = translation;
        }
      }
    });
  }
  
  // Render on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Wait for i18n to initialize
      var waitForI18n = setInterval(function() {
        if (window.i18n && window.i18n.currentLang) {
          clearInterval(waitForI18n);
          renderBlogPosts();
        }
      }, 50);
    });
  } else {
    if (window.i18n && window.i18n.currentLang) {
      renderBlogPosts();
    }
  }
  
  // Listen for language changes
  document.addEventListener('languageChanged', function(e) {
    renderBlogPosts();
  });
</script>
