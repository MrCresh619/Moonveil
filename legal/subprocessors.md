# Moonveil processor, subprocessor and third-party register

Review date: **7 August 2026**

Controller: **TealDev Mateusz Pilarski**
Register owner: **Mateusz Pilarski**

This register distinguishes processors acting on Moonveil’s instructions from independent controllers such as mobile app stores. The final classification depends on the actual service, contract and configuration.

## Current and planned providers

| Provider / contracting entity | Service | Likely role | Data involved | Location / transfer mechanism | Contract and deletion status | Launch action |
|---|---|---|---|---|---|---|
| RevenueCat, Inc. | Subscription and non-consumable purchase status, entitlement synchronisation, webhooks and restore | Processor for Moonveil subscriber data; stores may remain independent controllers | Moonveil/RevenueCat user IDs, product IDs, store, purchase/subscription lifecycle, entitlement and price/currency metadata | United States and provider infrastructure; provider DPA/SCC terms must be archived and verified | Subscriber deletion through API is implemented. DPA acceptance and archival were not verified in the 7 August 2026 audit. Never send profile name, birth date, readings, notes or belief data as attributes/metadata. | Archive the applicable DPA; retain a production deletion test. Live offering currently contains monthly and annual packages, no lifetime package, and no published paywall. |
| Google LLC / Google Ireland Limited, as applicable | Google Sign-In and Google Play billing | Independent controller for Google account/store services; role may vary for technical authentication interfaces | Google user/provider ID, optional verified email, store account and purchase records | Provider-specific locations and safeguards | Google controls its own account and transaction records. Moonveil deletes its local provider link/account data. | **Blocker:** replace the false live Data safety declaration. Correct the Play-signing SHA-1/OAuth mismatch and complete OAuth production readiness. Change policy URLs only after PR #2 is merged. |
| Apple Inc. / Apple Distribution International Ltd., as applicable | Sign in with Apple and App Store billing | Independent controller for Apple account/store services; role may vary for authentication interfaces | Apple provider ID, relay/verified email where supplied, store account and purchase records | Provider-specific locations and safeguards | Apple controls its own account and transaction records. Moonveil deletes its local provider link/account data. | Configure Sign in with Apple where required, App Store products, privacy label and in-app account deletion. |
| Contabo GmbH / applicable contracting entity | EU VPS/container hosting for the Moonveil API, PostgreSQL and operational logs | Processor | Account identifiers, optional email, auth links, billing metadata, optional backup payload, logs and security metadata | Production server is in Contabo region EU; apply contractual transfer safeguards to any ancillary processing outside the EEA where required | As of 7 August 2026, no Contabo DPA was concluded, provider Auto Backup was not enabled, no provider snapshots existed and no Contabo firewall was assigned. Moonveil's deployed cleanup rotates restricted database backups by age (14 days by default) and count (maximum 20 files); the copies remain on the same VPS. | **Production blocker:** the controller must execute and archive the applicable DPA. Evidence least-privilege network controls and restore tests; plan an encrypted off-site disaster-recovery copy before relying on backup resilience. Do not enable a paid add-on or assign a firewall without an approved access/port plan. |
| Cloudflare, Inc. / applicable Cloudflare entity | R2 object storage and/or CDN/DNS/security | Processor for configured storage/delivery; may process request metadata under its service terms | Public content assets; IP/request metadata; no user backup or profile data is stored in R2 under the current design | Global provider network; Cloudflare data-processing terms and applicable SCCs | Objects are deleted through R2 lifecycle/API controls; public content only. The content custom domain is active and its minimum TLS version was raised from 1.0 to 1.2 on 7 August 2026. | Keep personal backup payloads out of R2 and retain the active DPA/transfer configuration. |
| 650 Industries, Inc. / Expo | EAS Build, EAS Submit and EAS Updates where used | Processor or independent service provider depending feature/configuration | Source/build metadata, project ID, update requests, device/app/version/network metadata according to Expo configuration | Provider infrastructure; Expo terms and applicable transfer safeguards | Expo terms/data-processing terms; project/account deletion through Expo support/account controls | Audit each final binary and update configuration; declare runtime update/diagnostic data where required. |
| GitHub, Inc. | Source control and GitHub Pages hosting for public legal pages | Processor/service provider for repository; public-site request metadata may be processed under GitHub terms | Source code and legal documents; public-page request metadata. No production user account or backup data | Provider infrastructure and applicable transfer safeguards | Organisation/account controls and repository deletion under GitHub terms | Keep secrets and production user data out of repositories. Publish only completed public legal documents. |
| Google Ireland Limited / Google LLC (Gmail) | Support, privacy requests and account-deletion requests sent to tealdevmp@gmail.com | Processor/service provider; Google may act independently for security/abuse obligations | Sender email, message, attachments, account ID, verification and case history | EEA/United States under Google's data-processing and transfer terms | Google account controls; routine closed support records are deleted after 12 months unless a legal hold applies | Keep MFA enabled, minimise verification data and review mailbox retention quarterly. |
| Cloudflare, Inc. / applicable Cloudflare entity | DNS for Moonveil services | Processor/service provider for DNS and security logs | Request metadata; operator account details | Global provider network under Cloudflare terms and applicable SCCs | Cloudflare account/DNS controls | Keep account MFA enabled and review DNS/security logging settings. |
| Legal/accounting advisers engaged case by case | Legal, tax, accounting and dispute support | Independent controller or processor depending engagement | Only records necessary for the engagement or legal obligation | Poland/EEA unless separately documented | Written engagement and confidentiality terms required before disclosure | Record each disclosure and applicable retention; no standing recipient currently appointed. |

## Services not currently approved

The following categories must not be added to a production build without prior privacy/legal review, a vendor entry, store-disclosure update and — where required — consent:

- advertising, attribution or data-broker SDKs;
- behavioural or cross-app analytics;
- session replay or screen recording;
- crash reporting that captures user content or identifiers;
- external AI interpretation/profile services;
- email marketing or customer-data platforms;
- direct web payment processors;
- support chat widgets that load third-party trackers;
- cloud backup storage outside the approved backend database.

## Vendor-onboarding checklist

Before adding or materially changing a provider:

- [ ] Document the exact contracting entity and service.
- [ ] Classify controller/processor/joint-controller roles.
- [ ] Record data categories, purposes and whether special-category data is involved.
- [ ] Confirm data locations and international-transfer safeguards.
- [ ] Review and accept a GDPR-compliant DPA where required.
- [ ] Review subprocessors and notification/change mechanism.
- [ ] Verify security controls, encryption, access, incident notification and audit commitments.
- [ ] Define retention, deletion, export and account-closure procedures.
- [ ] Confirm the service does not reuse Moonveil data for advertising/model training or unrelated purposes without a lawful basis.
- [ ] Update the internal register, ROPA, store disclosures and consent UX before release. Update the public Privacy Policy when data categories, purposes, legal bases, rights or recipient categories change—not merely because one provider in an already-disclosed category is replaced.
- [ ] Test deletion with the provider and retain evidence.

## Review cadence

Review this register:

- at least every three months while the product is being built;
- before every production release that changes SDKs, hosting, auth, billing, backup, analytics or support;
- after any provider privacy/DPA/subprocessor notice;
- after a security incident or rights-request failure;
- before launching direct web payments or a new jurisdiction.
