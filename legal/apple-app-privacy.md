# Apple App Privacy label — Moonveil draft

Review date: **23 July 2026**  
Bundle ID: `com.tealdev.moonveil`  
Status: **Provisional — complete from the final iOS archive and every embedded SDK before submission**

Apple’s App Privacy answers must include data collected by Moonveil and third-party partners. Data processed only on the user’s device and never sent to a server is generally not “collected” for the label.

## Draft label mapping

| Apple category | Data type | Collected? | Linked to user? | Tracking? | Purpose |
|---|---|---|---|---|---|
| Contact Info | Email Address | **Yes, optional** when supplied by Google/Apple or another login method. | **Yes** for account users. | **No** | App Functionality, Account Management, Developer Communications for user-initiated support. |
| Identifiers | User ID | **Yes** | **Yes** | **No** | App Functionality, Account Management, purchase restore, security/fraud prevention. |
| Purchases | Purchase History | **Yes** for purchasers/subscribers. | **Yes** | **No** | App Functionality, Account Management, purchase restore and support. |
| User Content | Other User Content | **Only if optional cloud backup is included in the submitted build.** | **Yes** | **No** | App Functionality — backup, restore and sync. |
| Sensitive Info | Potential spiritual/religious-belief content | **Only if optional backup transmits it.** | **Yes** | **No** | App Functionality; separate opt-in/explicit consent required where applicable. Confirm the correct Apple category from final backup schema. |
| Diagnostics | Crash Data / Other Diagnostic Data | **To verify.** | Usually depends on SDK configuration. | **No** | App Functionality or Analytics only if actually collected. |
| Usage Data | Product Interaction | **Probably No for analytics.** | n/a | **No** | Recheck RevenueCat and Expo SDK behaviour. Purchase lifecycle belongs under Purchases. |
| Other Data | Technical security/request metadata | **To verify against Apple definitions.** | Potentially linked through authenticated requests. | **No** | App Functionality, security and fraud prevention. |

## Expected “Data Not Collected” for local-only features

When they remain exclusively on-device and are not included in optional backup:

- tarot readings and interpretation history;
- journal notes;
- custom spreads;
- name and date of birth used for numerology;
- zodiac/numerology/profile results;
- local preferences and language;
- images selected through the image picker.

If any of these are uploaded, logged or transmitted to a third party in the final build, update the label.

## Expected purpose selections

Use only purposes that actually apply:

- **App Functionality** — sign-in, entitlement validation, purchase restoration, backup/sync.
- **Account Management** — create, manage and delete accounts.
- **Developer Communications** — support and service messages initiated by or necessary for the user.
- **Analytics** — select only if a diagnostics/analytics SDK is deliberately enabled and disclosed.

Do not select Third-Party Advertising, Developer Advertising/Marketing or Product Personalization unless those uses are introduced and legally supported.

## Tracking

Draft answer: **Moonveil does not track users**.

Before selecting “No”, verify that no SDK:

- links Moonveil data with data from other companies for advertising or advertising measurement;
- uses advertising identifiers for cross-app purposes;
- shares data with a data broker;
- performs targeted advertising or cross-site/cross-app profiling.

RevenueCat purchase processing and store entitlement validation are not intended for tracking, but the exact SDK configuration and Apple definitions must be reviewed.

## Third-party partner audit

Audit the final archive and vendor documentation for:

- RevenueCat Purchases SDK;
- Sign in with Apple;
- Google Sign-In SDK, if included on iOS;
- Expo runtime/EAS Updates;
- any crash reporting, support, analytics or attribution SDK;
- networking/CDN libraries with telemetry.

The reviewed mobile `package.json` did not yet contain RevenueCat, Firebase Analytics, Sentry or an advertising SDK. This is not proof of the final native archive contents.

## Account deletion and review readiness

Before submitting a build that supports account creation:

- provide an easy in-app action to initiate permanent account deletion;
- remove the Moonveil account and associated data not legally required to be retained;
- delete the linked RevenueCat customer;
- allow deletion of optional cloud backup;
- explain that App Store subscription cancellation is separate;
- make the Privacy Policy and Terms links visible in the App and on the subscription screen.

## Subscription disclosure checklist

The paywall/purchase screen should clearly show:

- subscription name;
- duration/billing period;
- local price and price per period;
- trial or introductory-offer terms, if any;
- that the subscription auto-renews until cancelled;
- how to restore purchases and manage/cancel the subscription;
- links to Privacy Policy and Terms of Use.

## Final submission procedure

1. Archive the exact production build.
2. Export the list of embedded frameworks/SDKs and privacy manifests.
3. Exercise sign-in, purchase, restore, backup and deletion while observing network traffic.
4. Compare actual collection with this draft.
5. Update the public Privacy Policy first if a new data category/vendor appears.
6. Submit the App Privacy label and archive screenshots with the release version/SHA.

Use Apple’s current App Store Connect and App Review documentation at submission time; requirements can change.
