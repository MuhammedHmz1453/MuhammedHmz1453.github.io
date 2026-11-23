---
layout: yasal
lang: en
ceviri: /gizlilik-politikasi/
title: Privacy Policy
kisa_ad: Privacy Policy
sira: 3
permalink: /en/privacy-policy/
guncelleme: 22 November 2026
aciklama: Privacy policy on what information is collected on this website and how it is used and protected.
---
{%- assign g = site.data.genel -%}
{%- assign tam_ad = g.ad | append: " " | append: g.soyad | strip -%}
{%- assign eposta = site.data.iletisim.eposta -%}

This privacy policy applies to the personal website at **{{ site.url | remove: "https://" }}** published by **{{ tam_ad }}** and to the copy of the site on GitHub Pages (the "Site"). I care about your privacy and process only the minimum information that is really needed.

* Contents
{:toc}

## 1. What information is collected?

**Contact form and email.** When you write to me, I receive your name, email address and message. I only receive this information when you send it, and only as much as you write.

**Server logs.** When you visit the Site, the service that hosts it (Vercel) technically records your IP address, browser and device information, the page you open and the date and time for a short period. These logs are needed for the Site to work and stay secure. They are not used to identify visitors or build profiles.

**Theme preference.** When you choose the light or dark theme, this preference is stored only in your own browser. Details are in the [Cookie Policy]({{ '/en/cookie-policy/' | relative_url }}).

**What is not collected.** The Site has no membership, payments, advertising, visitor analytics, fingerprinting or tracking cookies. Your location, contacts or other information on your device are not collected.

## 2. How is the information used?

- To read and reply to your messages,
- To evaluate your quote requests and prepare a quote for you,
- To keep the Site secure and running smoothly, and to prevent spam and misuse.

Your information is **not sold, rented or used for advertising**, and it is not used to send you newsletters or promotional emails without your permission.

## 3. Service providers used

The Site uses the infrastructure of the following services. Their servers are located outside Türkiye, mainly in the USA, and each has its own privacy policy.

| Service | Purpose | Privacy policy |
|---|---|---|
| Vercel | Hosting the Site | [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy) |
| GitHub | Storing the Site's files, GitHub Pages copy | [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) |
| FormSubmit | Forwarding messages from the contact form to my email | [formsubmit.co](https://formsubmit.co) |
| Google (Gmail) | Receiving and replying to messages | [policies.google.com/privacy](https://policies.google.com/privacy) |{% if site.data.iletisim.whatsapp and site.data.iletisim.whatsapp != "" %}
| WhatsApp | Messaging, if you choose to write to me on WhatsApp | [whatsapp.com/legal/privacy-policy](https://www.whatsapp.com/legal/privacy-policy) |{% endif %}

Before you use the contact form, you are asked to give explicit consent, with the checkbox on the form, to the transfer of your data abroad through these services. Details are in the [Privacy Notice]({{ '/en/privacy-notice/' | relative_url }}).

## 4. Retention and security

- The Site is served only over **HTTPS** (an encrypted connection).
- Messages are kept only in my email account, which only I can access, and are deleted within at most **2 years** after your request is concluded.
- Server logs are deleted automatically after a short time, according to the hosting provider's policy.
- A hidden field on the form is used to filter out bots that send spam. This field does not collect any information about you.

Although no transmission over the internet is one hundred percent secure, I take reasonable technical measures to protect your data.

## 5. External links

The Site contains links to other websites such as GitHub, Instagram, Oyunhane and Lazer Bahçesi. When you go to these sites, their own privacy and cookie policies apply. I am not responsible for their practices.

## 6. Children's privacy

The Site is a public personal website and does not knowingly collect personal data from children. If you are under 18, please use the contact form with the knowledge of your parent or guardian.

## 7. Your rights

Under Article 11 of the Turkish Personal Data Protection Law (KVKK), you have rights such as accessing your data and requesting its correction or deletion. How to use these rights is explained in the [Privacy Notice]({{ '/en/privacy-notice/' | relative_url }}).

## 8. Changes

This policy may be updated in line with changes to the Site and to legislation. The current version is always on this page and is shown with the "Last updated" date at the top.

## 9. Contact

For any questions and requests about privacy: <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Click to copy">{{ eposta }}</a>
