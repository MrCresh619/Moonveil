# Moonveil 1.2.8 (12) — legal and store release checklist

Date: **13 August 2026**  
Package: **`com.tealdev.moonveil`**  
App name in Google Play: **Moonveil – Tarot & Numerology**  
AAB: **version 1.2.8, versionCode 12**  
Legal-content baseline commit: **`e558b77ac9c598adc8419c29b1d27b8f2dc06f5e`**

## Published and verified

- [x] Privacy Policy updated to version 1.1 and names RevenueCat explicitly.
- [x] Terms updated to version 1.1 and limited to the current Tarot/numerology release scope.
- [x] Premium wording limited to saved profile and personal/name numerology; one-time decks remain separate.
- [x] Account-deletion instructions are publicly available.
- [x] Google Play Data Safety form submitted on 11 August 2026; Google review is pending.
- [x] RevenueCat paywall `wf3a25160e977b42a9` is published with Privacy Policy and Terms links.
- [x] Final AAB configuration uses the canonical legal and account-deletion URLs.

Canonical public URLs:

- https://mrcresh619.github.io/Moonveil/privacy.html
- https://mrcresh619.github.io/Moonveil/terms.html
- https://mrcresh619.github.io/Moonveil/account-deletion.html

## Required before production rollout

- [x] Remove the Google Play store tag **Horoscopes / Horoskopy**. Verified in Play Console on 13 August 2026; current tags: **Samorozwój**, **Styl życia**.
- [ ] Install AAB 1.2.8 (12) through Google Play Internal Testing on a physical device.
- [ ] On that installed build, open every Privacy Policy, Terms, support and account-deletion link.
- [ ] Using one disposable tester account, verify: create/sign in → RevenueCat subscriber exists → delete in App → backend account and RevenueCat subscriber are removed → signing in again creates a new clean account.
- [ ] Retain the tested account identifier, device/Android version, UTC timestamps, result screenshots and the final Google Play review state. Do not commit personal data or access tokens.

Production rollout remains **NO-GO** until every unchecked item above has retained evidence.
