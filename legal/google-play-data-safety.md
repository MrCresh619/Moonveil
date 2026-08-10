# Google Play Data safety — audited working answers

Review date: **10 August 2026**
Package: `com.tealdev.moonveil`  
Status: **Production blocker — the live form inspected on 7 August 2026 still requires replacement. A corrected draft now records collection, TLS, OAuth account creation, separate data deletion and the final public account/data-deletion URLs. The exact Privacy Policy URL is also saved in Play Console. Detailed data types remain intentionally incomplete until the final Android App Bundle/SDK network audit is complete. Do not submit the draft yet.**

Google Play requires declarations for data collected or shared by the App **and every included SDK**. “Collected” generally includes data transmitted off the device, even when it is not retained permanently. Data that remains exclusively on-device is normally outside the collection declaration.

## Account and deletion questions

| Question | Draft answer | Conditions |
|---|---|---|
| Does the App allow users to create an account? | **Yes.** | Guest mode does not remove the requirement because an account/sign-in flow exists. |
| Can users request account deletion in the App? | **Yes.** | `Account → Delete account` calls the deployed `DELETE /me`; retain an end-to-end test of the external purchase-provider deletion. |
| Is there an external account deletion resource? | **Yes — `https://mrcresh619.github.io/Moonveil/account-deletion.html`.** | Entered in the corrected draft for both account deletion and separate data deletion on 10 August 2026. |
| Is data encrypted in transit? | **Yes.** | The inspected production API and public endpoints use HTTPS/TLS; recheck all destinations in the final AAB. |
| Can users request deletion of collected data? | **Yes.** | Account deletion plus separate optional-backup deletion. Disclose lawful retention. |

## Draft data-type mapping

### Personal info

| Play data type | Collected? | Required/optional | Purpose | Notes |
|---|---|---|---|---|
| Email address | **Yes, optional** | Optional for guest; may be supplied by Google/Apple account. | App functionality, account management, support, fraud/security. | Store only verified provider email claims. Do not use for marketing without a separate lawful basis. |
| User IDs | **Yes** | Required for account/purchases; not required for guest-only local use. | App functionality, account management, purchase restore, fraud/security. | Internal Moonveil ID, provider ID and RevenueCat app user ID. |
| Name | **Yes when included in optional cloud backup.** | Optional and user-initiated. | Cloud backup/restore requested by user. | Local profile data is not transmitted unless the user enables and uploads a backup. |
| Other personal info | **Yes when included in optional cloud backup.** | Optional and user-initiated. | Backup/restore/sync. | Date of birth, spiritual profile or beliefs can be included in the arbitrary JSON backup payload. |

### Financial info

| Play data type | Collected? | Required/optional | Purpose | Notes |
|---|---|---|---|---|
| Purchase history | **Yes for purchasers** | Required to provide/restore paid access. | App functionality, account management, fraud prevention, developer communications/support. | Product ID, store, subscription state, purchase/refund events, timestamps, price/currency metadata. Moonveil does not collect card/bank numbers. |
| Payment information | **No** | n/a | n/a | Card and payment credentials are handled by Google Play/Apple; confirm no external checkout is added. |

### App activity / user content

| Play data type | Collected? | Required/optional | Purpose | Notes |
|---|---|---|---|---|
| Other user-generated content | **Yes when optional cloud backup is used.** | Optional and user-initiated. | Cloud backup/restore/sync. | May include readings, notes, journal entries, custom spreads or profile payload. Each upload has a separate disclosure/consent step. |
| App interactions / other actions | **Probably No for analytics.** | n/a | n/a | Backend purchase/access events are declared as purchase history. Recheck RevenueCat and Expo SDK collection in the final binary. |

### Photos and videos / files

| Play data type | Collected? | Draft answer |
|---|---|---|
| Photos | **No**, unless selected media is uploaded or included in backup. | Expo image picker is present, but selection that stays on-device is not off-device collection. Audit the final feature. |
| Files and docs | **No**, unless exports/uploads are transmitted to Moonveil. | User-created local exports are not collected merely because the App creates them. |

### App info and performance

| Play data type | Collected? | Draft answer |
|---|---|---|
| Crash logs | **No known first-party collection.** | No Firebase/Sentry dependency was found in the reviewed package file. Verify Expo and native release dependencies. |
| Diagnostics | **Potentially Yes.** | Standard backend error/security logs may include technical diagnostics. Determine whether the form’s definition is met and whether Expo/RevenueCat sends diagnostics. |
| Other app performance data | **No known collection.** | Recheck final SDKs. |

### Device or other IDs

| Play data type | Collected? | Draft answer |
|---|---|---|
| Device or other IDs | **Yes for the RevenueCat app-user identifier.** | Used for purchase entitlement and restore, linked to the Moonveil account. Audit RevenueCat 10.4.2, Expo and store SDK network traffic for any additional device-scoped identifiers in the final AAB. |

### Categories expected to be “No” unless the final build changes

- Precise or approximate location.
- Contacts.
- SMS or call logs.
- Health and fitness data.
- Audio files or microphone recordings.
- Calendar.
- Web browsing history.
- Advertising data or cross-app tracking.

## Collection purposes to select where applicable

- **App functionality** — sign-in, paid access, restore, backup/sync.
- **Account management** — account identity, deletion and entitlement state.
- **Fraud prevention, security and compliance** — webhook idempotency, access audit, abuse/security logs.
- **Developer communications** — only for user-initiated support or necessary service messages; not marketing.

Do not select advertising/personalisation/analytics unless those functions and SDKs are actually added.

## Sharing analysis

Potential recipients include Google, Apple, RevenueCat, the production hosting provider, Cloudflare and Expo. Google Play’s form has specific exceptions for transfers to service providers acting only on the developer’s behalf. Do not assume every transfer is automatically “not shared”:

1. review the current Play definition and service-provider exception;
2. confirm a DPA/contract and purpose limitation for each processor;
3. treat Google/Apple store/account processing as their own service/controller activity where applicable;
4. declare any data used by a recipient for its own advertising or unrelated purposes as shared.

Current product intent: **no sale of data, no advertising and no cross-app tracking**.

## Security/deletion statements

Before submitting the corrected form, retain evidence that:

- HTTPS/TLS is enforced for all production traffic;
- credentials and secrets are not logged;
- account deletion works in-app and externally;
- RevenueCat subscriber deletion is retried safely;
- cloud backup can be deleted without Premium;
- backup/log retention matches the public policy;
- no sensitive backup content is placed in RevenueCat attributes or analytics.

## Final submission procedure

1. Build the exact production AAB.
2. Export dependency tree and inspect Play SDK Index warnings.
3. Run the App through sign-in, purchase, restore, backup and deletion while capturing network destinations and payload categories.
4. Compare the observations with this matrix.
5. Reconfirm the merged Privacy Policy and account-deletion URLs already entered in Play Console.
6. Archive screenshots/export of the submitted Data safety form with the release SHA/version.

## Official references

- Google Play User Data policy and Privacy Policy requirements.
- Google Play Data safety form guidance.
- Google Play account deletion requirements.

Use the current Play Console Help versions at submission time; store policies can change.
