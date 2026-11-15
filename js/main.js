// =========================================================
// Portfolyo — genel davranışlar
// Menü, tema, e-posta kopyalama, iletişim formu, yıl
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupTheme();
  setupCopyEmail();
  setupContactForm();
  setupIntro();
  setupReveal();
  setupScrollSpy();
  setupHeaderShadow();
  setupHeroGlow();
  setupCardSpotlight();
  setupToTop();
  setupReload();

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});

// ---------- Mobil menü ----------
function setupMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Kapat' : 'Menü';
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));

  // Bir linke tıklayınca menüyü kapat
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  // Esc ile kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// ---------- Açık / koyu tema ----------
function setupTheme() {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;

  // Site varsayılan olarak koyu; açık tema sadece düğmeyle seçilir
  const isDark = () => root.dataset.theme !== 'light';

  const updateLabel = () => {
    btn.setAttribute('aria-label', isDark() ? 'Açık temaya geç' : 'Koyu temaya geç');
  };

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('tema', next === 'dark' ? 'koyu' : 'acik'); } catch (e) {}
    updateLabel();
  });

  updateLabel();
}

// ---------- E-postayı kopyala ----------
function setupCopyEmail() {
  const btn = document.querySelector('[data-copy-email]');
  const link = document.querySelector('[data-email]');
  const status = document.querySelector('.copy-status');
  if (!btn || !link) return;

  const email = link.dataset.email;
  let timer;

  btn.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch (e) {
      // Eski tarayıcılar için yedek yöntem
      const temp = document.createElement('textarea');
      temp.value = email;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try { ok = document.execCommand('copy'); } catch (err) {}
      temp.remove();
    }

    btn.textContent = ok ? 'Kopyalandı' : 'Kopyala';
    if (status) status.textContent = ok ? `${email} panoya kopyalandı.` : 'Kopyalanamadı. Adresi seçip elle kopyalayabilirsin.';
    clearTimeout(timer);
    timer = setTimeout(() => {
      btn.textContent = 'Kopyala';
      if (status) status.textContent = '';
    }, 2500);
  });
}

// ---------- İletişim formu ----------
// Sunucu gerektirmez: ziyaretçinin e-posta uygulamasını hazır mesajla açar.
function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const link = document.querySelector('[data-email]');
  if (!form || !link) return;

  const to = link.dataset.email;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    ad: (v) => v ? '' : 'Adını yaz, sana nasıl hitap edeceğimi bileyim.',
    eposta: (v) => {
      if (!v) return 'E-posta adresini yaz, sana dönebileyim.';
      if (!emailPattern.test(v)) return 'E-posta adresini kontrol et: ornek@alanadi.com gibi olmalı.';
      return '';
    },
    mesaj: (v) => v ? '' : 'Mesaj alanı boş. Ne hakkında konuşmak istediğini birkaç cümleyle yaz.',
  };

  const errorIds = { ad: 'f-ad-hata', eposta: 'f-eposta-hata', mesaj: 'f-mesaj-hata' };

  const check = (field) => {
    const msg = rules[field.name](field.value.trim());
    const errorEl = document.getElementById(errorIds[field.name]);
    errorEl.textContent = msg;
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorEl.id);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
    return !msg;
  };

  // Hata gösterildikten sonra, kullanıcı düzelttikçe hatayı kaldır
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') check(e.target);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [form.ad, form.eposta, form.mesaj];
    const results = fields.map(check);
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) {
      firstBad.focus();
      return;
    }

    const name = form.ad.value.trim();
    const subject = `Portfolyo sitesinden mesaj: ${name}`;
    const body = `${form.mesaj.value.trim()}\n\n— ${name}\n${form.eposta.value.trim()}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// ---------- Giriş bölümü açılışı ----------
// Yazı tipleri yüklenince satırlar sırayla açılır (en geç 1,2 sn sonra).
function setupIntro() {
  const root = document.documentElement;
  const ready = () => root.classList.add('is-ready');
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(ready);
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Kaydırınca beliren bölümler ----------
function setupReveal() {
  const items = document.querySelectorAll('[data-reveal], [data-reveal-project], .stage');
  if (!items.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-on');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  items.forEach((el) => observer.observe(el));
}

// ---------- Menü: "tubelight" ----------
// Aktif bağlantının arkasındaki ışık ve üstündeki floresan çubuk, tıklayınca ya da
// sayfa kaydırılınca yay hareketiyle (sertlik 300, sönüm 30) yeni bağlantıya kayar.
function setupScrollSpy() {
  const bar = document.querySelector('.tube__bar');
  if (!bar) return;
  const lamp = bar.querySelector('.tube__lamp');
  const links = [...bar.querySelectorAll('.tube__link')];
  const targets = links.map((a) => {
    const id = a.getAttribute('href').slice(1);
    return id ? document.getElementById(id) : null;
  });
  const reduce = prefersReducedMotion();

  const STIFFNESS = 300;
  const DAMPING = 30;
  const s = { x: 0, w: 0, vx: 0, vw: 0, tx: 0, tw: 0 };
  let frame = 0;
  let last = 0;
  let active = null;
  let placed = false;

  const draw = () => {
    lamp.style.transform = `translateX(${s.x}px)`;
    lamp.style.width = `${s.w}px`;
  };

  const tick = (now) => {
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    for (const [p, v, t] of [['x', 'vx', 'tx'], ['w', 'vw', 'tw']]) {
      const a = -STIFFNESS * (s[p] - s[t]) - DAMPING * s[v];
      s[v] += a * dt;
      s[p] += s[v] * dt;
    }
    const settled = Math.abs(s.x - s.tx) < 0.3 && Math.abs(s.w - s.tw) < 0.3
      && Math.abs(s.vx) < 2 && Math.abs(s.vw) < 2;
    if (settled) {
      s.x = s.tx; s.w = s.tw; s.vx = 0; s.vw = 0;
      draw();
      frame = 0;
      return;
    }
    draw();
    frame = requestAnimationFrame(tick);
  };

  const place = (link, instant) => {
    s.tx = link.offsetLeft;
    s.tw = link.offsetWidth;
    lamp.style.top = `${link.offsetTop}px`;
    lamp.style.height = `${link.offsetHeight}px`;
    if (instant || reduce || !placed) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      s.x = s.tx; s.w = s.tw; s.vx = 0; s.vw = 0;
      draw();
      placed = true;
      lamp.classList.add('is-on');
      return;
    }
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };

  const setActive = (link, instant = false) => {
    if (!link) return;
    if (link === active) {
      if (instant) place(link, true);
      return;
    }
    active = link;
    links.forEach((a) => {
      const on = a === link;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    place(link, instant);
  };

  // Kaydırınca: ekranın üstten %40'ını geçen son bölüm aktif olur
  let locked = false;
  let unlockTimer = 0;
  const fromScroll = () => {
    if (locked) return;
    const line = window.innerHeight * 0.4;
    let index = 0;
    targets.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= line) index = i;
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) index = targets.length - 1;
    setActive(links[index]);
  };
  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; fromScroll(); });
  }, { passive: true });

  // Tıklayınca: lamba hemen o bağlantıya geçer; kaydırma bitene kadar arada kalan bölümler onu çekmez
  const unlock = () => {
    clearTimeout(unlockTimer);
    locked = false;
    fromScroll();
  };
  links.forEach((a) => a.addEventListener('click', () => {
    setActive(a);
    locked = true;
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlock, 1600);
  }));
  window.addEventListener('scrollend', () => { if (locked) unlock(); });

  window.addEventListener('resize', () => active && place(active, true));
  if (document.fonts) document.fonts.ready.then(() => active && place(active, true));

  setActive(links[0], true);
  fromScroll();
}

// ---------- Kaydırınca üst menüye gölge ----------
function setupHeaderShadow() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ---------- Giriş bölümünde imleci izleyen ışık ----------
function setupHeroGlow() {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;

  // Ana sayfa: ekranı kaplayan katman; fare giriş bölümünün alt kenarından yukarıdaysa
  // (üst şerit ve menü dahil) ışık görünür, kutunun kenarında kesilmez
  const glow = document.querySelector('.cursor-glow');
  const hero = document.querySelector('.hero--full');
  if (glow && hero) {
    let frame = 0;
    let x = 0;
    let y = 0;
    window.addEventListener('pointermove', (e) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        glow.style.setProperty('--mx', `${x}px`);
        glow.style.setProperty('--my', `${y}px`);
        glow.classList.toggle('is-on', y <= hero.getBoundingClientRect().bottom);
      });
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('is-on'));
    window.addEventListener('blur', () => glow.classList.remove('is-on'));
    return;
  }

  // 404 sayfası: ışık pencerenin içinde
  const box = document.querySelector('.hero__window');
  if (!box) return;
  let frame = 0;
  let x = 0;
  let y = 0;
  box.addEventListener('pointermove', (e) => {
    const rect = box.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      box.style.setProperty('--mx', `${x}px`);
      box.style.setProperty('--my', `${y}px`);
      frame = 0;
    });
  });
  box.addEventListener('pointerenter', () => box.classList.add('is-pointer'));
  box.addEventListener('pointerleave', () => box.classList.remove('is-pointer'));
}

// ---------- Proje kartlarında imleci izleyen ışık ----------
function setupCardSpotlight() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.project, .stage, .about__card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });
}

// ---------- Başa dön düğmesi ----------
// Giriş bölümü ekrandan tamamen çıkınca sağ alt köşede belirir, geri dönünce kaybolur.
function setupToTop() {
  const btn = document.querySelector('.to-top');
  const hero = document.querySelector('.hero--full');
  if (!btn) return;
  if (!hero || !('IntersectionObserver' in window)) {
    btn.classList.add('is-visible');
    return;
  }
  new IntersectionObserver(([entry]) => {
    btn.classList.toggle('is-visible', !entry.isIntersecting);
  }).observe(hero);
}

// ---------- Site adına basınca sayfayı yenile (F5 gibi) ----------
// Adresteki #bölüm silinir ki yenilenince bir bölüme atlamasın, sayfa baştan açılsın.
function setupReload() {
  document.querySelectorAll('[data-reload]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
      location.reload();
    });
  });
}
