/* Small, optional enhancements. The site works fully without JavaScript. */
(function () {
  'use strict';
  var root = document.documentElement;
  var sizeButtons = document.querySelectorAll('[data-text-size]');
  var contrastToggle = document.getElementById('contrast-toggle');

  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }

  function applySize(size) {
    root.classList.remove('text-large', 'text-xlarge');
    if (size === 'large' || size === 'xlarge') root.classList.add('text-' + size);
    sizeButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-text-size') === size ? 'true' : 'false');
    });
    save('am-text-size', size);
  }

  sizeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { applySize(btn.getAttribute('data-text-size')); });
  });

  // Reflect any setting restored by the inline script in <head>.
  if (root.classList.contains('text-xlarge')) applySize('xlarge');
  else if (root.classList.contains('text-large')) applySize('large');

  if (contrastToggle) {
    var setContrast = function (on) {
      root.classList.toggle('high-contrast', on);
      contrastToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      save('am-contrast', on ? 'high' : 'normal');
    };
    setContrast(root.classList.contains('high-contrast'));
    contrastToggle.addEventListener('click', function () {
      setContrast(!root.classList.contains('high-contrast'));
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
