// =========================================================
// Portfolyo — genel davranışlar
// Menü, tema, e-posta kopyalama, iletişim formu, yıl
// =========================================================

// ---------- Dil ----------
// Sayfanın dili <html lang> özelliğinden okunur; JS'in gösterdiği yazılar buradan gelir.
const DIL = document.documentElement.lang === 'en' ? 'en' : 'tr';
const YAZI = {
  tr: {
    kapat: 'Kapat',
    menu: 'Menü',
    acikTema: 'Açık temaya geç',
    koyuTema: 'Koyu temaya geç',
    kopyalandi: (e) => `Kopyalandı: ${e}`,
    kopyalanamadi: 'Kopyalanamadı. Adresi seçip elle kopyalayabilirsin.',
    epostaKopyalandi: (e) => `E-posta adresim kopyalandı: ${e}`,
    epostaKopyalanamadi: (e) => `Kopyalanamadı. Adresim: ${e}`,
    adHata: 'Adını yaz, sana nasıl hitap edeceğimi bileyim.',
    epostaBos: 'E-posta adresini yaz, sana dönebileyim.',
    epostaHatali: 'E-posta adresini kontrol et: ornek@alanadi.com gibi olmalı.',
    mesajHata: 'İhtiyaçlarını birkaç cümleyle yaz: nasıl bir site istiyorsun, işin ne?',
    onayHata: 'Talebini gönderebilmek için onay kutusunu işaretlemelisin. İstemezsen bana doğrudan e-posta da yazabilirsin.',
    dogrudanYaz: ' adresine doğrudan yazabilirsin.',
    gonderiliyor: 'Gönderiliyor…',
    tesekkurler: (ad, e) => `Teşekkürler ${ad}, teklif talebin bana ulaştı. Teklifimi en kısa sürede ${e} adresine gönderiyorum.`,
    etkinDegil: 'Mesaj formu henüz etkinleştirilmedi, mesajın iletilemedi. Şimdilik',
    gonderilemedi: 'Mesaj gönderilemedi. İnternet bağlantını kontrol edip tekrar dene ya da',
    yeniSurum: 'Sitenin yeni sürümü hazır. Mesajını gönderdikten sonra sayfayı yenileyebilirsin.',
  },
  en: {
    kapat: 'Close',
    menu: 'Menu',
    acikTema: 'Switch to light theme',
    koyuTema: 'Switch to dark theme',
    kopyalandi: (e) => `Copied: ${e}`,
    kopyalanamadi: "Couldn't copy. You can select the address and copy it manually.",
    epostaKopyalandi: (e) => `My email address was copied: ${e}`,
    epostaKopyalanamadi: (e) => `Couldn't copy. My address: ${e}`,
    adHata: 'Please write your name so I know how to address you.',
    epostaBos: 'Please write your email address so I can get back to you.',
    epostaHatali: 'Please check your email address: it should look like name@example.com.',
    mesajHata: 'Describe your needs in a few sentences: what kind of website do you want, and what is your business?',
    onayHata: 'Please tick the consent box to send your request. If you prefer not to, you can also email me directly.',
    dogrudanYaz: ' directly.',
    gonderiliyor: 'Sending…',
    tesekkurler: (ad, e) => `Thank you ${ad}, your quote request has reached me. I'll send my quote to ${e} as soon as possible.`,
    etkinDegil: "The contact form hasn't been activated yet, so your message couldn't be delivered. For now, you can write to",
    gonderilemedi: "Your message couldn't be sent. Check your internet connection and try again, or write to",
    yeniSurum: 'A new version of the site is ready. You can refresh the page after sending your message.',
  },
}[DIL];

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
  setupAutoUpdate();
  setupLangSwitch();
  setupSelects();
  setupPlanCta();

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
    toggle.textContent = open ? YAZI.kapat : YAZI.menu;
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
    btn.setAttribute('aria-label', isDark() ? YAZI.acikTema : YAZI.koyuTema);
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
        status.textContent = ok ? YAZI.kopyalandi(email) : YAZI.kopyalanamadi;
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
      showToast(ok ? YAZI.epostaKopyalandi(email) : YAZI.epostaKopyalanamadi(email), ok);
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
    ad: (v) => v ? '' : YAZI.adHata,
    eposta: (v) => {
      if (!v) return YAZI.epostaBos;
      if (!emailPattern.test(v)) return YAZI.epostaHatali;
      return '';
    },
    mesaj: (v) => v ? '' : YAZI.mesajHata,
    // KVKK onay kutusu: işaretli değilse mesaj gönderilmez
    onay: (v) => v ? '' : YAZI.onayHata,
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
      status.append(' ', a, YAZI.dogrudanYaz);
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
    btn.textContent = YAZI.gonderiliyor;
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
          Hizmet: (form.hizmet && form.hizmet.value) || 'Seçilmedi',
          Paket: (form.paket && form.paket.value) || 'Seçilmedi',
          'İhtiyaçlar': message,
          Dil: DIL === 'en' ? 'İngilizce (English)' : 'Türkçe',
          'KVKK onayı': `Aydınlatma metni okundu, yurt dışına aktarıma açık rıza verildi (${new Date().toLocaleString('tr-TR')})`,
          _replyto: email,
          _subject: `Yeni teklif talebi${DIL === 'en' ? ' (EN)' : ''}: ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) === 'true') {
        form.reset();
        if (form.onay) form.onay.removeAttribute('aria-invalid');
        showStatus('ok', YAZI.tesekkurler(name, email));
      } else if (/activ/i.test(data.message || '')) {
        // FormSubmit'te ilk mesajdan sonra site sahibinin onaylaması gerekir
        showStatus('error', YAZI.etkinDegil, true);
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      showStatus('error', YAZI.gonderilemedi, true);
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
  Promise.race([fonts, new Promise((r) => setTimeout(r, 600))]).then(ready);
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Kaydırınca beliren bölümler ----------
function setupReveal() {
  const items = document.querySelectorAll('[data-reveal], [data-reveal-project]');
  if (!items.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('reveal-on');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -2% 0px' });

  items.forEach((el) => observer.observe(el));
}

// ---------- Menü: "tubelight" ----------
// Aktif bağlantının arkasındaki ışık ve üstündeki floresan çubuk, tıklayınca ya da
// sayfa kaydırılınca yay hareketiyle (sertlik 300, sönüm 30) yeni bağlantıya kayar.
function setupScrollSpy() {
  const bar = document.querySelector('.tube__bar');
  if (!bar) return;
  const lamp = bar.querySelector('.tube__lamp');
  const light = lamp.querySelector('.tube__light');
  const links = [...bar.querySelectorAll('.tube__link')];
  const targets = links.map((a) => {
    const id = a.getAttribute('href').slice(1);
    return id ? document.getElementById(id) : null;
  });
  const reduce = prefersReducedMotion();

  // Lamba yalnızca transform ile hareket eder (genişlik scaleX ile): her karede sayfa
  // yeniden yerleşmez, iş ekran kartında (GPU) biter. Ölçüler önbellekte tutulur.
  const BASE = 100;
  let boxes = [];
  const measure = () => {
    boxes = links.map((a) => ({ x: a.offsetLeft, w: a.offsetWidth, y: a.offsetTop, h: a.offsetHeight }));
  };

  const STIFFNESS = 320;
  const DAMPING = 32;
  const s = { x: 0, w: BASE, vx: 0, vw: 0, tx: 0, tw: BASE };
  let frame = 0;
  let last = 0;
  let active = -1;
  let placed = false;

  const draw = () => {
    const k = s.w / BASE;
    lamp.style.transform = `translate3d(${s.x}px,0,0) scaleX(${k})`;
    light.style.transform = `translateX(-50%) scaleX(${1 / k})`;
  };

  const tick = (now) => {
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    // yarım adımlarla hesapla: düşük kare hızında bile yay sarsılmaz
    for (let n = 0; n < 2; n++) {
      const h = dt / 2;
      s.vx += (-STIFFNESS * (s.x - s.tx) - DAMPING * s.vx) * h;
      s.x += s.vx * h;
      s.vw += (-STIFFNESS * (s.w - s.tw) - DAMPING * s.vw) * h;
      s.w += s.vw * h;
    }
    const settled = Math.abs(s.x - s.tx) < 0.25 && Math.abs(s.w - s.tw) < 0.25
      && Math.abs(s.vx) < 1.5 && Math.abs(s.vw) < 1.5;
    if (settled) {
      s.x = s.tx; s.w = s.tw; s.vx = 0; s.vw = 0;
      draw();
      frame = 0;
      return;
    }
    draw();
    frame = requestAnimationFrame(tick);
  };

  const place = (i, instant) => {
    const b = boxes[i];
    if (!b) return;
    s.tx = b.x;
    s.tw = b.w;
    lamp.style.top = `${b.y}px`;
    lamp.style.height = `${b.h}px`;
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

  const setActive = (i, instant = false) => {
    if (i < 0) return;
    if (i === active) {
      if (instant) place(i, true);
      return;
    }
    const prev = links[active];
    active = i;
    if (prev) {
      prev.classList.remove('is-active');
      prev.removeAttribute('aria-current');
    }
    links[i].classList.add('is-active');
    links[i].setAttribute('aria-current', 'true');
    place(i, instant);
  };

  // Kaydırınca: ekranın üstten %40'ındaki çizgiyi geçen son bölüm aktif olur.
  // Konumları kaydırma sırasında ölçmek yerine IntersectionObserver kullanılır.
  const above = new Set();
  let locked = false;
  let unlockTimer = 0;
  let docH = document.documentElement.scrollHeight;

  const pick = () => {
    if (locked) return;
    let index = 0;
    targets.forEach((el, i) => { if (el && above.has(el)) index = i; });
    if (window.innerHeight + window.scrollY >= docH - 2) index = targets.length - 1;
    setActive(index);
  };

  const io = new IntersectionObserver((entries) => {
    // gözlem alanı sayfanın çok yukarısından %40 çizgisine kadar uzanır:
    // bölüm bu alana değiyorsa üst kenarı çizgiyi geçmiş demektir (hızlı atlamalarda da doğru kalır)
    entries.forEach((e) => {
      if (e.isIntersecting) above.add(e.target);
      else above.delete(e.target);
    });
    pick();
  }, { rootMargin: '100000px 0px -60% 0px' });
  targets.forEach((el) => el && io.observe(el));

  // sayfanın en altı: son bağlantı (bölümü kısa olsa bile) yansın
  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; pick(); });
  }, { passive: true });

  // Tıklayınca: lamba hemen o bağlantıya geçer; kaydırma bitene kadar arada kalan bölümler onu çekmez
  const unlock = () => {
    clearTimeout(unlockTimer);
    locked = false;
    pick();
  };
  links.forEach((a, i) => a.addEventListener('click', () => {
    setActive(i);
    locked = true;
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlock, 1600);
  }));
  window.addEventListener('scrollend', () => { if (locked) unlock(); });

  const refresh = () => {
    measure();
    docH = document.documentElement.scrollHeight;
    if (active >= 0) place(active, true);
  };
  window.addEventListener('resize', refresh);
  if ('ResizeObserver' in window) new ResizeObserver(() => { docH = document.documentElement.scrollHeight; }).observe(document.body);
  if (document.fonts) document.fonts.ready.then(refresh);

  measure();
  setActive(0, true);
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
  if (!window.matchMedia('(any-hover: hover)').matches) return;
  document.querySelectorAll('.project, .service, .plan').forEach((card) => {
    // konum kart üzerine gelince bir kez ölçülür; güncelleme karede en çok bir kez yapılır
    let rect = null;
    let frame = 0;
    let x = 0;
    let y = 0;
    card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    }, { passive: true });
    card.addEventListener('pointerleave', () => { rect = null; });
    window.addEventListener('scroll', () => { rect = null; }, { passive: true });
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

// ---------- Fiyat paketlerindeki "Teklif al" ----------
// İletişim formuna kaydırır ve mesaj alanı boşsa paket adını içeren bir mesaj yazar.
// ---------- Teklif formundaki seçim kutuları ----------
// Tarayıcının sade açılır listesi yerine sitenin tasarımında, animasyonlu bir liste.
// Asıl <select> gizli olarak formda kalır (değer oradan gönderilir); klavyeyle
// (ok tuşları, Enter, Esc, Home/End, harfle arama) ve ekran okuyucuyla kullanılabilir.
const SELECT_IKONLARI = {
  kurumsal: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
  eticaret: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  isletme: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>',
  yenileme: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  paket: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12M3.29 7 12 12l8.71-5"/>',
  bos: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
};
const svgIkon = (ad) => `<svg viewBox="0 0 24 24" aria-hidden="true">${SELECT_IKONLARI[ad] || SELECT_IKONLARI.paket}</svg>`;

function setupSelects() {
  document.querySelectorAll('.field select').forEach((select, n) => {
    const label = document.querySelector(`label[for="${select.id}"]`);
    const wrap = document.createElement('div');
    wrap.className = 'dd';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dd__btn';
    btn.id = `${select.id}-dd`;
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    const list = document.createElement('ul');
    list.className = 'dd__list';
    list.id = `${select.id}-liste`;
    list.setAttribute('role', 'listbox');
    list.tabIndex = -1;
    btn.setAttribute('aria-controls', list.id);
    if (label) {
      label.id = label.id || `${select.id}-etiket`;
      btn.setAttribute('aria-labelledby', `${label.id} ${btn.id}`);
      list.setAttribute('aria-labelledby', label.id);
      label.htmlFor = btn.id; // etikete tıklayınca liste düğmesi odaklansın
    }

    const opts = [...select.options].map((o, i) => {
      const li = document.createElement('li');
      li.id = `${select.id}-sec-${i}`;
      li.className = 'dd__opt' + (o.value === '' ? ' dd__opt--bos' : '');
      if (o.value === '') li.hidden = true; // "Seç" yalnızca kutuda yazar, listede seçenek olarak çıkmaz
      li.setAttribute('role', 'option');
      li.dataset.value = o.value;
      const isPaket = select.name === 'paket';
      const ikon = o.value === '' ? 'bos' : (o.dataset.ikon || 'paket');
      const ad = isPaket && o.value ? o.value : o.text;
      li.innerHTML = `<span class="dd__icon">${svgIkon(ikon)}</span><span class="dd__text">${ad}</span>`
        + (o.dataset.fiyat ? `<span class="dd__price">${o.dataset.fiyat}</span>` : '')
        + '<svg class="dd__check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      list.append(li);
      return li;
    });

    select.classList.add('dd__native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    select.before(wrap);
    wrap.append(btn, list, select);

    let active = -1;
    const render = () => {
      const i = select.selectedIndex < 0 ? 0 : select.selectedIndex;
      const o = opts[i];
      btn.innerHTML = `<span class="dd__icon">${o.querySelector('.dd__icon').innerHTML}</span>`
        + `<span class="dd__val${select.value === '' ? ' is-empty' : ''}">${o.querySelector('.dd__text').textContent}</span>`
        + '<svg class="dd__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
      opts.forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
    };
    const ilk = opts.findIndex((li) => !li.hidden);
    const setActive = (i) => {
      active = Math.max(ilk, Math.min(opts.length - 1, i));
      opts.forEach((li, k) => li.classList.toggle('is-active', k === active));
      list.setAttribute('aria-activedescendant', opts[active].id);
      opts[active].scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      if (wrap.classList.contains('is-open')) return;
      document.querySelectorAll('.dd.is-open').forEach((d) => d !== wrap && d.dispatchEvent(new Event('dd-kapat')));
      // altta yer yoksa (telefonda alttaki menü dahil) liste yukarı doğru açılır
      const r = btn.getBoundingClientRect();
      const altMenu = window.innerWidth < 768 ? 100 : 16;
      const listH = Math.min(300, list.scrollHeight + 2);
      const asagi = window.innerHeight - r.bottom - altMenu;
      wrap.classList.toggle('dd--up', asagi < listH + 8 && r.top > asagi);
      wrap.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      setActive(select.selectedIndex < 0 ? 0 : select.selectedIndex);
      list.focus({ preventScroll: true });
    };
    const close = (focusBtn = true) => {
      if (!wrap.classList.contains('is-open')) return;
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus({ preventScroll: true });
    };
    const choose = (i) => {
      select.selectedIndex = i;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      close();
      wrap.classList.remove('is-picked');
      void wrap.offsetWidth; // seçim animasyonu her seferinde baştan oynasın
      wrap.classList.add('is-picked');
    };

    wrap.addEventListener('dd-kapat', () => close(false));
    btn.addEventListener('click', () => (wrap.classList.contains('is-open') ? close() : open()));
    btn.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
    });
    opts.forEach((li, i) => {
      li.addEventListener('click', () => choose(i));
      li.addEventListener('pointermove', () => { if (active !== i) setActive(i); });
    });
    let aranan = '';
    let aramaZamani = 0;
    list.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(ilk); }
      else if (e.key === 'End') { e.preventDefault(); setActive(opts.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') { close(false); }
      else if (e.key.length === 1) {
        const now = Date.now();
        aranan = (now - aramaZamani > 700 ? '' : aranan) + e.key.toLocaleLowerCase('tr');
        aramaZamani = now;
        const k = opts.findIndex((li) => !li.hidden && li.textContent.trim().toLocaleLowerCase('tr').startsWith(aranan));
        if (k >= 0) setActive(k);
      }
    });
    document.addEventListener('pointerdown', (e) => { if (!wrap.contains(e.target)) close(false); });
    select.addEventListener('change', render);
    select.form && select.form.addEventListener('reset', () => setTimeout(render));
    render();
  });
}

function setupPlanCta() {
  const paket = document.getElementById('f-paket');
  const mesaj = document.getElementById('f-mesaj');
  document.querySelectorAll('[data-paket]').forEach((a) => {
    a.addEventListener('click', () => {
      // seçilen paket formda hazır seçili gelir, imleç ihtiyaçlar alanına geçer
      if (paket) {
        paket.value = a.dataset.paket;
        paket.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (!mesaj) return;
      setTimeout(() => mesaj.focus({ preventScroll: true }), 700);
    });
  });
}

// ---------- Otomatik güncelleme ----------
// Site yeniden yayınlandığında, açık kalan sekmeler eski hâli göstermesin: sekmeye
// dönüldüğünde ve sekme açıkken dakikada bir /surum.json kontrol edilir; sürüm
// değiştiyse sayfa kendiliğinden yenilenir. Formda yazılmış bir şey varsa yazı
// kaybolmasın diye yenilemek yerine küçük bir bildirim gösterilir.
function setupAutoUpdate() {
  const meta = document.querySelector('meta[name="surum"]');
  if (!meta || !window.fetch || location.protocol === 'file:') return;
  const current = meta.content;
  let notified = false;

  const formHasText = () => [...document.querySelectorAll('form input:not([type=hidden]):not([type=checkbox]), form textarea')]
    .some((el) => el.value && el.value.trim());

  const check = async () => {
    if (document.visibilityState !== 'visible') return;
    try {
      const res = await fetch(`/surum.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      const { surum } = await res.json();
      if (!surum || surum === current) return;
      // aynı sürüm için yalnızca bir kez yenile (önbellek eski sayfayı verirse döngüye girmesin)
      let tried = null;
      try { tried = sessionStorage.getItem('surum-denendi'); } catch (e) { /* gizli sekme */ }
      if (tried === surum) return;
      if (!formHasText()) {
        try { sessionStorage.setItem('surum-denendi', surum); } catch (e) { /* gizli sekme */ }
        location.reload();
      } else if (!notified && typeof showToast === 'function') {
        notified = true;
        showToast(YAZI.yeniSurum, true);
      }
    } catch (e) { /* çevrimdışı ya da geçici hata: sonra tekrar dene */ }
  };

  document.addEventListener('visibilitychange', check);
  window.addEventListener('focus', check);
  window.addEventListener('pageshow', (e) => { if (e.persisted) check(); });
  setInterval(check, 60000);
}

// ---------- Dil değiştirme animasyonu ----------
// TR/EN düğmesine basınca düğmeden başlayan mor-mavi bir daire ekranı kaplar ve
// gidilecek dilin adı belirir; yeni sayfa açılınca daire aynı noktaya doğru çekilir.
// Bulunduğun bölüm korunur (Projeler'deysen öteki dilde de Projeler açılır).
const BOLUMLER = { tr: ['hakkimda', 'hizmetler', 'projeler', 'fiyatlar', 'sss', 'iletisim'], en: ['about', 'services', 'projects', 'packages', 'faq', 'contact'] };
function setupLangSwitch() {
  const links = document.querySelectorAll('[data-lang-link]');
  if (!links.length) return;
  const reduce = prefersReducedMotion();
  let gidiyor = false;

  links.forEach((link) => link.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0 || gidiyor) return;
    e.preventDefault();
    gidiyor = true;
    const hedefDil = (link.getAttribute('hreflang') || link.lang || '').slice(0, 2) === 'en' ? 'en' : 'tr';
    let url = link.href.split('#')[0];
    // ana sayfadaysak açık olan bölümü öteki dilde de aç
    const aktif = document.querySelector('.tube__link.is-active');
    if (aktif) {
      const k = BOLUMLER[DIL].indexOf(aktif.getAttribute('href').slice(1));
      if (k >= 0) url += `#${BOLUMLER[hedefDil][k]}`;
    }
    const r = link.getBoundingClientRect();
    const x = ((r.left + r.width / 2) / window.innerWidth) * 100;
    const y = ((r.top + r.height / 2) / window.innerHeight) * 100;
    const yazi = hedefDil === 'en' ? 'English' : 'Türkçe';
    if (reduce) { location.href = url; return; }
    try { sessionStorage.setItem('dil-gecis', JSON.stringify({ x, y, yazi })); } catch (err) { /* gizli sekme */ }

    const perde = document.createElement('div');
    perde.className = 'dil-perde';
    perde.style.setProperty('--dg-x', `${x}%`);
    perde.style.setProperty('--dg-y', `${y}%`);
    perde.innerHTML = `<span>${yazi}</span>`;
    document.body.append(perde);
    perde.getBoundingClientRect();
    perde.classList.add('is-on');
    setTimeout(() => { location.href = url; }, 260);
  }));

  // Geri tuşuyla bu sayfaya dönülürse (tarayıcı hafızasından) perde kalmasın
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    gidiyor = false;
    document.querySelectorAll('.dil-perde').forEach((p) => p.remove());
  });
}

