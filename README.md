# Kişisel portfolyo sitesi

Hakkımda, Projelerim, Yetenekler ve İletişim bölümlerinden oluşan, saf **HTML + CSS + JavaScript** ile yazılmış portfolyo sitesi. Hiçbir kurulum ya da derleme adımı yok: dosyaları GitHub'a yükle, GitHub Pages ücretsiz yayınlasın.

Giriş bölümündeki "lazer bahçesi" bir `<canvas>` animasyonu: ışık bitkileri yerden dallanarak büyür, boş bir yere tıklayınca yenisi eklenir.

## Dosyalar

```
portfolio/
├── index.html            ← tüm içerik (metinler, projeler, linkler)
├── css/style.css         ← tasarım (renkler en üstte)
├── js/main.js            ← menü, tema, e-posta kopyalama, iletişim formu
├── js/lazer-bahcesi.js   ← giriş bölümündeki animasyon
└── assets/favicon.svg    ← sekme ikonu
```

## 1. Kendi bilgilerinle doldur

`index.html` içinde **`DEĞİŞTİR`** yazan her yorumun altındaki metni kendi bilgilerinle değiştir. Editöründe `DEĞİŞTİR` diye aratman yeterli. Değiştirmen gerekenler:

- Adın soyadın (başlık, giriş bölümü, menüdeki logo, alt bilgi)
- Hakkımda paragrafları ve kısa bilgiler (konum, öğrendiğin şey…)
- Proje açıklamaları ve linkleri: `KULLANICI-ADIN` yazan her yere GitHub kullanıcı adını yaz
- Yetenek listeleri
- E-posta adresin (iki yerde: `href="mailto:..."` ve `data-email="..."`)
- GitHub ve LinkedIn linklerin

**Fotoğraf eklemek için:** fotoğrafını `assets/foto.jpg` olarak kaydet, Hakkımda bölümündeki yorumda yazan `<img>` satırını baş harflerin olduğu `<div>`'in yerine koy.

**Proje ekran görüntüsü eklemek için:** görüntüyü `assets/` klasörüne koy, kartın üstündeki `project__preview` bloğunu yorumda yazan `<img class="project__shot" ...>` satırıyla değiştir.

**Yeni proje eklemek için:** `<article class="project">…</article>` bloklarından birini kopyala, altına yapıştır, içini değiştir.

**Renkleri değiştirmek için:** `css/style.css` dosyasının en üstündeki `:root` değişkenlerini düzenle.

## 2. Bilgisayarında aç

`index.html` dosyasına çift tıkla, tarayıcıda açılır. (VS Code kullanıyorsan "Live Server" eklentisiyle kaydettikçe sayfa kendiliğinden yenilenir.)

## 3. GitHub Pages'te ücretsiz yayınla

1. GitHub'da yeni bir depo (repository) oluştur. Adını tam olarak **`kullaniciadin.github.io`** koy (kendi kullanıcı adınla). Böylece siten `https://kullaniciadin.github.io` adresinde açılır.
2. Bu klasördeki **tüm dosyaları** depoya yükle:
   - **Kolay yol:** depo sayfasında *Add file → Upload files*, dosyaları sürükle bırak, *Commit changes*.
   - **Git ile:**
     ```bash
     git init
     git add .
     git commit -m "Portfolyo sitesi"
     git branch -M main
     git remote add origin https://github.com/kullaniciadin/kullaniciadin.github.io.git
     git push -u origin main
     ```
3. Depoda **Settings → Pages** bölümüne git. *Source* olarak **Deploy from a branch**, branch olarak **main** ve klasör olarak **/ (root)** seç, kaydet.
4. 1–2 dakika bekle. Siten `https://kullaniciadin.github.io` adresinde yayında.

Sonradan bir şey değiştirdiğinde dosyaları tekrar yüklemen (ya da `git push` yapman) yeterli; site birkaç dakika içinde güncellenir.

> `index.html` dosyası deponun en üst klasöründe olmalı, bir alt klasörde değil.

## İletişim formu nasıl çalışıyor?

GitHub Pages sadece statik dosya sunar, sunucu kodu çalıştırmaz. Bu yüzden form, *Mesajı gönder*'e basıldığında ziyaretçinin e-posta uygulamasını mesaj hazır yazılmış hâlde açar (`mailto:`). Ek hesap gerekmez.

Mesajların doğrudan sana gelmesini istersen ücretsiz [Formspree](https://formspree.io) kullanabilirsin:

1. Formspree'de hesap aç, yeni form oluştur, sana verilen adresi kopyala (`https://formspree.io/f/xxxxxxx` gibi).
2. `index.html` içindeki `<form ...>` satırına `action="https://formspree.io/f/xxxxxxx" method="POST"` ekle.
3. `js/main.js` dosyasında `setupContactForm` fonksiyonunun sonundaki `window.location.href = ...` satırını `form.submit();` ile değiştir.

## Kontrol listesi (yayınlamadan önce)

- [ ] `DEĞİŞTİR` yazan her yer düzenlendi
- [ ] Tüm proje linkleri açılıyor
- [ ] Telefonda açıp baktın (tarayıcıda F12 → cihaz simgesi ile de deneyebilirsin)
- [ ] E-posta adresin doğru
