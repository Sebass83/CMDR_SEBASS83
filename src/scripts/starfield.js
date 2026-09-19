/**
 * Starfield — animated background canvas.
 * Twinkle + slow drift, with occasional shooting stars.
 * Respects prefers-reduced-motion: renders a single static frame.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let stars = [];

  const STAR_COUNT_MIN = 120;
  const MAX_DRIFT = 0.02;
  const TWINKLE_SPEED = 0.4;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnStar(initial) {
    return {
      x: rand(0, width),
      y: rand(0, height),
      r: rand(0.4, 1.5),
      base: rand(0.25, 0.95),
      amp: rand(0.1, 0.5),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.5, 1.6) * TWINKLE_SPEED,
      vx: rand(-MAX_DRIFT, MAX_DRIFT),
      vy: rand(-MAX_DRIFT, MAX_DRIFT),
      // Slight parallax: larger stars drift a bit faster
      depth: rand(0.3, 1),
    };
  }

  function initStars() {
    const target = Math.max(STAR_COUNT_MIN, Math.floor((width * height) / 12000));
    const count = Math.min(target, 320);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(spawnStar(true));
    }
  }

  // Shooting stars
  let shootingStar = null;
  let nextShooting = performance.now() + rand(4000, 9000);

  function spawnShootingStar() {
    shootingStar = {
      x: rand(0, width * 0.8),
      y: rand(0, height * 0.4),
      vx: rand(4, 8),
      vy: rand(2.5, 5),
      life: 1,
      decay: rand(0.015, 0.03),
    };
  }

  function draw(t) {
    const time = t / 1000;

    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      if (!reducedMotion) {
        s.x += s.vx * s.depth;
        s.y += s.vy * s.depth;
      }

      // Wrap around edges
      if (s.x < -2) s.x = width + 2;
      if (s.x > width + 2) s.x = -2;
      if (s.y < -2) s.y = height + 2;
      if (s.y > height + 2) s.y = -2;

      const twinkle = reducedMotion ? 1 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
      const alpha = Math.max(0.05, s.base * twinkle);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232, 237, 246, ' + alpha.toFixed(3) + ')';
      ctx.fill();
    }

    if (reducedMotion) return;

    // Shooting stars
    if (time * 1000 > nextShooting) {
      if (!shootingStar) spawnShootingStar();
      else nextShooting = performance.now() + rand(6000, 14000);
    }

    if (shootingStar) {
      const ss = shootingStar;
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life -= ss.decay;

      if (ss.life <= 0) {
        shootingStar = null;
      } else {
        const tail = 18;
        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * tail,
          ss.y - ss.vy * tail,
          ss.x,
          ss.y
        );
        grad.addColorStop(0, 'rgba(102, 204, 255, 0)');
        grad.addColorStop(1, 'rgba(232, 237, 246, ' + Math.min(0.8, ss.life).toFixed(2) + ')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.vx * tail, ss.y - ss.vy * tail);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
      }
    }
  }

  function loop(t) {
    draw(t);
    requestAnimationFrame(loop);
  }

  resize();
  initStars();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  });

  if (reducedMotion) {
    draw(0);
  } else {
    requestAnimationFrame(loop);
  }
})();