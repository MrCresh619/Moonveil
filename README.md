# Moonveil legal and compliance

This repository hosts the public legal pages and the internal compliance documentation for **Moonveil – Tarot & Guidance** (`com.tealdev.moonveil`).

## Public pages

- `index.html` — legal centre
- `privacy.html` — Privacy Policy / Polityka prywatności
- `terms.html` — Terms of Use / Regulamin
- `account-deletion.html` — account and data deletion instructions
- `cookies.html` — Cookie and Local Storage Policy

## Internal documents

- `legal/project-data-and-payments.md` — verified project inventory: products, payments, data and services
- `legal/compliance-checklist.md` — launch blockers and store/legal checklist
- `legal/google-play-data-safety.md` — audited Google Play Data safety working answers
- `legal/apple-app-privacy.md` — audited App Store privacy label mapping
- `legal/record-of-processing.md` — lightweight GDPR record of processing activities
- `legal/subprocessors.md` — processor and third-party register
- `legal/legal-sources.md` — official store, vendor, GDPR and consumer-law sources

## Status

The public pages are a release-ready baseline aligned with the production audit dated 7 August 2026. They use categories of recipients and services so routine vendor changes do not make the public wording inaccurate. Exact current providers, contracting entities, locations and compliance status belong in `legal/subprocessors.md` and must be updated whenever a provider changes.

The internal documents are operational evidence and working checklists, not a substitute for advice from a qualified Polish/EU lawyer. Items marked as blockers must be closed before the corresponding production release or store declaration is submitted.

At minimum, confirm:

- legal entity, registered business address and tax identifier;
- monitored privacy and support email addresses;
- production hosting provider and backup/log retention periods;
- final Google Play, App Store and RevenueCat product configuration;
- the in-app account deletion flow and external deletion page;
- explicit opt-in/consent for optional cloud backup that may contain spiritual-profile or journal content;
- the final SDK inventory used in the released mobile binary.

Last reviewed against the Moonveil repositories and production configuration: **7 August 2026**.
