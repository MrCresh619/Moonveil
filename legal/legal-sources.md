# Moonveil legal and store-policy source register

Last checked: **7 August 2026**

Use primary/official sources when reviewing or updating Moonveil legal documents. Store rules and vendor terms change; re-check the current version before every production submission.

## Google Play

- Account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111
- User Data policy and privacy-policy requirements: https://support.google.com/googleplay/android-developer/answer/10144311
- Data safety form guidance: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play Developer Program Policies: https://play.google.com/about/developer-content-policy/

Key implementation point: an app that permits account creation must provide account deletion from inside the app and a public external deletion resource, and must explain any data retained for legitimate reasons.

## Apple

- Offering account deletion in your app: https://developer.apple.com/support/offering-account-deletion-in-your-app/
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- App Privacy details: https://developer.apple.com/app-store/app-privacy-details/
- Auto-renewable subscriptions: https://developer.apple.com/help/app-store-connect/manage-subscriptions/offer-auto-renewable-subscriptions/

Key implementation point: apps supporting account creation must let users initiate deletion in the app; deletion must cover the account and associated data not legally required to be retained. Subscription billing continues through Apple until separately cancelled.

## RevenueCat

- Data Processing Addendum: https://www.revenuecat.com/dpa
- Privacy Policy: https://www.revenuecat.com/privacy
- Terms: https://www.revenuecat.com/terms
- Customer/subscriber deletion API documentation: https://www.revenuecat.com/docs/customers/customer-info#deleting-customers

Key implementation points:

- Moonveil is controller and RevenueCat is expected to act as processor for customer personal data; the applicable DPA must be accepted where required and archived. Acceptance was not verified in the 7 August 2026 audit.
- Restricted transfers may rely on the European Commission’s Standard Contractual Clauses.
- Moonveil remains responsible for lawful notices, instructions, minimisation and rights handling.
- Do not send names, dates of birth, readings, notes, beliefs or other special-category profile data to RevenueCat attributes or billing metadata.

## GDPR and EU privacy

- GDPR consolidated text: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- European Commission — information that must be given to individuals: https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/obligations/what-information-must-be-given-individuals-whose-data-collected_en
- European Commission — handling rights requests: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals/how-should-requests-individuals-exercising-their-data-protection-rights-be-dealt_en
- European Commission — data minimisation: https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/how-much-data-can-be-collected_en
- Polish supervisory authority (UODO): https://uodo.gov.pl/

Key implementation points:

- A privacy notice must identify the controller, purposes, legal bases, recipients, transfers, retention and user rights.
- Rights requests are generally answered without undue delay and within one month.
- Only data necessary for defined purposes should be collected.
- Optional backup containing spiritual-profile or journal content needs an Article 9 assessment and may require explicit consent.

## EU consumer and digital-content rules

- Consumer Rights Directive: https://eur-lex.europa.eu/eli/dir/2011/83/oj
- Digital Content and Digital Services Directive: https://eur-lex.europa.eu/eli/dir/2019/770/oj
- Your Europe — returns and right of withdrawal: https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm
- European Commission consumer rights overview: https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints_en

Key implementation points:

- Consumers generally receive pre-contract information and statutory remedies for non-conforming digital content.
- Immediate supply of directly sold online digital content can remove the 14-day withdrawal right only after the consumer expressly requests performance and acknowledges the consequence.
- Do not use blanket “no refunds” clauses or wording that removes mandatory consumer rights.

## Polish implementation review

Before launch, qualified Polish/EU counsel should confirm the final documents against, at minimum:

- GDPR and the Polish data-protection framework;
- Polish consumer-rights and electronic-services rules;
- digital-content conformity/remedy rules;
- tax/accounting retention and invoicing duties;
- the actual legal form, store merchant setup and countries of distribution.

This register is a research aid, not a substitute for legal advice.
