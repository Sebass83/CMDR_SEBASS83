/**
 * Typewriter — hero headline typing effect with blinking caret (▍).
 * Falls back to instant text under prefers-reduced-motion.
 */
(function () {
  'use strict';

  const target = document.getElementById('typewriter-line');
  if (!target) return;

  const fullText = target.dataset.text || '';
  const caret = document.getElementById('typewriter-caret');
  const toast = document.getElementById('hero-toast');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CHAR_DELAY = 55;
  const PUNCTUATION_PAUSE = 320;

  function finish() {
    if (caret) caret.classList.add('done');
    if (toast) toast.classList.add('visible');
  }

  if (reducedMotion || !fullText) {
    target.textContent = fullText;
    if (caret) caret.classList.add('done');
    finish();
    return;
  }

  let index = 0;

  function tick() {
    if (index <= fullText.length) {
      target.textContent = fullText.slice(0, index);
      const char = fullText[index - 1];
      let delay = CHAR_DELAY;
      if (char === '.' || char === '!' || char === '?') delay += PUNCTUATION_PAUSE;
      if (index === fullText.length) {
        // Keep the caret visible and reveal the toast.
        finish();
        return;
      }
      index++;
      window.setTimeout(tick, delay);
    }
  }

  tick();
})();