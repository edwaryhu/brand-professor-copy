/* ══════════════════════════════════════
   HERO LOGOS — Random Brand Logo Cycling
   ══════════════════════════════════════ */
(function cycleBrandLogos() {
  var images = document.querySelectorAll('.hero_logo-image');
  if (!images.length) return;

  function showRandom() {
    // Hide all
    for (var i = 0; i < images.length; i++) {
      images[i].style.opacity = '0';
    }

    // Pick 2-4 random ones to show
    var count = 2 + Math.floor(Math.random() * 3);
    var indices = [];
    while (indices.length < count) {
      var r = Math.floor(Math.random() * images.length);
      if (indices.indexOf(r) === -1) indices.push(r);
    }
    for (var j = 0; j < indices.length; j++) {
      images[indices[j]].style.opacity = '1';
    }
  }

  showRandom();
  setInterval(showRandom, 2500);
})();
