# Moonveil record of processing activities (ROPA-lite)

Review date: **7 August 2026**

Controller: **TealDev Mateusz Pilarski**, ul. Orzechowa 37/17, 21-500 Biała Podlaska, Poland, NIP 5651479302

Privacy contact: **tealdevmp@gmail.com**
Owner of this register: **Mateusz Pilarski**

This internal register is a lightweight Article 30 GDPR working document. Confirm with counsel whether a full formal record is required and keep it aligned with production configuration.

## Processing activity 1 — guest/local App use

- **Purpose:** provide offline/free features and local personalisation.
- **Data subjects:** App users.
- **Data:** readings, notes, profile name/date of birth, numerology/zodiac results, custom spreads, preferences and local entitlement cache.
- **Location:** user device only by default.
- **Controller access:** none unless the user deliberately exports, contacts support or enables backup.
- **Legal basis:** performance of the user-requested service; local device processing may remain outside server-side controller access but must still be accurately described.
- **Recipients:** operating system/device backup provider according to user settings.
- **Retention:** until user deletes data, clears App storage or uninstalls; device backup retention is controlled externally.
- **Controls:** SQLite/local storage, operating-system sandbox, no default server upload.

## Processing activity 2 — account and authentication

- **Purpose:** create/manage account, authenticate, restore purchases and support cross-device access.
- **Data subjects:** account users.
- **Data:** internal user ID, external/provider ID, optional verified email, account status, login timestamps, account timestamps.
- **Source:** user and Google/Apple/email provider.
- **Legal basis:** GDPR Article 6(1)(b); Article 6(1)(f) for security/audit where applicable.
- **Recipients/processors:** Contabo, Google, Apple, authorised support/admin staff.
- **International transfers:** document provider-specific adequacy/SCC basis. Contabo hosts the production server in its EU region, but its DPA had not been concluded as of 7 August 2026.
- **Retention:** account lifetime; delete with account except legal/security hold; restricted backup tail up to 14 days.
- **Controls:** provider-token verification, JWT, TLS, rate limiting, role restrictions, secret management and audit logs. Provider firewall assignment and database encryption-at-rest evidence were not verified in the 7 August audit.

## Processing activity 3 — subscriptions, purchases and entitlements

- **Purpose:** process/restore purchases, grant/revoke access, resolve billing problems, prevent fraud and maintain auditability.
- **Data subjects:** purchasers/subscribers and account users restoring purchases.
- **Data:** RevenueCat app user ID and mapping, store, product ID, subscription/entitlement state, expiry/grace dates, purchase/refund/renewal events, price/currency metadata, billing webhook payload, audit history.
- **Source:** RevenueCat, Google Play, App Store and user-initiated restore/sync.
- **Legal basis:** Article 6(1)(b) performance of paid service; Article 6(1)(c) accounting/legal obligations; Article 6(1)(f) security, fraud prevention and legal claims.
- **Recipients/processors:** RevenueCat, Google, Apple, Contabo, authorised staff/advisers.
- **International transfers:** provider DPA/SCCs and safeguards; record exact contracting entities/data locations. RevenueCat DPA acceptance/archival was not verified in the 7 August audit.
- **Retention:** account lifetime for operational entitlement records; accounting/transaction records for legally required period; delete non-required account-linked billing/audit data on account deletion.
- **Controls:** webhook authentication, idempotency, transaction boundaries, access audit, limited admin access and no payment-card storage. RevenueCat HMAC signing was disabled at the audit and requires coordinated backend configuration before activation.

## Processing activity 4 — optional cloud backup/restore/sync

- **Purpose:** user-requested backup, restore and cross-device sync.
- **Data subjects:** premium/account users who opt in.
- **Data:** arbitrary user-selected JSON backup payload, schema version, revision and timestamp; payload may contain readings, notes, profile name/date of birth and spiritual content.
- **Source:** user device.
- **Legal basis:** Article 6(1)(b) for requested backup service; explicit consent under Article 9(2)(a) where the payload reveals religious/philosophical beliefs or other special-category data.
- **Recipients/processors:** Contabo; authorised personnel only when necessary for support/security.
- **International transfers:** production VPS/database are configured in Contabo region EU; provider contractual safeguards apply to any ancillary processing outside the EEA.
- **Retention:** until user deletes backup/account; Moonveil-managed cleanup runs on a schedule and rotates restricted database backups by age (14 days by default) and count (maximum 20 files). Contabo Auto Backup and provider snapshots were not enabled as of 7 August 2026.
- **Controls:** disabled by default, separate opt-in, explicit-consent record where needed, 5 MB limit, TLS, no payload logging, revision conflict protection and deletion without active Premium are implemented. Encryption-at-rest and least-privilege network evidence remain unverified. Current disaster-recovery copies are on the same VPS and are not an off-site backup.
- **DPIA:** screening required before production backup launch; owner Mateusz Pilarski; record the signed decision and date in the release evidence.

## Processing activity 5 — support and privacy requests

- **Purpose:** answer support, complaints, rights requests and deletion requests.
- **Data subjects:** users/requesters.
- **Data:** name/email where provided, request content, account ID, verification information, attachments, correspondence and resolution record.
- **Source:** requester.
- **Legal basis:** Articles 6(1)(b), 6(1)(c) or 6(1)(f), depending on request.
- **Recipients/processors:** Google (Gmail), authorised staff, legal advisers where necessary.
- **International transfers:** Google data-processing/transfer terms and applicable SCCs.
- **Retention:** 12 months after closure, longer only for legal claim/obligation.
- **Controls:** request ticket/log, identity verification proportional to risk, restricted mailbox, MFA, rights-request deadline tracking.

## Processing activity 6 — technical security, logs and incident response

- **Purpose:** service security, rate limiting, troubleshooting, uptime, abuse/fraud prevention and incident investigation.
- **Data subjects:** users, attackers and visitors to public endpoints.
- **Data:** IP address, timestamp, request path/status, user/account ID where authenticated, app/version/user-agent, security events and error/diagnostic metadata.
- **Source:** App/browser/backend/reverse proxy/CDN.
- **Legal basis:** Article 6(1)(f) legitimate interests; Article 6(1)(c) where security obligations apply.
- **Recipients/processors:** Contabo, Cloudflare where used, authorised technical staff.
- **Retention:** 30 days; longer only for documented incident/legal hold.
- **Controls:** minimisation, redaction, no auth tokens or backup payloads, access restrictions, log rotation, monitoring and incident procedure.
- **LIA:** legitimate-interest assessment must be signed and retained with production release evidence.

## Processing activity 7 — public content and legal website

- **Purpose:** deliver public Moonveil content/assets and legal notices.
- **Data subjects:** site/App visitors.
- **Data:** standard request metadata/IP in hosting/CDN logs; no intentional marketing cookies in current design.
- **Legal basis:** Article 6(1)(f) for secure delivery and Article 6(1)(b) where content is requested as part of service.
- **Recipients/processors:** GitHub Pages and Cloudflare R2/CDN.
- **Retention:** Moonveil-controlled request/security logs: 30 days; provider-managed security logs follow the provider contract and configuration.
- **Controls:** HTTPS, no third-party trackers, content security headers where supported, public non-editable legal pages.

## Data subject rights workflow

- Intake channel: **tealdevmp@gmail.com** and in-App account/deletion controls.
- Identity verification standard: use the authenticated account where available; otherwise request only the minimum information needed to match the account and prevent disclosure or deletion for another person.
- Response owner: **Mateusz Pilarski**.
- Normal deadline: without undue delay and generally within one month.
- Request log location: restricted controller register, retained for 12 months after closure unless a legal hold applies.
- Export format: structured JSON for App data; correspondence in a commonly readable electronic format where applicable.
- Processor escalation contacts: see `subprocessors.md`.

## Breach/incident workflow

- Incident owner: **Mateusz Pilarski**.
- Processor notification mailbox: **tealdevmp@gmail.com**.
- Supervisory authority assessment: document whether notification is required within 72 hours of awareness.
- Data-subject notification: assess high risk and document decision.
- Evidence/log hold: isolate only relevant evidence, restrict access, document the reason and delete it when the incident/legal need ends.
- Post-incident review and corrective actions: record timeline, scope, decisions, notifications, root cause, owner and due date for each corrective action.

## Review triggers

Update this record before:

- adding analytics, ads, attribution, crash reporting or support SDKs;
- changing sign-in providers;
- enabling cloud backup/sync or changing its schema;
- adding direct web payments;
- changing hosting, CDN, database, email or backup provider;
- changing retention periods;
- introducing AI processing or external interpretation services;
- changing the minimum age or targeting children;
- launching in a new jurisdiction with additional requirements.
