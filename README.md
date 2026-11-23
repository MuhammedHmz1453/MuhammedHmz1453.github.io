# Kişisel portfolyo sitesi

Hakkımda, Projelerim, Yetenekler ve İletişim bölümlerinden oluşan, **HTML + CSS + JavaScript** ile yazılmış portfolyo sitesi. GitHub Pages'te ücretsiz yayınlanır ve içeriği bir **yönetim panelinden** düzenlenir.

Giriş bölümünün altındaki kayan "Kullandığım teknolojiler" şeridi, panelde Yetenekler bölümüne yazdığın teknolojilerden oluşur; bilinen teknolojilerin logoları `_data/teknoloji_ikonlari.yml` dosyasında. 404 sayfasındaki "lazer bahçesi" bir `<canvas>` animasyonudur.

## Yönetim paneli

Sitenin adresinin sonuna `/admin/` ekleyince panel açılır:

**https://mhkaraca.vercel.app/admin/**

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

## İngilizce sürüm

Sitenin İngilizce sürümü **https://mhkaraca.vercel.app/en/** adresindedir; sağ üstteki **TR / EN** düğmesiyle diller arasında geçilir.

- **İngilizce içerik** `_data/en/` klasöründedir. Panelde **English (İngilizce site)** bölümünden düzenlenir.
- **Ortak bilgiler** (ad, logo, e-posta, sosyal medya linkleri, proje görselleri ve canlı linkleri, hizmet simgeleri) Türkçe içerikten alınır; bir kez değiştirmen yeter.
- **Menü, düğme ve form yazıları** `_data/arayuz.yml` dosyasındadır (Türkçe ve İngilizce).
- **Yasal metinlerin İngilizcesi** `en/` klasöründedir: Privacy Notice (KVKK), Cookie Policy, Privacy Policy. Bağlayıcı olan Türkçe metinlerdir.
- Ana sayfanın tasarımı iki dil için ortaktır: `_layouts/anasayfa.html`.

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

## Yayın

Site **Vercel**'de yayında: **https://mhkaraca.vercel.app**

Vercel projesi (`muhammedhamzakaraca`) bu GitHub deposuna bağlı. Eski adresler https://hamzakaraca.vercel.app ve https://muhammedhamzakaraca.vercel.app yeni adrese yönlendirilir. Depoya her kayıt (panelden yapılan değişiklikler dahil) 1–2 dakika içinde siteye yansır. Vercel siteyi `Gemfile` ve `vercel.json` dosyalarındaki ayarlarla Jekyll kullanarak derler.

Sitenin adresi değişirse `_config.yml` dosyasındaki `url:` satırını da güncelle; paylaşım önizlemesi bu adresi kullanır.

## İletişim formu nasıl çalışıyor?

Form, mesajları ücretsiz [FormSubmit](https://formsubmit.co) servisiyle doğrudan **İletişim** bölümündeki e-posta adresine gönderir. Hesap gerekmez; ziyaretçi sayfadan ayrılmaz, gönderince formun altında sonuç yazısı çıkar.

**İlk kurulum (bir kere):** Siteden ilk mesaj gönderildiğinde FormSubmit, e-posta adresine "Activate Form" bağlantılı bir onay e-postası yollar. Bağlantıya bas; o andan sonra bütün mesajlar e-postana gelir. Onaylanmadan önce gönderilen mesajlar iletilmez.

E-posta adresini panelden değiştirirsen yeni adres için de bir kere onay gerekir. Spam'e karşı formda botların doldurduğu gizli bir tuzak alan var; dolu gelen mesajlar gönderilmez.

## Yasal metinler (KVKK, çerez, gizlilik)

- `kvkk-aydinlatma-metni.md` → /kvkk-aydinlatma-metni/
- `cerez-politikasi.md` → /cerez-politikasi/
- `gizlilik-politikasi.md` → /gizlilik-politikasi/

Üçü de `_layouts/yasal.html` sayfa düzenini kullanır ve sayfanın en altındaki bağlantılardan açılır. E-posta adresi ve adın panelden (İletişim / Giriş ve genel bilgiler) otomatik gelir. Metinleri değiştirirsen dosyanın başındaki `guncelleme:` tarihini de güncelle.

İletişim formunda, mesaj gönderilmeden önce işaretlenmesi gereken bir KVKK onay kutusu vardır; onay bilgisi gelen e-postada "KVKK onayı" satırında görünür.

Metinler sitenin bugünkü işleyişine göre yazıldı: çerez yok, sadece tema tercihi tarayıcıda saklanıyor, yazı tipleri sitenin kendi sunucusundan geliyor (`assets/fonts`, `css/fonts.css`), form FormSubmit ile Gmail'e gidiyor, site Vercel'de barındırılıyor. Siteye analiz (analytics), reklam, yeni bir form servisi gibi bir şey eklenirse bu üç metnin de güncellenmesi gerekir.
