/* ══════════════════════════════════════
   COLOR MODE / MOOD SELECTOR
   ══════════════════════════════════════ */

function setColorMode(mode) {
  var html = document.documentElement;
  var body = document.body;
  var themeClasses = ['u-theme-red', 'u-theme-green', 'u-theme-blue', 'u-theme-white', 'u-theme-purple'];

  // Remove all theme classes from both html and body
  themeClasses.forEach(function(cls) {
    html.classList.remove(cls);
    body.classList.remove(cls);
  });

  // Add the selected theme class (base = no class)
  if (mode !== 'base') {
    html.classList.add('u-theme-' + mode);
    body.classList.add('u-theme-' + mode);
  }

  // Persist choice
  localStorage.setItem('colorMode', mode);

  // Toggle content-* elements (logos, etc.)
  var allContent = document.querySelectorAll('.content-base, .content-green, .content-blue, .content-red, .content-white, .content-purple');
  allContent.forEach(function(el) {
    el.style.display = el.classList.contains('content-' + mode) ? 'block' : 'none';
  });

  // Hide the active button, show the rest
  var allButtons = document.querySelectorAll('[color-mode]');
  allButtons.forEach(function(btn) {
    btn.style.display = btn.getAttribute('color-mode') === mode ? 'none' : 'flex';
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  var savedMode = localStorage.getItem('colorMode') || 'base';
  setColorMode(savedMode);

  var switchers = document.querySelectorAll('[color-mode]');
  switchers.forEach(function(switcher) {
    switcher.addEventListener('click', function() {
      setColorMode(switcher.getAttribute('color-mode'));
    });
  });
});
