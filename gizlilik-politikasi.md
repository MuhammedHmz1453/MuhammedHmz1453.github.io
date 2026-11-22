---
layout: yasal
title: Gizlilik Politikası
kisa_ad: Gizlilik Politikası
sira: 3
permalink: /gizlilik-politikasi/
guncelleme: 16 Kasım 2026
aciklama: Bu sitede hangi bilgilerin toplandığı, nasıl kullanıldığı ve korunduğuna dair gizlilik politikası.
---
{%- assign g = site.data.genel -%}
{%- assign tam_ad = g.ad | append: " " | append: g.soyad | strip -%}
{%- assign eposta = site.data.iletisim.eposta -%}

Bu gizlilik politikası, **{{ tam_ad }}** tarafından yayımlanan **{{ site.url | remove: "https://" }}** adresindeki kişisel web sitesi ve sitenin GitHub Pages üzerindeki kopyası ("Site") için geçerlidir. Gizliliğinize önem veriyorum ve yalnızca gerçekten gerekli olan en az bilgiyi işliyorum.

* İçindekiler
{:toc}

## 1. Hangi bilgiler toplanır?

**İletişim formu ve e-posta.** Bana yazdığınızda adınızı, e-posta adresinizi ve mesajınızı alırım. Bu bilgileri yalnızca siz gönderdiğinizde, sizin yazdığınız kadarıyla alırım.

**Sunucu kayıtları.** Siteyi ziyaret ettiğinizde, sitenin barındırıldığı hizmet (Vercel) teknik olarak IP adresinizi, tarayıcı ve cihaz bilginizi, açtığınız sayfayı ve tarih-saati kısa süreliğine kaydeder. Bu kayıtlar sitenin çalışması ve güvenliği için gereklidir. Ziyaretçileri tanımak veya profil çıkarmak için kullanılmaz.

**Tema tercihi.** Açık veya koyu temayı seçtiğinizde bu tercih yalnızca kendi tarayıcınızda saklanır. Ayrıntılar [Çerez Politikası]({{ '/cerez-politikasi/' | relative_url }}) sayfasındadır.

**Toplanmayanlar.** Sitede üyelik, ödeme, reklam, ziyaretçi analizi (analytics), parmak izi (fingerprinting) veya takip çerezi yoktur. Konumunuz, rehberiniz ya da cihazınızdaki başka bilgiler alınmaz.

## 2. Bilgiler nasıl kullanılır?

- Mesajlarınızı okumak ve yanıtlamak,
- İş, proje ve iş birliği tekliflerini değerlendirmek,
- Sitenin güvenli ve sorunsuz çalışmasını sağlamak, spam ve kötüye kullanımı önlemek.

Bilgileriniz **satılmaz, kiralanmaz, reklam için kullanılmaz** ve izniniz olmadan bülten ya da tanıtım e-postası göndermek için kullanılmaz.

## 3. Kullanılan hizmet sağlayıcılar

Site, aşağıdaki hizmetlerin altyapısını kullanır. Bu hizmetlerin sunucuları Türkiye dışında, ağırlıklı olarak ABD'de bulunur ve her birinin kendi gizlilik politikası vardır.

| Hizmet | Kullanım amacı | Gizlilik politikası |
|---|---|---|
| Vercel | Sitenin barındırılması | [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy) |
| GitHub | Site dosyalarının saklanması, GitHub Pages kopyası | [GitHub Gizlilik Bildirimi](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) |
| FormSubmit | İletişim formundaki mesajların e-postama iletilmesi | [formsubmit.co](https://formsubmit.co) |
| Google (Gmail) | Mesajların alınması ve yanıtlanması | [policies.google.com/privacy](https://policies.google.com/privacy) |{% if site.data.iletisim.whatsapp and site.data.iletisim.whatsapp != "" %}
| WhatsApp | WhatsApp üzerinden yazmayı seçtiğinizde mesajlaşma | [whatsapp.com/legal/privacy-policy](https://www.whatsapp.com/legal/privacy-policy) |{% endif %}

İletişim formunu kullanmadan önce, verilerinizin bu hizmetler aracılığıyla yurt dışına aktarılmasına formdaki onay kutusuyla açık rıza vermeniz istenir. Ayrıntılar [KVKK Aydınlatma Metni]({{ '/kvkk-aydinlatma-metni/' | relative_url }}) sayfasındadır.

## 4. Saklama ve güvenlik

- Site yalnızca **HTTPS** (şifreli bağlantı) üzerinden yayınlanır.
- Mesajlar yalnızca benim erişebildiğim e-posta hesabımda tutulur ve talebiniz sonuçlandıktan sonra en fazla **2 yıl** içinde silinir.
- Sunucu kayıtları, barındırma hizmetinin politikasına göre kısa süre sonra kendiliğinden silinir.
- Formdaki gizli bir alan, spam gönderen botları ayıklamak için kullanılır. Bu alan sizinle ilgili hiçbir bilgi toplamaz.

İnternet üzerinden yapılan hiçbir iletim yüzde yüz güvenli olmasa da verilerinizi korumak için makul teknik önlemleri alıyorum.

## 5. Dış bağlantılar

Site; GitHub, Instagram, Oyunhane ve Lazer Bahçesi gibi başka sitelere bağlantılar içerir. Bu sitelere geçtiğinizde onların kendi gizlilik ve çerez politikaları geçerli olur. Bu sitelerin uygulamalarından sorumlu değilim.

## 6. Çocukların gizliliği

Site herkese açık bir kişisel tanıtım sitesidir ve çocuklardan bilerek kişisel veri toplamaz. 18 yaşından küçükseniz iletişim formunu velinizin bilgisi dahilinde kullanmanızı rica ederim.

## 7. Haklarınız

KVKK'nın 11. maddesi kapsamında verilerinize erişme, düzeltilmesini veya silinmesini isteme gibi haklarınız vardır. Bu hakları nasıl kullanacağınız [KVKK Aydınlatma Metni]({{ '/kvkk-aydinlatma-metni/' | relative_url }}) sayfasında anlatılmıştır.

## 8. Değişiklikler

Bu politika, sitede yapılan değişikliklere ve mevzuata göre güncellenebilir. Güncel sürüm her zaman bu sayfada yer alır ve sayfanın başındaki "Son güncelleme" tarihiyle gösterilir.

## 9. İletişim

Gizlilikle ilgili her türlü soru ve talebiniz için: <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Kopyalamak için tıkla">{{ eposta }}</a>
