# Moonveil — verified products, payments and data inventory

Review date: **7 August 2026**
App: **Moonveil – Tarot & Guidance**  
Mobile package: `com.tealdev.moonveil`

This document records the product and technical facts used to draft the public legal pages. It must be updated whenever the released code, SDK set, store products or hosting changes.

## Repositories reviewed

- `MrCresh619/Moonveil` — public legal/static site.
- `MrCresh619/Moonveil_be` — NestJS/PostgreSQL backend, auth, entitlements, RevenueCat webhooks, content and storage.
- `MrCresh619/Moonveil-Tarot-Spiritual-Guide` — Expo/React Native mobile app.
- `MrCresh619/moonveil-web` — Astro/React web project.

## Product model

| Product/access | Type | Technical identifier | Current intended scope | Status |
|---|---|---|---|---|
| Guest / Free | Free | n/a | App without account, basic tarot guide, basic spreads/readings, selected free content and premium previews. | Product decision accepted. |
| Moonveil Premium Monthly | Auto-renewing subscription | `monthly`; RevenueCat entitlement `premium` | Premium access billed monthly. | Implemented in mobile constants; store/RevenueCat configuration and sandbox test remain required. |
| Moonveil Premium Yearly | Auto-renewing subscription | `yearly`; RevenueCat entitlement `premium` | Premium access billed annually. | Implemented in mobile constants; store/RevenueCat configuration and sandbox test remain required. |
| Moonveil Premium Lifetime | One-time non-consumable | `lifetime`; RevenueCat entitlement `premium` | Premium access for the supported lifetime defined in the Terms. | Implemented in mobile constants; store/RevenueCat configuration and sandbox test remain required. |
| Premium deck unlock | One-time non-consumable | Per-deck product ID and `DECK_UNLOCK` target key | Permanent store entitlement to the identified deck without requiring the full subscription. | Backend model supports it. Exact catalog/product IDs are not fixed in the production seed and must be configured per deck. |
| Premium module unlock | One-time non-consumable | Per-module product ID and `MODULE_UNLOCK` target key | Access to the identified module without requiring the full subscription. | Backend model supports it. Exact product catalog is not final. |
| Profile access | Entitlement | RevenueCat identifier `profile` | Save local esoteric profile and full numerology. | Included in monthly premium. |
| Custom spreads | Entitlement | RevenueCat identifier `custom_spreads` | User-defined tarot spreads. | Included in monthly premium; backend also permits targeted entitlement. |
| Backup & Export | Entitlement | RevenueCat identifier `backup` | Optional versioned cloud backup of local user payload. | Backend and mobile upload/restore/delete UI are present. Each upload requires a separate Article 9 confirmation in the mobile UI. The mobile request includes consent fields that the backend DTO does not allow; with the global `forbidNonWhitelisted` validation this currently rejects the upload instead of persisting the backup or consent evidence. This contract gap must be resolved before production. |
| Cross-device Sync | Entitlement | RevenueCat identifier `sync` | Versioned restore/sync between devices. | Included in product model; user-facing final flow not yet verified. |

### Important commercial rules

- Actual price, currency, taxes, billing period, trial and introductory offer must come from the store purchase sheet.
- Store payments are handled by Google Play or Apple. Moonveil must not claim to process card details.
- RevenueCat is the billing/entitlement processor and backend source of purchase state.
- Deleting a Moonveil account does **not** cancel a store subscription.
- “Lifetime” deck/module marketing must be defined as a one-time non-consumable licence for the supported lifetime of the Moonveil product/service, not a promise of perpetual support on every future device.
- Do not launch direct web sales using the mobile terms alone. Direct EEA digital-content sales need separate checkout disclosures, withdrawal-right handling, payment-provider terms and tax/VAT review.

## Implementation status that affects legal statements

| Area | Verified state on 7 August 2026 |
|---|---|
| Backend account model | Internal user ID, optional email, external provider identity, account status, RevenueCat ID and login timestamps exist in Prisma schema. |
| Billing | RevenueCat webhook, entitlement mapping, subscriptions, purchase transactions, billing events and audit history were implemented in merged backend PR #71. |
| Account deletion | Merged backend code exposes `DELETE /me`, deletes linked application records and requests RevenueCat customer deletion; mobile UI calls this endpoint. Deployment and end-to-end evidence remain required. |
| Cloud backup | Backend provides versioned `GET/PUT/DELETE /me/backup`, arbitrary JSON payload and a 5 MB limit. Payload is not end-to-end encrypted. The current mobile `PUT` includes consent fields rejected by the backend validation contract, so a mobile upload cannot currently complete. |
| Public backend privacy page | Backend `/privacy` renders a separate, older embedded policy instead of redirecting to the canonical GitHub Pages document. The mobile Privacy Policy link opens this backend route. |
| Mobile billing SDK | `react-native-purchases` and `react-native-purchases-ui` are present. Purchase, restore, cancellation and expiry must still be tested in the exact store build. |
| Mobile permissions | Expo image picker and localization packages are present. The final permission manifests and actual feature use must be audited. |
| Web payments/auth | The reviewed Astro web `package.json` contains no payment, auth, analytics or advertising SDK. |
| Advertising/analytics | No advertising, Firebase Analytics, Sentry or comparable third-party analytics dependency was found in the reviewed package files. Recheck transitive/native SDKs in the release binary. |

## Data inventory

### Local by default — not available to Moonveil

| Data | Storage/purpose | Deletion |
|---|---|---|
| Tarot readings and interpretations | Local SQLite/user database; reading history and offline use. | In-app deletion, clear App data or uninstall; device backups may persist. |
| Notes and journal entries | Local user data. | Same as above. |
| Custom spreads | Local user data; premium-gated feature. | Same as above. |
| Profile name and date of birth | Local numerology/profile calculations. | Same as above. |
| Numerology, zodiac and assigned-stone results | Calculated locally from profile inputs. | Same as above. |
| Preferences, language and entitlement cache | SQLite/AsyncStorage/local browser storage. | App/browser controls. |
| User-selected images | Image bytes remain local. A custom spread’s local image URI/reference is included in the current database backup payload, but the selected image file is not uploaded. | App/device controls. |

### Transmitted to or stored by Moonveil/backend

| Data | Purpose | Typical recipients | Deletion/retention |
|---|---|---|---|
| Internal account ID | Account, API authentication and access control. | Backend/hosting. | Delete with account, subject to restricted backups. |
| Optional verified email | Account identification, support and recovery where provided by sign-in provider. | Backend, Google/Apple as applicable. | Delete with account unless legally required. |
| Google/Apple provider ID | Link sign-in identity to Moonveil account. | Backend and relevant provider. | Delete with account. |
| RevenueCat app user ID/mapping | Reconcile purchases, restore and entitlement status. | Backend and RevenueCat. | Delete with account and request RevenueCat subscriber deletion. |
| Product/subscription status | Grant or revoke paid features. | Backend, RevenueCat, store. | Delete with account except lawful transaction retention. |
| Billing events and audit history | Idempotency, support, fraud prevention and explaining access state. | Backend/hosting; RevenueCat source. | Delete linked records with account unless lawful retention applies. |
| Store, product ID, timestamps, price/currency metadata | Purchase verification and support/accounting. | Backend, RevenueCat, Google/Apple. | Legal/accounting period where applicable. |
| Optional cloud backup payload | User-requested backup/restore/sync. | Backend/hosting database. | User can delete backup; delete with account; backup rotation delay applies. |
| Support email/message | Resolve support/privacy request. | Mail provider and authorised staff. | Set and disclose a support retention period. |
| IP/request/security logs | Security, rate limiting, troubleshooting and incident response. | Hosting, reverse proxy/CDN. | Set and disclose a short retention period. |

## Sensitive-data warning

The local profile, journal and readings can reveal religious or philosophical beliefs. If the optional cloud backup transmits those contents to Moonveil, the payload may contain GDPR Article 9 special-category data.

Before enabling cloud backup in production:

1. keep the separate, granular opt-in and add a durable backend record of its version, timestamp and scope;
2. require explicit consent for every upload where Article 9 applies;
3. keep backup deletion and consent withdrawal available even after Premium expires;
4. exclude sensitive profile/user content from RevenueCat user attributes and billing metadata;
5. document encryption at rest, access controls, backup rotation and incident handling;
6. perform and record a DPIA screening; complete a DPIA if the risk assessment requires one.

## Service providers / recipients

- Google — Google Sign-In and Google Play billing; may be an independent controller for store/account services.
- Apple — Sign in with Apple and App Store billing; may be an independent controller for store/account services.
- RevenueCat — processor for subscriber, purchase and entitlement data under its DPA.
- Contabo — VPS/backend/PostgreSQL/logs in region EU. Provider Auto Backup is not enabled and no snapshots exist; the 14-day database-backup rotation must be operated and evidenced by Moonveil on the VPS.
- Cloudflare R2 — delivery/storage of application content assets; the current user backup is stored in PostgreSQL, not R2.
- Expo/650 Industries — EAS build/update infrastructure where enabled; verify runtime data collection and DPA.
- GitHub Pages — public legal-site hosting; no App account data should be sent.

## Known launch blockers

- Confirm that the operator identity, address, tax ID and email published in `privacy.html` exactly match the production store and business records.
- Mobile opens the backend `/privacy` page, which currently serves a separate stale policy instead of redirecting to the canonical GitHub Pages document.
- Production deployment and end-to-end evidence for account/RevenueCat deletion are not confirmed.
- Final RevenueCat SDK/offering and mobile product configuration are not verified.
- Cloud-backup confirmation is implemented in the mobile UI, but the backend currently rejects the submitted consent fields as non-whitelisted. Aligning the API contract, persisting durable consent evidence and production end-to-end verification remain required.
- The 14-day database-backup cleanup currently runs only on deployment, container logs rotate by size rather than time, and the 12-month support target is not application-enforced. Scheduled/time-based controls and evidence are required before these targets can be represented as hard limits.
- Store privacy declarations must be completed from the final release binary, not only source package files.
