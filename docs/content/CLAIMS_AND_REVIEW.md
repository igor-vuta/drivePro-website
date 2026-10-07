# Drive Pro claims and review ledger — private draft

This ledger separates an earlier bounded contact-only draft from the current 15-route source candidate (baseline `bdc95a73429a98fa08fbadd721ca554e29d46104`) and this FAQ addition. It records source support, not field verification, editorial approval, publication, indexing or an external account connection. `PROJECT.md` is the owner-approved working requirement; existing UI copy and photographs are not independent business evidence.

## Earlier contact-edit and draft history

The earlier `docs/content/PAGE_COPY.md` and `QUOTE_MESSAGES.md` were private RU/KK/EN drafts. The bounded contact edit in `components/ContactSection.tsx` and the `contact` keys of `messages/ru.json` and `messages/kz.json` kept the entered callback number available for editing/retry, added an input label and helper text, and removed a premature success state. Its source check showed that opening WhatsApp prepares a draft; it did not test sending or receipt. That historical candidate had only RU/KZ routes and legacy fixed-price claims. Those were facts about that earlier candidate, not statements about the present source.

## Current source and FAQ claim support

The current source declares five routes per locale (`app/[locale]` home, services, pricing, contact and mopeds; `lib/site.ts` locales `ru`, `kz`, `en`), for 15 intended localized routes. `app/sitemap.ts` and `scripts/check-export.mjs` cover the same set. This is source inspection, not proof that the routes are indexed or live. Current `messages/{ru,kz,en}.json` and the quote journey in `app/[locale]/pricing/page.tsx` no longer state fixed excavator prices. Earlier historical references to absent English/dual routes or present fixed prices do not describe this snapshot.

| Current assertion or FAQ answer | Source support | Remaining review |
| --- | --- | --- |
| Drive Pro offers an Almaty equipment/earthworks enquiry route and a separate moped browsing route. | `PROJECT.md` §§Purpose, Priorities, Goal 2; `app/[locale]/services/page.tsx`, `app/[locale]/mopeds/page.tsx`. | Confirm actual service coverage, equipment/job specifics and moped terms. Routes alone do not verify business operation. |
| Excavator work is only with our operator; no hire without our operator. | Explicit hard rule in `PROJECT.md` §Goal 2 Route A; `messages/{ru,kz,en}.json` `services.intro` and `faq_operator_*`. | Fluent Kazakh review of the public wording; verify operational details before expanding the claim. |
| Excavator work needs an individual quote based on the task and site conditions. | `PROJECT.md` §Goal 2 Route A; `services.intro`, `services.access_text`, `faq_price_*` and `quote.intro` in the three message files. | Do not infer tractor/loader terms, fixed rates, machine suitability or outcomes. |
| Unknown volume or dimensions do not block a quote enquiry; a short brief or phone call is available. | `PROJECT.md` §Goal 2 Route A; optional brief fields in `app/[locale]/pricing/page.tsx` and current `messages/{ru,kz,en}.json` `quote` and `faq_unknown_*`; phone link in `app/[locale]/services/page.tsx`. | Runtime/browser verification of the complete and partial journeys is separate. |
| Opening WhatsApp or a draft does not send an enquiry; the customer must press Send there. | `PROJECT.md` §Goal 2; `messages/{ru,kz,en}.json` `quote.whatsapp_help`, `contact.intro` and `faq_whatsapp_*`; services WhatsApp anchor and quote-draft behaviour in source. | No message delivery or receipt is verified. The business number and any environment override need owner confirmation. |
| Moped updates are a browsing/contact route, not a confirmed live Stories feed. | `PROJECT.md` §Goal 2 Route B; `app/[locale]/mopeds/page.tsx` has an Instagram fallback and enquiry actions. | Account access, current API feasibility, media rights, freshness, stock and sale/rental terms are unverified. |

The FAQ is plain visible question/answer text in `app/[locale]/services/page.tsx`; it asserts no rich-results eligibility or ranking result. Its RU/KK/EN drafts have source support above, but fluent Kazakh review and ordinary RU/EN editorial review remain outstanding. The new `docs/seo/INTENT_MAP.md` contains draft query wording with unmeasured demand; `MEASUREMENT_PLAN.md` contains only null baseline records; `FACTS_NEEDED.md` tracks absent evidence. These private files are neither approvals nor external submissions.

## Open evidence before public claims or external work

1. Owner: confirm actual service area, offered tasks, fleet/specifications and availability, tractor/loader operator and pricing terms, spoil removal/loading scope, and moped sale/rental and item details. Legacy equipment or stock imagery is not verification.
2. Owner: confirm active phone/WhatsApp numbers, any production environment override and the real production address. Source hrefs are not call, message or delivery tests.
3. Content owner: supply real job examples, media ownership/usage rights, approved equipment and moped descriptions. No field-verified results or inventory are recorded here.
4. Fluent Kazakh reviewer: review all site copy and this FAQ for natural wording and accurate operator-only meaning. RU and EN need editorial review too. No human language approval is recorded.
5. Integration/release owner: verify static build, browser access and contact actions, production routes, canonical/`hreflang`, host-root robots policy, indexing and any SEO measurements separately. The current source's project-path `robots.txt` cannot set the host-root policy.
6. External account owner: verify Search Console, Yandex/local profile access and any submission; establish Instagram account rights/API feasibility before describing a connected feed. No connection, submission or publication occurred in this candidate.
