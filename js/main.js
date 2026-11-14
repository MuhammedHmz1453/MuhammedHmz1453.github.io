// =========================================================
// Portfolyo — genel davranışlar
// Menü, tema, e-posta kopyalama, iletişim formu, yıl
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupTheme();
  setupCopyEmail();
  setupContactForm();

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
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : systemDark.matches;

  const updateLabel = () => {
    btn.setAttribute('aria-label', isDark() ? 'Açık temaya geç' : 'Koyu temaya geç');
  };

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('tema', next === 'dark' ? 'koyu' : 'acik'); } catch (e) {}
    updateLabel();
  });

  systemDark.addEventListener?.('change', updateLabel);
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
