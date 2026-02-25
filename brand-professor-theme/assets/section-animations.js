/* ══════════════════════════════════════
   SECTION ANIMATIONS
   Block-line scroll progress, card border draw, CTA animations, footer
   ══════════════════════════════════════ */

// 1. Block-line: grows from 0% to 100% width as section scrolls into view
(function initBlockLineAnimation() {
  var section = document.querySelector('.workshops-section');
  var blockLine = section ? section.querySelector('.block-line') : null;
  if (!section || !blockLine) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var onScroll = function() {
          var rect = section.getBoundingClientRect();
          var viewH = window.innerHeight;
          var progress = Math.min(1, Math.max(0, (viewH - rect.top) / (viewH + rect.height)));
          var lineProgress = Math.min(100, (progress / 0.65) * 100);
          blockLine.style.width = lineProgress + '%';
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      }
    });
  }, { threshold: 0 });
  observer.observe(section);
})();

// 2. Workshop card border draw animation
(function initCardDrawAnimation() {
  var cards = document.querySelectorAll('.workshop-card');
  if (!cards.length) return;

  cards.forEach(function(card, cardIndex) {
    var topLeft = card.querySelector('.animation-line_first-left');
    var topRight = card.querySelector('.animation-line_first-right');
    var sideRight = card.querySelector('.draw-animation-line.is-second');
    var sideLeft = card.querySelector('.draw-animation-line.is-fourth');
    var bottomLeft = card.querySelector('.animation-line_bottom-left');
    var bottomRight = card.querySelector('.animation-line_bottom-right');

    if (!topLeft) return;

    topLeft.style.width = '50%';
    topRight.style.width = '50%';
    sideRight.style.height = '100%';
    sideLeft.style.height = '100%';
    bottomLeft.style.width = '50%';
    bottomRight.style.width = '50%';

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          observer.unobserve(card);
          var delay = cardIndex * 150;

          setTimeout(function() {
            topLeft.style.transition = 'width 350ms ease';
            topRight.style.transition = 'width 350ms ease';
            topLeft.style.width = '0%';
            topRight.style.width = '0%';
          }, delay);

          setTimeout(function() {
            sideRight.style.transition = 'height 550ms ease';
            sideLeft.style.transition = 'height 550ms ease';
            sideRight.style.height = '0%';
            sideLeft.style.height = '0%';
          }, delay + 350);

          setTimeout(function() {
            bottomLeft.style.transition = 'width 350ms ease';
            bottomRight.style.transition = 'width 350ms ease';
            bottomLeft.style.width = '0%';
            bottomRight.style.width = '0%';
          }, delay + 350 + 550);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(card);
  });
})();

// 3. CTA block-line scroll-progress animation
(function initCtaBlockLine() {
  var ctaSection = document.getElementById('cta-section');
  if (!ctaSection) return;
  var line = ctaSection.querySelector('.block-line');
  if (!line) return;

  function onScroll() {
    var rect = ctaSection.getBoundingClientRect();
    var viewH = window.innerHeight;
    var start = viewH;
    var end = -rect.height * 0.35;
    var progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
    var pct = Math.min(100, progress / 0.65 * 100);
    line.style.width = pct + '%';
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
  }, { threshold: 0 });
  observer.observe(ctaSection);
})();

// 4. CTA arrows fade-in on scroll
(function initCtaArrowsFade() {
  var arrows = document.querySelector('.cta-arrows');
  if (!arrows) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        arrows.style.transition = 'opacity 0.6s ease';
        arrows.style.opacity = '1';
        observer.unobserve(arrows);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(arrows);
})();

// 5. Footer "Back to top" smooth scroll
(function initBackToTop() {
  var backToTop = document.querySelector('.foot-btn-vert');
  if (!backToTop) return;
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// 6. Footer form handler (demo)
window.handleFooterForm = function(btn) {
  var form = btn.closest('form');
  var input = form.querySelector('input[type="email"]');
  if (input && input.value) {
    input.value = '';
    btn.style.transform = 'rotate(45deg)';
    setTimeout(function() { btn.style.transform = ''; }, 400);
  }
};
