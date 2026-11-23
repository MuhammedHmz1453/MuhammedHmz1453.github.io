---
layout: yasal
lang: en
ceviri: /cerez-politikasi/
title: Cookie Policy
kisa_ad: Cookie Policy
sira: 2
permalink: /en/cookie-policy/
guncelleme: 23 November 2026
aciklama: How cookies and similar browser storage technologies are used on this website.
---
{%- assign eposta = site.data.iletisim.eposta -%}

This policy explains how cookies and similar browser storage technologies are used on the website at **{{ site.url | remove: "https://" }}** (the "Site").

## In short

- The Site **does not use cookies**.
- There is no advertising, visitor analytics, social media plugin or any tool that tracks you across websites.
- Only your choice of light or dark theme is stored in your browser, and **only when you press the theme button**.
- That is why no cookie consent banner is shown on the Site.

## What is a cookie?

Cookies are small text files that the websites you visit store in your browser. Websites may use them to keep you signed in, remember your preferences, collect visitor statistics or show ads. The browser's "local storage" (localStorage) is a similar technology.

## What the Site uses

| Name | Type | What it does | How long it stays |
|---|---|---|---|
| `tema` | Local storage (localStorage) | Remembers the theme you chose (light/dark); its value is only `acik` or `koyu` | Until you delete it from your browser |

This entry stays only in your browser, is not sent to me or anyone else, and does not contain any information that identifies you. It is not created if you never press the theme button. As this functional entry is created entirely at your request, no separate consent is asked for it.

The Site also briefly stores a version number in your browser's session storage (sessionStorage) to load the latest version of the page automatically; when you switch languages, an entry for the transition animation is kept for less than a second. These entries contain no personal data and are deleted when you close the tab.

## Third parties

- **Fonts and other files** are loaded from the Site's own server. Opening the page sends no requests to third-party services such as Google Fonts.
- **Contact form:** when you press "Request a free quote", your message is forwarded to the FormSubmit (formsubmit.co) service. If JavaScript is turned off in your browser, the form redirects you to FormSubmit's page; in that case FormSubmit may use its own cookies.
- **External links:** when you click links to sites such as GitHub, Instagram, Oyunhane and Lazer Bahçesi, those sites' own cookie and privacy policies apply.
- **The admin panel** (/admin) is only for the site owner. It does not create any entries for visitors.

## How to delete your preferences

To delete your theme preference, you can clear this site's data (cookies and site data) in your browser settings. For example, in Chrome you can click the site icon in the address bar and delete the data under "Site settings". If you browse in a private window, the preference is deleted automatically when the window is closed.

## Contact

If you have questions about this policy, you can write to <a class="legal__mail" href="mailto:{{ eposta }}" data-copy-email title="Click to copy">{{ eposta }}</a>. You can find how your personal data is processed in the [Privacy Notice]({{ '/en/privacy-notice/' | relative_url }}) and the [Privacy Policy]({{ '/en/privacy-policy/' | relative_url }}).
