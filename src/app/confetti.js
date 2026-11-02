/* ==========================================================================
   Canvas confetti. Respects reduced motion, sizes itself to the viewport.
   ========================================================================== */
const COLORS = ["#b3261e", "#2e5b4f", "#e8a86b", "#ffd166", "#25e6ff", "#d95f86", "#f2eee5"];

export function confetti({ count = 90, duration = 1700 } = {}) {
  if (document.documentElement.dataset.motion === "reduced") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  document.body.append(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const pieces = Array.from({ length: count }, () => ({
    x: width / 2 + (Math.random() - 0.5) * width * 0.4,
    y: height * 0.36 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 10,
    vy: -Math.random() * 9 - 3,
    size: 5 + Math.random() * 7,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 1
  }));
  const start = performance.now();
  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, width, height);
    pieces.forEach((piece) => {
      piece.vy += 0.22;
      piece.vx *= 0.995;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.spin;
      piece.life = Math.max(0, 1 - elapsed / duration);
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.globalAlpha = piece.life;
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
      ctx.restore();
    });
    if (elapsed < duration) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
