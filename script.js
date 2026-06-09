document.addEventListener('DOMContentLoaded', function () {

  /* ── MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
    });
  });

  /* ── SCROLL NAVBAR SHADOW ── */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── SMOOTH SCROLL (offset for sticky nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── CONTACT FORM → WHATSAPP ── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn     = form.querySelector('.btn-submit');
      var name    = form.querySelector('input[name="name"]').value;
      var phone   = form.querySelector('input[name="phone"]').value;
      var company = form.querySelector('input[name="company"]').value;
      var machine = form.querySelector('select[name="machine"]').value;
      var message = form.querySelector('textarea[name="message"]').value;

      var waMsg = encodeURIComponent(
        'Hello ANC Marking Technologies!\n\n' +
        'Name: ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Phone: ' + phone + '\n' +
        'Machine: ' + (machine || 'Not specified') + '\n' +
        'Requirement: ' + message
      );

      var orig = btn.textContent;
      btn.textContent = 'Sending\u2026';
      btn.style.background = '#1DB954';

      setTimeout(function() {
        window.open('https://wa.me/917666144524?text=' + waMsg, '_blank');
        btn.textContent = 'Inquiry Sent';
        setTimeout(function() {
          btn.textContent = orig;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 600);
    });
  }

  /* ── SCROLL REVEAL ── */
  var revealEls = document.querySelectorAll(
    '.product-card, .ind-card, .c-card, .why-point, .pillar-row, .kpi-card, .hs-card'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(function(el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 5) * 55) + 'ms';
      observer.observe(el);
    });
  }

});