// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
      });
    });
  }

  // Highlight active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
});

// ===== Nav More dropdown =====
document.addEventListener('DOMContentLoaded', function () {
  const navMoreItems = document.querySelector('.nav-more-items');
  if (navMoreItems) {
    document.addEventListener('click', function (e) {
      const navMore = document.querySelector('.nav-more');
      if (navMore && !navMore.contains(e.target)) {
        navMore.classList.remove('open');
      }
    });
  }
});

// ===== Google Analytics (GA4) =====
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-132PFXDSM9');
