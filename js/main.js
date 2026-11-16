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
// E-posta adresine tıklayınca adres panoya kopyalanır. Ctrl/Cmd ile ya da orta tuşla
// tıklanırsa her zamanki gibi e-posta uygulaması açılır.
function setupCopyEmail() {
  const link = document.querySelector('[data-email]');
  const status = document.querySelector('.copy-status');

  // Adresi panoya kopyalar; eski tarayıcılar için yedek yöntem de var
  const copy = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch (e) {
      const temp = document.createElement('textarea');
      temp.value = email;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) {}
      temp.remove();
      return ok;
    }
  };
  const plainClick = (e) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

  // İletişim bölümündeki büyük e-posta adresi: kopyalar, altında "Kopyalandı" yazar
  if (link) {
    const email = link.dataset.email;
    let timer;
    link.addEventListener('click', async (e) => {
      if (!plainClick(e)) return;
      e.preventDefault();
      const ok = await copy(email);
      link.classList.toggle('is-copied', ok);
      if (status) {
        status.classList.toggle('is-ok', ok);
        status.textContent = ok ? `Kopyalandı: ${email}` : 'Kopyalanamadı. Adresi seçip elle kopyalayabilirsin.';
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        link.classList.remove('is-copied');
        if (status) { status.textContent = ''; status.classList.remove('is-ok'); }
      }, 2500);
    });
  }

  // Diğer e-posta bağlantıları (alt bilgi, yasal sayfalar): kopyalar ve kısa bildirim gösterir
  document.querySelectorAll('[data-copy-email]').forEach((a) => {
    const email = a.dataset.copyEmail || a.getAttribute('href').replace(/^mailto:/, '');
    a.addEventListener('click', async (e) => {
      if (!plainClick(e)) return;
      e.preventDefault();
      const ok = await copy(email);
      showToast(ok ? `E-posta adresim kopyalandı: ${email}` : `Kopyalanamadı. Adresim: ${email}`, ok);
    });
  });
}

// ---------- Kısa bildirim (toast) ----------
let toastTimer;
function showToast(text, ok = true) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.innerHTML = ok
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 16.5v.01"/><circle cx="12" cy="12" r="9"/></svg>';
  const span = document.createElement('span');
  span.textContent = text;
  toast.append(span);
  toast.classList.toggle('is-error', !ok);
  // bir sonraki karede göster ki geçiş animasyonu çalışsın
  requestAnimationFrame(() => toast.classList.add('is-on'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2800);
}

// ---------- İletişim formu ----------
// Mesaj FormSubmit (formsubmit.co) ile doğrudan e-posta adresine gönderilir; sayfa yenilenmez.
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
    // KVKK onay kutusu: işaretli değilse mesaj gönderilmez
    onay: (v) => v ? '' : 'Mesajı gönderebilmek için onay kutusunu işaretlemelisin. İstemezsen bana doğrudan e-posta da yazabilirsin.',
  };

  const errorIds = { ad: 'f-ad-hata', eposta: 'f-eposta-hata', mesaj: 'f-mesaj-hata', onay: 'f-onay-hata' };

  const check = (field) => {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const msg = rules[field.name](value);
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
  form.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox' && e.target.getAttribute('aria-invalid') === 'true') check(e.target);
  });

  const btn = form.querySelector('[data-submit]');
  const status = form.querySelector('.form__status');
  const btnText = btn.textContent;
  let sending = false;

  // Sonuç yazısı; hata olursa e-posta adresine doğrudan yazma bağlantısı da eklenir
  const showStatus = (type, text, withMail) => {
    status.className = `form__status is-${type}`;
    status.textContent = text;
    if (withMail) {
      const a = document.createElement('a');
      a.href = `mailto:${to}`;
      a.textContent = to;
      status.append(' ', a, ' adresine doğrudan yazabilirsin.');
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    const fields = [form.ad, form.eposta, form.mesaj, form.onay].filter(Boolean);
    const results = fields.map(check);
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) {
      firstBad.focus();
      return;
    }
    // Tuzak alan doluysa gönderen bir bottur: sessizce geç
    if (form._honey && form._honey.value) return;

    const name = form.ad.value.trim();
    const email = form.eposta.value.trim();
    const message = form.mesaj.value.trim();

    sending = true;
    btn.disabled = true;
    btn.textContent = 'Gönderiliyor…';
    status.className = 'form__status';
    status.textContent = '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Ad: name,
          email,
          Mesaj: message,
          'KVKK onayı': `Aydınlatma metni okundu, yurt dışına aktarıma açık rıza verildi (${new Date().toLocaleString('tr-TR')})`,
          _replyto: email,
          _subject: `Portfolyo sitesinden mesaj: ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) === 'true') {
        form.reset();
        if (form.onay) form.onay.removeAttribute('aria-invalid');
        showStatus('ok', `Teşekkürler ${name}, mesajın bana ulaştı. En kısa sürede ${email} adresine dönüyorum.`);
      } else if (/activ/i.test(data.message || '')) {
        // FormSubmit'te ilk mesajdan sonra site sahibinin onaylaması gerekir
        showStatus('error', 'Mesaj formu henüz etkinleştirilmedi, mesajın iletilemedi. Şimdilik', true);
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      showStatus('error', 'Mesaj gönderilemedi. İnternet bağlantını kontrol edip tekrar dene ya da', true);
    } finally {
      clearTimeout(timer);
      sending = false;
      btn.disabled = false;
      btn.textContent = btnText;
    }
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

// ---------- İmleci izleyen ışık ----------
function setupHeroGlow() {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return;

  // Ana sayfa: ekranı kaplayan katman; fare sitenin neresindeyse ışık orada yayılır
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
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
        glow.classList.add('is-on');
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
  document.querySelectorAll('.project, .stage').forEach((card) => {
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
