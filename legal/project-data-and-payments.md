# Moonveil — verified products, payments and data inventory

Review date: **10 August 2026**
App: **Moonveil – Tarot & Numerology**  
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
| Moonveil Premium Monthly | Auto-renewing subscription | Play product `moonveil_premium_monthly`, base plan `monthly`; RevenueCat package `$rc_monthly`, entitlement `premium` | Saves the account owner’s profile, date of birth, personal numerology and name numerology; billed monthly. | Present in the live RevenueCat offering and published paywall; end-to-end store test remains required. |
| Moonveil Premium Annual | Auto-renewing subscription | Play product `moonveil_premium_monthly`, base plan `annual`; RevenueCat package `$rc_annual`, entitlement `premium` | Saves the account owner’s profile, date of birth, personal numerology and name numerology; billed annually. | Present in the live RevenueCat offering and published paywall; end-to-end store test remains required. |
| Moonveil Premium Lifetime | One-time non-consumable | No live package | Future option only, subject to a store product, purchase screen and release review. | Not present in the live RevenueCat offering as of 7 August 2026 and must not be advertised as currently purchasable. |
| Premium deck unlock | One-time non-consumable | Per-deck product ID and `DECK_UNLOCK` target key | Permanent store entitlement to the identified deck without requiring the full subscription. | Backend model supports it. Exact catalog/product IDs are not fixed in the production seed and must be configured per deck. |
| Premium module unlock | Future/WIP only | No active release product | Not part of the current paid offer. | Backend capability does not make this a released or advertised product. |
| Profile access | Entitlement | RevenueCat identifier `profile` | Save local esoteric profile and full numerology. | Included in monthly premium. |
| Custom spreads | WIP entitlement | RevenueCat identifier `custom_spreads` exists for future use | Not part of the current advertised Premium benefit. | Do not advertise until the feature and commercial configuration pass a release review. |
| Optional cloud backup | Operational feature, not a current Premium promise | RevenueCat identifier `backup` exists for future product decisions | User-initiated backup/restore/delete where exposed; not advertised as part of the current Premium benefit. | Backend/mobile capability exists; final end-to-end release evidence remains required. |
| Cross-device Sync | WIP entitlement | RevenueCat identifier `sync` exists for future use | Not part of the current advertised Premium benefit. | User-facing final flow has not passed release verification. |

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
| Account deletion | Production deployment exposes `DELETE /me`, deletes linked application records and requests RevenueCat customer deletion; mobile UI calls this endpoint. End-to-end release evidence remains required. |
| Cloud backup | Production backend provides versioned `GET/PUT/DELETE /me/backup`, arbitrary JSON payload, a 5 MB limit and consent-evidence fields. Payload is not end-to-end encrypted in the App. Scheduled cleanup rotates restricted local database copies; daily restic snapshots are encrypted before upload to a dedicated private off-site R2 bucket and expire after 14 days. |
| Public policy references | PR #2 is merged, the canonical public pages are reachable, and Google Play now references the exact Privacy Policy URL. The submitted Data safety form contains the final account- and separate-data-deletion URL. |
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
- RevenueCat — processor for subscriber, purchase and entitlement data. Subscriber deletion is implemented; DPA acceptance/archival was not verified. The live offering has monthly and annual packages and published paywall `wf3a25160e977b42a9`.
- Contabo — VPS/backend/PostgreSQL/logs in region EU. The production-VPS DPA became active on 10 August 2026. Provider Auto Backup remains disabled. A port plan and default-drop provider firewall are active; local database copies remain restricted and rotated.
- Cloudflare R2 — delivery/storage of application content assets plus a separate private bucket containing restic-encrypted production database disaster-recovery snapshots. The live optional user backup remains in PostgreSQL; R2 receives only the encrypted database-copy repository.
- Expo/650 Industries — EAS build/update infrastructure where enabled; verify runtime data collection and DPA.
- GitHub Pages — public legal-site hosting; no App account data should be sent.

## Known launch blockers

- Confirm that the operator identity, address, tax ID and email published in `privacy.html` exactly match the production store and business records.
- The corrected Google Play Data safety form records collection, TLS, OAuth, separate deletion and final policy/deletion URLs. It was submitted on 11 August 2026 and is pending Google review.
- The Contabo DPA, firewall and encrypted off-site backup are configured. Archive the DPA privately and retain a successful non-destructive restore/integrity test.
- Google OAuth remains in Testing and its Android SHA-1 does not match Play App Signing. The merged public policy URLs are now ready for the remaining OAuth configuration update.
- RevenueCat paywall `wf3a25160e977b42a9` is published and there is no live lifetime package. Run end-to-end billing, restore and deletion tests before rollout.
- Production end-to-end evidence for account/purchase-provider deletion and backup consent/restore/delete is still required.
- Container log rotation, the 12-month support target and database-backup restore behaviour require retained operational evidence.
- Store privacy declarations must be completed from the final release binary, not only source package files.
