---
layout: yasal
title: KVKK Aydınlatma Metni
kisa_ad: KVKK Aydınlatma Metni
sira: 1
permalink: /kvkk-aydinlatma-metni/
guncelleme: 16 Kasım 2026
aciklama: 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, bu sitede kişisel verilerin nasıl işlendiğine dair aydınlatma metni.
---
{%- assign g = site.data.genel -%}
{%- assign tam_ad = g.ad | append: " " | append: g.soyad | strip -%}
{%- assign eposta = site.data.iletisim.eposta -%}

Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, **{{ site.url | remove: "https://" }}** adresindeki kişisel web sitesini ("Site") ziyaret eden ve benimle iletişime geçen kişileri bilgilendirmek için hazırlanmıştır.

* İçindekiler
{:toc}

## 1. Veri sorumlusu

Kişisel verileriniz, veri sorumlusu sıfatıyla **{{ tam_ad }}** tarafından işlenmektedir.

İletişim: <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Kopyalamak için tıkla">{{ eposta }}</a>

## 2. İşlenen kişisel veriler

| Veri kategorisi | Hangi veriler | Ne zaman |
|---|---|---|
| Kimlik | Ad, soyad | İletişim formunu doldurduğunuzda ya da e-posta gönderdiğinizde |
| İletişim | E-posta adresi | İletişim formunu doldurduğunuzda ya da e-posta gönderdiğinizde |
| Talep ve yazışma | Mesajınızın içeriği ve bana ilettiğiniz diğer bilgiler | İletişim formunu doldurduğunuzda ya da e-posta gönderdiğinizde |
| İşlem güvenliği | IP adresi, tarayıcı ve cihaz bilgisi, ziyaret edilen sayfa, tarih ve saat | Siteyi ziyaret ettiğinizde barındırma hizmetinin sunucu kayıtlarında otomatik olarak |

Mesajınızda zorunlu olmayan kişisel verilerinizi, özellikle sağlık, din, siyasi görüş gibi **özel nitelikli kişisel verilerinizi paylaşmamanızı** rica ederim.

Site; üyelik, ödeme, reklam, ziyaretçi analizi (analytics) ya da takip amaçlı çerez kullanmaz. Ayrıntılar için [Çerez Politikası]({{ '/cerez-politikasi/' | relative_url }}) sayfasına bakabilirsiniz.

## 3. Kişisel verilerin işlenme amaçları

- İletişim formu veya e-posta yoluyla ilettiğiniz mesajları almak, okumak ve yanıtlamak,
- İş, staj, serbest proje ve iş birliği tekliflerini değerlendirmek ve bu konudaki görüşmeleri yürütmek,
- Sitenin güvenli ve kesintisiz çalışmasını sağlamak; hata, kötüye kullanım ve istenmeyen mesajları (spam) tespit etmek ve önlemek,
- Hukuki yükümlülükleri yerine getirmek ve yetkili kurumların kanuna dayalı taleplerini karşılamak.

## 4. Hukuki sebepler ve toplama yöntemi

Kişisel verileriniz; iletişim formu ve e-posta aracılığıyla **elektronik ortamda**, siteyi ziyaret ettiğinizde ise barındırma hizmetinin sunucu kayıtları yoluyla **otomatik yollarla** toplanır.

Verileriniz, KVKK'nın 5. maddesinde sayılan aşağıdaki hukuki sebeplere dayanılarak işlenir:

- **Sözleşmenin kurulması veya ifası (m. 5/2-c):** İş, proje ya da iş birliği teklifinize ilişkin görüşmeleri yürütmek için gerekli olan verileriniz,
- **Meşru menfaat (m. 5/2-f):** Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, mesajlarınızı yanıtlayabilmek ve sitenin güvenliğini sağlayabilmek için gerekli olan verileriniz,
- **Hukuki yükümlülük (m. 5/2-ç):** Kanunlardan doğan yükümlülükler gerektirdiğinde,
- **Açık rıza (m. 9):** İletişim formu üzerinden gönderdiğiniz verilerin yurt dışına aktarılması için formdaki onay kutusuyla verdiğiniz açık rıza.

## 5. Kişisel verilerin aktarılması

Kişisel verileriniz satılmaz, kiralanmaz ve reklam amacıyla kimseyle paylaşılmaz. Verileriniz yalnızca yukarıdaki amaçlar için ve hizmetin teknik olarak sunulabilmesi için gerekli olduğu ölçüde aşağıdaki hizmet sağlayıcılara aktarılır:

| Alıcı | Ne için | Aktarılan veriler |
|---|---|---|
| FormSubmit (formsubmit.co) | İletişim formundaki mesajın e-posta adresime iletilmesi | Ad, e-posta adresi, mesaj, IP adresi |
| Google LLC (Gmail) | E-posta kutusu; mesajların alınması, saklanması ve yanıtlanması | Ad, e-posta adresi, mesaj ve yazışma içeriği |
| Vercel Inc. | Sitenin barındırılması | Sunucu kayıtları (IP adresi, tarayıcı bilgisi, ziyaret edilen sayfa, tarih ve saat) |
| GitHub, Inc. | Sitenin dosyalarının saklanması ve sitenin GitHub Pages üzerindeki kopyasının yayınlanması | Sitenin GitHub Pages kopyasını ziyaret ettiğinizde sunucu kayıtları |{% if site.data.iletisim.whatsapp and site.data.iletisim.whatsapp != "" %}
| WhatsApp (Meta Platforms) | WhatsApp üzerinden bana yazmayı seçtiğinizde mesajlaşma | Telefon numarası, adınız, mesajlarınız |{% endif %}
| Yetkili kamu kurum ve kuruluşları | Kanunen zorunlu hâllerde | Talep edilen veriler |

**Yurt dışına aktarım:** Yukarıdaki hizmet sağlayıcıların sunucuları Türkiye dışında, ağırlıklı olarak Amerika Birleşik Devletleri'nde bulunmaktadır. Bu nedenle verileriniz KVKK'nın 9. maddesinde öngörülen şartlar çerçevesinde yurt dışına aktarılır. İletişim formu üzerinden gönderdiğiniz veriler, formdaki onay kutusuyla verdiğiniz **açık rızaya** dayanılarak aktarılır. Açık rıza vermek istemezseniz formu kullanmak zorunda değilsiniz; bana doğrudan <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Kopyalamak için tıkla">{{ eposta }}</a> adresinden de ulaşabilirsiniz. Bu adres de Gmail altyapısını kullanır.

## 6. Saklama süresi

- **İletişim mesajları ve yazışmalar:** Talebiniz sonuçlandıktan sonra en fazla **2 yıl** saklanır, ardından silinir. Bir iş ya da proje ilişkisi kurulursa, bu ilişki boyunca ve kanuni zamanaşımı süreleri kadar saklanabilir.
- **Sunucu kayıtları:** Barındırma hizmet sağlayıcısının kendi politikasında belirlenen kısa süreler boyunca tutulur ve otomatik olarak silinir.

Saklama süresi dolan veya işlenme sebebi ortadan kalkan veriler silinir ya da anonim hâle getirilir.

## 7. KVKK 11. madde kapsamındaki haklarınız

Veri sorumlusuna başvurarak:

1. Kişisel verilerinizin işlenip işlenmediğini öğrenme,
2. İşlenmişse buna ilişkin bilgi talep etme,
3. İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,
4. Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
5. Eksik veya yanlış işlenmişse düzeltilmesini isteme,
6. KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,
7. 5. ve 6. maddeler uyarınca yapılan işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
8. İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
9. Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme

haklarına sahipsiniz. Açık rızanızı dilediğiniz zaman geri alabilirsiniz; bu durum geri alma tarihinden önce yapılan işlemleri etkilemez.

## 8. Başvuru yöntemi

Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak;

- Daha önce benimle yazıştığınız ve kayıtlı olan e-posta adresinizden <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Kopyalamak için tıkla">{{ eposta }}</a> adresine,
- Kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza veya mobil imza kullanarak aynı adrese

iletebilirsiniz. Başvurunuzda adınız, soyadınız, Türk vatandaşıysanız T.C. kimlik numaranız (yabancıysanız uyruğunuz ve pasaport numaranız), tebligata esas adresiniz veya e-posta adresiniz ve talep konunuz yer almalıdır.

Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç **30 gün** içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir. Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde cevap verilmemesi hâlinde KVKK'nın 14. maddesi uyarınca Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.

## 9. Değişiklikler

Bu metin, sitede yapılan değişikliklere ve mevzuata göre güncellenebilir. Güncel metin her zaman bu sayfada yayımlanır; sayfanın başındaki "Son güncelleme" tarihi metnin en son ne zaman değiştiğini gösterir.

Ayrıca bkz. [Gizlilik Politikası]({{ '/gizlilik-politikasi/' | relative_url }}) ve [Çerez Politikası]({{ '/cerez-politikasi/' | relative_url }}).
