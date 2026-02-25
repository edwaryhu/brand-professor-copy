/* ══════════════════════════════════════
   SCROLL ANIMATIONS — GSAP + SplitType text reveal
   ══════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  var elements = document.querySelectorAll('[text-split]');

  setTimeout(function() {
    elements.forEach(function(element) {
      // Split text into lines and words
      var typeSplit = new SplitType(element, {
        types: 'lines, words',
        tagName: 'span'
      });

      // Ensure element is visible
      gsap.set(element, { visibility: 'visible' });

      // Animate each line: slide up from below + fade in
      gsap.from(element.querySelectorAll('.line'), {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    ScrollTrigger.refresh();
  }, 50);
});

/* ── Opacity fade-in for decorative elements ── */
(function initFadeIns() {
  var fadeTargets = [
    document.getElementById('heroPattern'),
    document.querySelector('.wwd_arrows'),
    document.querySelector('._1-1_hero-arrows')
  ];

  fadeTargets.forEach(function(el) {
    if (!el) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.6s ease';
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
  });
})();
