# Moonveil processor, subprocessor and third-party register

Review date: **23 July 2026**  
Controller: `[[LEGAL_ENTITY_NAME]]`  
Register owner: `[[VENDOR_REGISTER_OWNER]]`

This register distinguishes processors acting on Moonveil’s instructions from independent controllers such as mobile app stores. The final classification depends on the actual service, contract and configuration.

## Current and planned providers

| Provider / contracting entity | Service | Likely role | Data involved | Location / transfer mechanism | Contract and deletion status | Launch action |
|---|---|---|---|---|---|---|
| RevenueCat, Inc. | Subscription and non-consumable purchase status, entitlement synchronisation, webhooks and restore | Processor for Moonveil subscriber data; stores may remain independent controllers | Moonveil/RevenueCat user IDs, product IDs, store, purchase/subscription lifecycle, entitlement and price/currency metadata | United States and provider infrastructure; current DPA provides restricted-transfer safeguards including SCCs where applicable | Accept and archive the current RevenueCat DPA. Configure subscriber deletion through API. Never send profile name, birth date, readings, notes or belief data as attributes/metadata. | Confirm production project, products, offerings, entitlement mappings, DPA acceptance, retention and deletion test. |
| Google LLC / Google Ireland Limited, as applicable | Google Sign-In and Google Play billing | Independent controller for Google account/store services; role may vary for technical authentication interfaces | Google user/provider ID, optional verified email, store account and purchase records | Provider-specific locations and safeguards | Google controls its own account and transaction records. Moonveil deletes its local provider link/account data. | Verify OAuth client IDs, Play product configuration, privacy links, Data safety form and account-deletion URL. |
| Apple Inc. / Apple Distribution International Ltd., as applicable | Sign in with Apple and App Store billing | Independent controller for Apple account/store services; role may vary for authentication interfaces | Apple provider ID, relay/verified email where supplied, store account and purchase records | Provider-specific locations and safeguards | Apple controls its own account and transaction records. Moonveil deletes its local provider link/account data. | Configure Sign in with Apple where required, App Store products, privacy label and in-app account deletion. |
| `[[HOSTING_PROVIDER_AND_ENTITY]]` | VPS/container hosting, Moonveil API, PostgreSQL, operational logs and database backups | Processor | Account identifiers, optional email, auth links, billing metadata, optional backup payload, logs and security metadata | `[[HOSTING_REGION]]`; transfer mechanism `[[HOSTING_TRANSFER_MECHANISM]]` | DPA `[[HOSTING_DPA_STATUS]]`; deletion/backup rotation `[[HOSTING_DELETION_PROCESS]]` | Choose provider/region, execute DPA, document encryption, access control, off-site backups, retention and deletion. |
| Cloudflare, Inc. / applicable Cloudflare entity | R2 object storage and/or CDN/DNS/security | Processor for configured storage/delivery; may process request metadata under its service terms | Public content assets; IP/request metadata; no user backup or profile data should be stored in R2 under current design | Provider network; identify chosen data-localisation and transfer safeguards | DPA `[[CLOUDFLARE_DPA_STATUS]]`; R2 object-deletion process `[[R2_DELETION_PROCESS]]` | Confirm R2 contains only application/content assets, not personal backup payloads. Configure retention and access logs. |
| 650 Industries, Inc. / Expo | EAS Build, EAS Submit and EAS Updates where used | Processor or independent service provider depending feature/configuration | Source/build metadata, project ID, update requests, device/app/version/network metadata according to Expo configuration | Provider-specific infrastructure and safeguards | DPA/terms `[[EXPO_DPA_STATUS]]`; account/project deletion `[[EXPO_DELETION_PROCESS]]` | Audit the final binary and update configuration. Determine whether runtime update/diagnostic data must be declared to Google/Apple. |
| GitHub, Inc. | Source control and GitHub Pages hosting for public legal pages | Processor/service provider for repository; public-site request metadata may be processed under GitHub terms | Source code and legal documents; public-page request metadata. No production user account or backup data | Provider infrastructure and applicable transfer safeguards | Organisation/account controls and repository deletion under GitHub terms | Keep secrets and production user data out of repositories. Publish only completed public legal documents. |
| `[[EMAIL_OR_SUPPORT_PROVIDER_AND_ENTITY]]` | Support, privacy requests and account-deletion requests | Processor for mailbox/ticket service; may be independent controller for its own security/abuse obligations | Sender email, message, attachments, account ID, verification and case history | `[[SUPPORT_REGION_AND_TRANSFER]]` | DPA `[[SUPPORT_DPA_STATUS]]`; ticket/mail retention `[[SUPPORT_DELETION_PROCESS]]` | Select monitored mailboxes, enable MFA, minimise verification data and set retention. |
| `[[DOMAIN_DNS_PROVIDER]]` | Domain registration and DNS, if different from Cloudflare | Usually independent controller for registrant data; processor/service provider for DNS logs depending service | Operator/registrant data and request metadata | `[[DNS_REGION_AND_TRANSFER]]` | `[[DNS_CONTRACT_STATUS]]` | Use privacy-protected registration where lawful; ensure public operator disclosures remain legally sufficient. |
| `[[LEGAL_ACCOUNTING_ADVISERS]]` | Legal, tax, accounting and dispute support | Independent controller or processor depending engagement | Limited account/transaction/support records needed for advice or legal obligation | `[[ADVISER_LOCATION]]` | Engagement terms/confidentiality `[[ADVISER_STATUS]]` | Share only necessary data and record disclosures/retention. |

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
- [ ] Update Privacy Policy, ROPA, Google Data safety, Apple App Privacy and consent UX before release.
- [ ] Test deletion with the provider and retain evidence.

## Review cadence

Review this register:

- at least every three months while the product is being built;
- before every production release that changes SDKs, hosting, auth, billing, backup, analytics or support;
- after any provider privacy/DPA/subprocessor notice;
- after a security incident or rights-request failure;
- before launching direct web payments or a new jurisdiction.
