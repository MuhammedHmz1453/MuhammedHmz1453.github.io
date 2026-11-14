// =========================================================
// Lazer Bahçesi — giriş bölümündeki ışık bitkileri
// Canvas 2D ile çizilir. Her bitki: bir gövde + rastgele dallar.
// Boş bir yere tıklayınca (ya da düğmeye basınca) yeni bir bitki büyür.
// =========================================================

(() => {
  const canvas = document.querySelector('[data-garden]');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const area = canvas.parentElement;
  const plantButton = document.querySelector('[data-plant]');
  const soil = document.querySelector('[data-soil]');   // bitkiler bu şeridin üst kenarından çıkar
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const COLORS = [
    { line: '#ff4f9a', core: '#ffd1e4' },   // pembe
    { line: '#3bf0d8', core: '#c9fff7' },   // camgöbeği
    { line: '#ffc24a', core: '#ffe9b8' },   // kehribar
  ];
  const MAX_PLANTS = 14;
  const SEGMENT_MS = 140;        // bir dal parçasının büyüme süresi
  const FADE_MS = 1400;

  let width = 0;
  let height = 0;
  let ground = 0;
  let plants = [];
  let colorIndex = 0;
  let rafId = 0;
  let visible = true;
  const sprites = new Map();

  // ---------- Yardımcılar ----------
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const now = () => performance.now();
  const groundY = () => ground;

  // Parıltı için önceden çizilmiş yumuşak daire (her karede gradient oluşturmamak için)
  function glowSprite(color) {
    if (sprites.has(color)) return sprites.get(color);
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(0.25, color + 'aa');
    grad.addColorStop(1, color + '00');
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    sprites.set(color, c);
    return c;
  }

  // ---------- Bitki üretimi ----------
  // Bitki, kökü (0,0) kabul edilen göreli koordinatlarda saklanır.
  // Böylece pencere boyutu değişince sadece kökün x konumu güncellenir.
  function createPlant(xRatio, targetHeight, delay = 0) {
    const color = COLORS[colorIndex++ % COLORS.length];
    const segments = [];
    const tips = [];

    const stemCount = Math.round(clamp(targetHeight / 55, 4, 10));
    const segLen = targetHeight / stemCount;
    let x = 0;
    let y = 0;
    let angle = -Math.PI / 2 + rand(-0.1, 0.1);
    let t = 0;

    for (let i = 0; i < stemCount; i++) {
      angle += rand(-0.22, 0.22);
      angle += (-Math.PI / 2 - angle) * 0.25;          // dik durmaya çalış
      const nx = x + Math.cos(angle) * segLen;
      const ny = y + Math.sin(angle) * segLen;
      segments.push({ x0: x, y0: y, x1: nx, y1: ny, t0: t, depth: 0 });

      if (i >= 1 && i < stemCount - 1 && Math.random() < 0.7) {
        const side = Math.random() < 0.5 ? -1 : 1;
        branch(nx, ny, angle + side * rand(0.5, 0.95), segLen * rand(0.65, 0.95), 1, t + SEGMENT_MS);
      }
      x = nx;
      y = ny;
      t += SEGMENT_MS;
    }
    tips.push({ x, y, t });

    function branch(bx, by, bAngle, len, depth, bt) {
      const count = depth === 1 ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);
      for (let j = 0; j < count; j++) {
        bAngle += rand(-0.25, 0.25);
        bAngle += (-Math.PI / 2 - bAngle) * 0.12;
        const nx = bx + Math.cos(bAngle) * len;
        const ny = by + Math.sin(bAngle) * len;
        segments.push({ x0: bx, y0: by, x1: nx, y1: ny, t0: bt, depth });
        if (depth < 3 && Math.random() < 0.4) {
          const side = Math.random() < 0.5 ? -1 : 1;
          branch(nx, ny, bAngle + side * rand(0.45, 0.8), len * 0.7, depth + 1, bt + SEGMENT_MS);
        }
        bx = nx;
        by = ny;
        bt += SEGMENT_MS;
        len *= 0.82;
      }
      tips.push({ x: bx, y: by, t: bt });
    }

    const grownAt = Math.max(...tips.map((tip) => tip.t)) + SEGMENT_MS;

    return {
      xRatio,
      color,
      segments,
      tips,
      born: now() + delay,
      grownAt,
      seed: Math.random() * 1000,
      fadeStart: 0,
    };
  }

  function addPlant(xRatio, targetHeight, delay = 0) {
    const plant = createPlant(xRatio, targetHeight, delay);
    if (reduceMotion.matches) plant.born = now() - plant.grownAt;   // anında tam boy
    plants.push(plant);

    // Çok bitki olunca en eskisi sönerek kaybolsun
    const alive = plants.filter((p) => !p.fadeStart);
    if (alive.length > MAX_PLANTS) alive[0].fadeStart = now();

    if (reduceMotion.matches) {
      plants = plants.filter((p) => !p.fadeStart);
      draw();
    } else {
      start();
    }
  }

  // Yazı ve düğmelerin altında kalan boş yükseklik: başlangıç bitkileri yazının üstüne çıkmasın
  function freeHeightAt(x) {
    const areaRect = area.getBoundingClientRect();
    let lowest = 0;
    area.querySelectorAll('.status, .hero__name span, .hero__lede, .hero__actions > *').forEach((el) => {
      const r = el.getBoundingClientRect();
      const left = r.left - areaRect.left - 36;
      const right = r.right - areaRect.left + 36;
      if (x >= left && x <= right) lowest = Math.max(lowest, r.bottom - areaRect.top);
    });
    return lowest ? Math.max(40, ground - lowest - 28) : Infinity;
  }

  function seedGarden() {
    plants = [];
    const narrow = width < 640;
    const positions = narrow
      ? [0.12, 0.38, 0.66, 0.9]
      : [0.06, 0.2, 0.42, 0.58, 0.72, 0.86, 0.96];

    positions.forEach((ratio, i) => {
      // Sağ taraftakiler daha uzun; soldakiler yazının altında kalsın
      const rightness = clamp((ratio - 0.35) / 0.65, 0, 1);
      const minH = ground * (narrow ? 0.14 : 0.18);
      const maxH = ground * (narrow ? 0.36 : 0.34 + rightness * 0.46);
      const x = ratio + rand(-0.025, 0.025);
      const h = Math.min(rand(minH, maxH), freeHeightAt(x * width) * rand(0.8, 1));
      addPlant(x, h, 250 + i * 220);
    });
  }

  // ---------- Çizim ----------
  function draw() {
    const t = now();
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const gy = groundY();

    // Zemin çizgisi
    const groundLine = ctx.createLinearGradient(0, 0, width, 0);
    groundLine.addColorStop(0, 'rgba(255,255,255,0.04)');
    groundLine.addColorStop(0.5, 'rgba(255,255,255,0.18)');
    groundLine.addColorStop(1, 'rgba(255,255,255,0.04)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = groundLine;
    ctx.fillRect(0, gy - 1, width, 1);

    plants = plants.filter((p) => !p.fadeStart || t - p.fadeStart < FADE_MS);

    for (const plant of plants) {
      const age = t - plant.born;
      if (age < 0) continue;

      const rootX = plant.xRatio * width;
      let alpha = reduceMotion.matches ? 1 : 0.86 + 0.14 * Math.sin(t * 0.0021 + plant.seed);
      if (plant.fadeStart) alpha *= 1 - (t - plant.fadeStart) / FADE_MS;
      if (alpha <= 0) continue;

      // Her derinlik için ayrı çizgi kalınlığı: gövde kalın, uç dallar ince
      const sparks = [];
      const passes = [
        { width: 9, color: plant.color.line, alpha: 0.06 },
        { width: 3.4, color: plant.color.line, alpha: 0.32 },
        { width: 1.3, color: plant.color.core, alpha: 0.95 },
      ];

      for (const pass of passes) {
        for (let depth = 0; depth <= 3; depth++) {
          const scale = depth === 0 ? 1 : depth === 1 ? 0.75 : 0.55;
          ctx.beginPath();
          let any = false;
          for (const s of plant.segments) {
            if (s.depth !== depth) continue;
            const p = clamp((age - s.t0) / SEGMENT_MS, 0, 1);
            if (p <= 0) continue;
            const x0 = rootX + s.x0;
            const y0 = gy + s.y0;
            const x1 = x0 + (s.x1 - s.x0) * p;
            const y1 = y0 + (s.y1 - s.y0) * p;
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            any = true;
            if (pass === passes[0] && p < 1) sparks.push([x1, y1]);
          }
          if (!any) continue;
          ctx.globalAlpha = pass.alpha * alpha;
          ctx.strokeStyle = pass.color;
          ctx.lineWidth = pass.width * scale;
          ctx.stroke();
        }
      }

      // Kök parıltısı
      const lineSprite = glowSprite(plant.color.line);
      ctx.globalAlpha = 0.55 * alpha;
      ctx.drawImage(lineSprite, rootX - 14, gy - 14, 28, 28);

      // Büyüyen uçlardaki kıvılcımlar
      const coreSprite = glowSprite(plant.color.core);
      ctx.globalAlpha = alpha;
      for (const [sx, sy] of sparks) ctx.drawImage(coreSprite, sx - 9, sy - 9, 18, 18);

      // Dal uçlarındaki tomurcuklar
      for (const tip of plant.tips) {
        const since = age - tip.t;
        if (since < 0) continue;
        const pop = clamp(since / 260, 0, 1);
        const pulse = reduceMotion.matches ? 1 : 0.85 + 0.15 * Math.sin(t * 0.004 + tip.x);
        const r = 13 * pop * pulse;
        const x = rootX + tip.x;
        const y = gy + tip.y;
        ctx.globalAlpha = 0.9 * alpha;
        ctx.drawImage(lineSprite, x - r, y - r, r * 2, r * 2);
        ctx.globalAlpha = alpha;
        ctx.drawImage(coreSprite, x - r * 0.35, y - r * 0.35, r * 0.7, r * 0.7);
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  // ---------- Döngü ----------
  function frame() {
    rafId = 0;
    draw();
    if (visible && !reduceMotion.matches && plants.length) rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (!rafId && visible && !reduceMotion.matches) rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function resize() {
    const rect = area.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const firstTime = width === 0;
    width = rect.width;
    height = rect.height;
    ground = soil ? soil.offsetTop : height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // İlk bitkileri yazı tipleri yüklendikten sonra ek: yazının gerçek boyutu o zaman belli olur
    if (firstTime) {
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))]).then(() => {
        ground = soil ? soil.offsetTop : height;
        seedGarden();
      });
    }
    draw();
    start();
  }

  // ---------- Etkileşim ----------
  area.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('a, button, [data-soil]')) return;
    const rect = area.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const target = clamp(groundY() - y, 50, ground * 0.95);
    addPlant(x / width, target);
  });

  if (plantButton) {
    plantButton.addEventListener('click', () => {
      const x = rand(0.05, 0.95);
      addPlant(x, Math.min(rand(ground * 0.25, ground * 0.65), freeHeightAt(x * width)));
    });
  }

  // Görünmüyorsa (aşağı kaydırıldıysa ya da sekme arkadaysa) çizmeyi durdur
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      visible ? start() : stop();
    }).observe(area);
  }
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    visible ? start() : stop();
  });

  reduceMotion.addEventListener?.('change', () => { draw(); start(); });

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(area);
  } else {
    window.addEventListener('resize', resize);
  }
  resize();
})();
