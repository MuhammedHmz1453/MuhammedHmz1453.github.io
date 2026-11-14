# Kişisel portfolyo sitesi

Hakkımda, Projelerim, Yetenekler ve İletişim bölümlerinden oluşan, **HTML + CSS + JavaScript** ile yazılmış portfolyo sitesi. GitHub Pages'te ücretsiz yayınlanır ve içeriği bir **yönetim panelinden** düzenlenir.

Giriş bölümünün altındaki kayan "Kullandığım teknolojiler" şeridi, panelde Yetenekler bölümüne yazdığın teknolojilerden oluşur; bilinen teknolojilerin logoları `_data/teknoloji_ikonlari.yml` dosyasında. 404 sayfasındaki "lazer bahçesi" bir `<canvas>` animasyonudur.

## Yönetim paneli

Sitenin adresinin sonuna `/admin/` ekleyince panel açılır:

**https://muhammedhmz1453.github.io/admin/**

Panelden adını, giriş yazısını, Hakkımda yazısını ve fotoğrafını, projeleri (ekran görüntüsüyle birlikte), yetenekleri, e-posta adresini ve profil linklerini değiştirebilirsin. **Kaydet**'e bastığında değişiklik GitHub'a kaydedilir. Site 1–2 dakika içinde yeniden oluşturulur, sonra sayfayı yenileyince değişikliği görürsün.

### İlk giriş: erişim token'ı oluştur (bir kere yapılır)

GitHub Pages'te sunucu olmadığı için panel şifre yerine GitHub'ın verdiği bir **erişim token'ı** ile giriş yapar. Token sadece bu depoya yazabilir.

1. https://github.com/settings/personal-access-tokens/new adresine git.
2. **Token name:** `Portfolyo paneli`
3. **Expiration:** istediğin bir süre seç (örneğin 1 yıl). Süre dolunca aynı adımlarla yenisini oluşturursun.
4. **Repository access:** **Only select repositories** seç, listeden `MuhammedHmz1453.github.io` deposunu seç.
5. **Permissions → Repository permissions → Contents:** **Read and write** seç.
6. Sayfanın altındaki **Generate token**'a bas ve çıkan `github_pat_...` ile başlayan token'ı kopyala.
7. Paneli aç, **Erişim Token'ı Kullanarak Giriş Yap** (*Sign In Using Access Token*) düğmesine bas ve token'ı yapıştır.

"GitHub ile Giriş Yap" düğmesi bu kurulumda çalışmaz; token ile giriş yap.

Token o tarayıcıda saklanır, her seferinde tekrar girmen gerekmez. **Token'ı kimseyle paylaşma.** Bir cihazını kaybedersen https://github.com/settings/personal-access-tokens sayfasından token'ı silebilirsin.

> Depo adını değiştirirsen `admin/config.yml` dosyasındaki `repo:` satırını da yeni adla güncelle.

## Dosyalar

```
├── index.html            ← sayfa şablonu (tasarım); metinler _data/ klasöründen gelir
├── _data/                ← sitenin tüm içeriği (panel bu dosyaları düzenler)
│   ├── genel.yml         ← ad, giriş yazısı, durum satırı
│   ├── hakkimda.yml
│   ├── projeler.yml
│   ├── yetenekler.yml
│   └── iletisim.yml
├── admin/                ← yönetim paneli (Sveltia CMS)
├── assets/uploads/       ← panelden yüklenen fotoğraflar
├── css/style.css         ← tasarım (renkler en üstte)
├── js/main.js            ← menü, tema, e-posta kopyalama, iletişim formu
└── js/lazer-bahcesi.js   ← giriş bölümündeki animasyon
```

GitHub Pages siteyi **Jekyll** ile oluşturur: `_data/` klasöründeki içerik, `index.html` içindeki `{{ … }}` ve `{% … %}` yerlerine yerleştirilir. Bu yüzden `index.html`'e çift tıklayıp açınca bu işaretleri görürsün; sitenin son hâlini yayındaki adreste gör.

İçerik dışında tasarımı değiştirmek istersen `css/style.css` (renkler en üstteki `:root` değişkenlerinde) ve `index.html` dosyalarını düzenle.

## GitHub Pages ayarı

Depoda **Settings → Pages** bölümünde *Source* olarak **Deploy from a branch**, branch olarak **main** ve klasör olarak **/ (root)** seçili olmalı.

## İletişim formu nasıl çalışıyor?

GitHub Pages sadece statik dosya sunar, sunucu kodu çalıştırmaz. Bu yüzden form, *Mesajı gönder*'e basıldığında ziyaretçinin e-posta uygulamasını mesaj hazır yazılmış hâlde açar (`mailto:`). Ek hesap gerekmez.

Mesajların doğrudan sana gelmesini istersen ücretsiz [Formspree](https://formspree.io) kullanabilirsin:

1. Formspree'de hesap aç, yeni form oluştur, sana verilen adresi kopyala (`https://formspree.io/f/xxxxxxx` gibi).
2. `index.html` içindeki `<form ...>` satırına `action="https://formspree.io/f/xxxxxxx" method="POST"` ekle.
3. `js/main.js` dosyasında `setupContactForm` fonksiyonunun sonundaki `window.location.href = ...` satırını `form.submit();` ile değiştir.
