# Moonveil launch legal and privacy checklist

Review date: **7 August 2026**
Status: **Audited working checklist — blocking items remain**

This is an implementation checklist, not a legal opinion. Obtain a final review from a lawyer familiar with Polish/EU consumer, privacy and digital-services law before production monetisation.

## P0 — block production launch

### Operator and public documents

- [x] Replace every placeholder field in the public HTML pages.
- [ ] Confirm the exact legal entity operating Moonveil.
- [ ] Publish the legal business address and tax/registration identifier required for the service and store account.
- [ ] Create monitored `support` and `privacy` email addresses.
- [x] Set the effective date and version for each public document.
- [ ] Publish the pages on a stable HTTPS URL with no login, geoblocking or editable-document UI.
- [ ] Link Privacy Policy, Terms and Account Deletion from the App settings/paywall/account screens.
- [ ] Put the canonical privacy URL in Google Play Console and App Store Connect.
- [x] Remove the old claim that “no data leaves the device”; it is incompatible with accounts, purchase processing and backup.

### Account deletion

- [x] Merge backend account deletion equivalent to backend PR #75.
- [x] Deploy the account-deletion endpoint and external purchase-provider deletion request.
- [ ] Test account deletion end-to-end, including external customer deletion and failure behaviour, and retain evidence.
- [ ] Confirm deletion removes account identities, optional backup, Moonveil billing metadata, audit history and the RevenueCat subscriber.
- [ ] Add an easy-to-find in-app path: `Settings/Account → Delete account`.
- [ ] Add a separate delete-backup action that remains available after Premium expires.
- [ ] Keep the external deletion URL functional for users who uninstalled or cannot sign in.
- [ ] Verify identity without collecting excessive data.
- [ ] Clearly state that account deletion does not cancel Google Play/App Store subscriptions.
- [ ] Test deletion for Google, Apple, email and anonymous-upgraded accounts.
- [ ] Test retries and partial failures when RevenueCat is unavailable.
- [ ] Define how deletion is propagated to disaster-recovery backups.

### Billing and product configuration

- [x] Add RevenueCat Purchases and Purchases UI SDK 10.4.2 to the mobile branch.
- [x] Configure the live RevenueCat offering with monthly and annual Play packages.
- [ ] Configure and verify the equivalent App Store products before iOS launch.
- [ ] Do not expose or advertise a lifetime package unless a live store product and reviewed purchase screen are added.
- [ ] Create the equivalent App Store subscription product and subscription group before iOS launch.
- [x] Configure the RevenueCat entitlement `premium` and live monthly/annual offering mappings.
- [ ] Publish and test the intended paywall/purchase screen; no RevenueCat paywall was published at audit time.
- [ ] Verify identifiers for `profile`, `custom_spreads`, `backup` and `sync` or simplify to one canonical premium entitlement.
- [ ] Define every one-time deck/module product ID and target key before sale.
- [ ] Ensure a one-time deck purchase does not accidentally require an active subscription.
- [ ] Verify purchase, renewal, cancellation, grace period, expiry, refund/revocation, restore, reinstall and account-switch flows.
- [ ] Test duplicate/alias RevenueCat app-user IDs and guest-to-account migration.
- [ ] Display product name, period, local price, currency, trial conditions and auto-renewal before purchase.
- [ ] Provide visible `Restore purchases` and `Manage subscription` actions.
- [ ] Do not market “lifetime” without the definition used in the Terms.
- [ ] Ensure paid access is not removed because the user merely goes offline; define and test cache expiry/revalidation.

### Optional cloud backup and sensitive content

- [ ] Treat backup as optional and disabled by default.
- [ ] Show a clear pre-upload summary of categories that will leave the device.
- [x] Add a separate affirmative opt-in; no pre-ticked checkbox or bundled consent.
- [x] Where backup may include spiritual/journal content revealing beliefs, collect explicit consent suitable for GDPR Article 9.
- [x] Align the deployed backup API and persist consent version, timestamp and scope without putting sensitive content in the consent record.
- [ ] Allow withdrawal and backup deletion as easily as enabling backup.
- [ ] Confirm backup deletion works without Premium.
- [ ] Do not put profile name, birth date, readings, notes or beliefs into RevenueCat attributes, logs or analytics.
- [ ] Decide whether the backup payload should be client-side/end-to-end encrypted. If not, disclose that clearly and harden server-side encryption/access.
- [ ] Complete a documented DPIA screening; perform a DPIA if high-risk processing criteria are met.
- [ ] Test the 5 MB limit, payload validation, malicious JSON, concurrency conflicts and data export/restore.

## GDPR / privacy governance

- [ ] Complete the `record-of-processing.md` with real values and owner names.
- [ ] Identify the controller and all processors/sub-processors.
- [ ] **Blocker:** execute and archive the Contabo DPA; the panel showed no concluded DPA on 7 August 2026.
- [ ] Verify and archive the applicable RevenueCat and support/email-provider data-processing terms.
- [ ] Review Cloudflare and Expo contractual/data-processing terms for the exact services used.
- [ ] Confirm data locations and international-transfer safeguards (adequacy/SCCs as applicable).
- [x] Set concrete retention periods for security logs, support tickets and operational backups.
- [ ] Configure production retention so it matches the public policy.
- [ ] Establish an electronic workflow for access, correction, deletion, restriction, portability and objection requests.
- [ ] Respond to rights requests without undue delay and generally within one month.
- [ ] Prepare identity-verification rules and a request log.
- [ ] Prepare a personal-data breach response process, processor notification contacts and a 72-hour supervisory-authority assessment workflow.
- [ ] Limit employee/admin access by role; log privileged access.
- [ ] Document lawful-basis and legitimate-interest assessments for security/fraud logging.
- [ ] Keep account email optional unless truly required.
- [ ] Do not reuse account/billing data for marketing without a separate lawful basis and notice.

## Security and production operations

- [x] Use HTTPS/TLS for the inspected production API, content and legal-page endpoints.
- [x] Enforce minimum TLS 1.2 on the Cloudflare content custom domain (raised from 1.0 on 7 August 2026).
- [ ] Establish an approved Contabo access/port plan before assigning a provider firewall; no firewall was assigned at audit time.
- [ ] Use strong JWT/admin/webhook secrets and rotate them after exposure.
- [ ] Restrict admin endpoints through VPN, Cloudflare Access or IP allowlist.
- [ ] Run the backend as non-root with resource limits and a read-only filesystem where practical.
- [ ] Encrypt storage and backups at the infrastructure level.
- [ ] Replicate PostgreSQL backups off the VPS and test restoration.
- [ ] Ensure backup files have strict access permissions and retention rotation.
- [ ] Do not write full auth tokens, backup payloads, names, birth dates or journal content to logs.
- [ ] Redact RevenueCat webhook payload fields not needed for troubleshooting.
- [ ] Configure a short log retention and incident hold procedure.
- [ ] Review the final mobile permission manifest, including image/photo/camera permissions.
- [ ] Produce a software/SDK inventory from the final Android App Bundle and iOS archive.
- [ ] Maintain dependency and vulnerability scanning.

## Google Play Console

- [ ] Provide a public Privacy Policy URL that names Moonveil and the legal operator.
- [ ] Provide the external account-deletion URL.
- [ ] Complete all account-deletion questions.
- [ ] **Blocker:** replace the live Data safety form, which incorrectly declares no collection/sharing and no encryption in transit. A corrected draft now records collection, TLS, OAuth and separate data deletion; complete data types and URLs after the merge/final-binary audit, then submit.
- [ ] Reconcile the Data safety form with `legal/google-play-data-safety.md`.
- [ ] Declare collection of account user IDs, optional email and purchase history where applicable.
- [ ] Declare optional cloud-backup user content only if the feature is in the submitted build.
- [ ] Verify whether RevenueCat/Expo/store SDKs require Device or other IDs, diagnostics or app-activity declarations.
- [ ] Confirm data is encrypted in transit.
- [ ] Confirm deletion is available in-app and externally.
- [x] Configure the inspected Play subscription product with monthly and annual base plans and RevenueCat packages.
- [ ] Add clear subscription/paywall copy and screenshots for review.
- [ ] Test through closed testing with licensed testers and real Play Billing test products.
- [ ] Ensure the developer profile’s public legal identity/contact is correct.

## Apple App Store / App Store Connect

- [ ] Provide the Privacy Policy URL and support URL.
- [ ] Complete App Privacy labels using the final archive and every SDK.
- [ ] Reconcile the label with `legal/apple-app-privacy.md`.
- [ ] Implement in-app account deletion before submitting a build that supports account creation.
- [ ] Configure Sign in with Apple if another third-party login is offered and Apple’s rules require it.
- [ ] Create the subscription group and auto-renewing product.
- [ ] Display subscription title, duration, price, renewal and links to Privacy Policy/Terms on the purchase screen.
- [ ] Add restore-purchases and manage-subscription flows.
- [ ] Verify one-time non-consumable deck/module products restore correctly.
- [ ] Confirm export-compliance/encryption declarations.

## Consumer-law and commercial terms

- [ ] Ensure the paywall accurately describes what Free, Premium and each one-time product unlocks.
- [ ] Do not advertise features that are only planned.
- [ ] Display the final total store price and billing frequency before purchase.
- [ ] Ensure trials state eligibility, duration, post-trial price and auto-renewal.
- [ ] Do not make cancellation harder than purchase.
- [ ] Provide a durable purchase confirmation through the store and maintain support records.
- [ ] Preserve statutory remedies for defective/non-conforming digital content.
- [ ] Do not use blanket “no refunds” wording.
- [ ] If direct web sales are added, implement EU pre-contract information, payment-obligation button text, withdrawal-right consent/acknowledgement, VAT/OSS review, invoice/receipt rules and a compliant payment processor.
- [ ] Review “lifetime access” wording with counsel and product support policy.
- [ ] Establish complaint handling and response time.

## Children and age design

- [ ] Decide and consistently apply the minimum age (draft documents use 16).
- [ ] Align Play/App Store age rating, onboarding and marketing.
- [ ] Do not knowingly create accounts for children without a valid legal basis/parental authorisation.
- [ ] Avoid child-directed advertising or profiling.

## Web and cookies

- [ ] Verify the deployed legal site sets no unintended cookies or trackers.
- [ ] Verify the Astro production build for analytics, fonts, embeds, CDNs and third-party requests.
- [ ] Before adding analytics/marketing tools, implement a compliant consent manager for EEA/UK users.
- [ ] List every actual cookie/storage key and lifetime in `cookies.html`.
- [ ] Keep refusal as easy as acceptance and do not load non-essential tools before consent.
- [ ] If web authentication is added, document strictly necessary session/security cookies.

## Release evidence to archive

- [ ] Final legal-page screenshots and URLs after PR #2 is merged; then update Play/OAuth references.
- [ ] Version/hash of Terms and Privacy accepted by each account where acceptance is required.
- [ ] Google Data safety submission export/screenshots.
- [ ] Apple App Privacy submission screenshots.
- [ ] RevenueCat product/entitlement/offering screenshots.
- [ ] Play/App Store product configuration screenshots.
- [ ] Deletion and restore test evidence.
- [ ] DPIA screening and legitimate-interest assessments.
- [ ] Processor DPAs and current subprocessor lists.
- [ ] Production retention configuration and backup restore test.
- [ ] Lawyer review notes and approved final version.
