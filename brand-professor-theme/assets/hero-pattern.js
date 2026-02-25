/* ══════════════════════════════════════
   HERO PATTERN — SVG Arrow Grid Generator
   ══════════════════════════════════════ */
(function generateHeroPattern() {
  var container = document.getElementById('heroPattern');
  if (!container) return;

  var viewW = 1339, viewH = 630;
  var cols = parseInt(container.getAttribute('data-cols')) || 40;
  var rows = parseInt(container.getAttribute('data-rows')) || 40;
  var spacingX = viewW / cols;
  var spacingY = viewH / rows;

  // Arrow/play shape paths
  var arrowRight = "M5.42 3.49C3.15 3.15 1.5 1.72 1 0H0V8.11H1C1.5 6.4 3.15 4.96 5.42 4.62V3.49Z";
  var arrowLeft = "M0 3.49C2.27 3.15 3.93 1.72 4.42 0H5.42V8.11H4.42C3.92 6.4 2.27 4.96 0 4.62V3.49Z";

  // Accent indices (~2% of total, deterministic seed)
  var totalShapes = cols * rows;
  var accentSet = {};
  var seed = 42;
  for (var i = 0; i < 18; i++) {
    accentSet[(seed * (i + 1) * 7 + i * 13) % totalShapes] = true;
  }

  var paths = '';
  var idx = 0;
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      var x = col * spacingX;
      var y = row * spacingY;
      var isAccent = accentSet[idx];
      var cls = isAccent ? ' class="shape-accent"' : '';
      var d = row % 2 === 0 ? arrowRight : arrowLeft;
      paths += '<path d="' + d + '" fill="currentColor"' + cls + ' transform="translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')"/>';
      idx++;
    }
  }

  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ' + viewW + ' ' + viewH + '" fill="none" preserveAspectRatio="xMidYMid slice"><g>' + paths + '</g></svg>';
  container.innerHTML = svg;
  container.style.opacity = '1';
})();
