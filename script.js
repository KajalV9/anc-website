// ✅ GLOBAL (must be outside)
function openPopup() {
  document.getElementById("brochurePopup").style.display = "block";
}

function closePopup() {
  document.getElementById("brochurePopup").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function () {

  /* ── MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  /* ── SCROLL NAVBAR SHADOW ── */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── SMOOTH SCROLL (offset for sticky nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // 🚫 ignore "#"
      if (href === "#") return;

      var target = document.querySelector(href);
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
      var btn = form.querySelector('.btn-submit');
      var name = form.querySelector('input[name="name"]').value;
      var phone = form.querySelector('input[name="phone"]').value;
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

      setTimeout(function () {
        window.open('https://wa.me/919850973875?text=' + waMsg, '_blank');
        btn.textContent = 'Inquiry Sent';
        setTimeout(function () {
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
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 5) * 55) + 'ms';
      observer.observe(el);
    });
  }

  /* ── PRODUCT SLIDERS ── */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var slides = slider.querySelector('.p-slides');
    var allSlides = slider.querySelectorAll('.p-slide');
    var dots = slider.querySelectorAll('.p-dot');
    var prev = slider.querySelector('.p-prev');
    var next = slider.querySelector('.p-next');
    var current = 0;
    var total = allSlides.length;

    function goTo(n) {
      current = (n + total) % total;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    if (prev) prev.addEventListener('click', function () { goTo(current - 1); });
    if (next) next.addEventListener('click', function () { goTo(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    /* Touch / swipe support */
    var startX = 0;
    slider.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  });
  /* ── LIGHTBOX ── */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.p-slide .p-img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });


  //FORM POPUP

  // document.addEventListener("DOMContentLoaded", function () {
  //   document.getElementById("brochureForm").addEventListener("submit", function(e) {
  //     e.preventDefault();

  //     const data = {
  //       name: document.getElementById("name").value,
  //       email: document.getElementById("email").value,
  //       phone: document.getElementById("phone").value,
  //       company: document.getElementById("company").value,
  //       requirement: document.getElementById("requirement").value
  //     };

  //     fetch("https://script.google.com/macros/s/AKfycbz9ONi0IbQFpLMFoHuhWMEYse_JNB3IWFViX4APBnK7wcqdNhOXIo9RDQ8V0wP-sP4/exec", {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(data)
  //     })
  //     .then(() => {
  //       // ✅ Correct flow
  //       closePopup();
  //       window.location.href = "images/ANC Marking Technologies Brochure.pdf";
  //     })
  //     .catch(err => console.error(err));
  //   });
  // });
  var brochureForm = document.getElementById("brochureForm");

  if (brochureForm) {
    brochureForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = document.getElementById("downloadBtn");
      if (!btn) return;

      // // 🚫 prevent double click
      // if (btn.classList.contains("loading")) return;

      // // 🔥 Step 0: loading
      // btn.classList.add("loading");
      // btn.textContent = "Processing...";

      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        company: document.getElementById("company").value,
        requirement: document.getElementById("requirement").value
      };

      fetch("https://script.google.com/macros/s/AKfycbz9ONi0IbQFpLMFoHuhWMEYse_JNB3IWFViX4APBnK7wcqdNhOXIo9RDQ8V0wP-sP4/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(() => {

          // ✅ Step 1: success UI
          btn.classList.remove("loading");
          btn.classList.add("success");
          // btn.textContent = "Downloading...";

          // ✅ Step 2: trigger download
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = "images/ANC Marking Technologies Brochure.pdf";
            link.download = "ANC-Brochure.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 700);

          // ✅ Step 3: close popup + reset (ONLY ONCE)
          setTimeout(() => {
            closePopup();
            document.getElementById("brochurePopup").classList.remove("hide");
            btn.classList.remove("success");
            btn.textContent = "Get Brochure";
            brochureForm.reset();
          }, 1400);

        })
        .catch(err => {
          console.error(err);

          btn.classList.remove("loading");
          btn.textContent = "Try Again";
        });

    });
  }
});
