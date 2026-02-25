/* ══════════════════════════════════════
   LENIS SMOOTH SCROLL
   ══════════════════════════════════════ */
(function initLenis() {
  var lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis scroll to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
})();
