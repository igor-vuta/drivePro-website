# Drive Pro SEO and enquiry measurement — private plan

No measurement system is connected by this document. No tracker, collection, search submission or account action is added. The source snapshot supplies route and link behavior, not traffic, indexing, ranking or delivered-enquiry evidence. Set a **future baseline date** only after the intended release URL is confirmed and the release is observed; record the exact source and measurement status for every figure. `null` means unmeasured, never zero.

## Definitions and sources

| Field | Definition and denominator | Intended evidence source | Current value/status |
| --- | --- | --- | --- |
| Indexed canonical routes | Indexed intended canonical URLs / 15 expected localized routes; record excluded URLs and reason separately. | Search Console and Yandex Webmaster coverage for the verified host. | `null` / access and host unverified. |
| Search queries | Observed query, language, landing URL and date range; group by intent without assuming language from spelling alone. | Search Console/Yandex query reports, once connected. | `null` / unmeasured. |
| Organic impressions | Search result appearances by query, route, country, device and period; show total and reporting filters. | Search Console/Yandex performance reports. | `null` / unmeasured. |
| Organic clicks | Search result clicks with the same filters and period; click-through rate = clicks / impressions only when impressions > 0. | Search Console/Yandex performance reports. | `null` / unmeasured. |
| Phone actions | Observed `tel:` activations, separate from calls answered or enquiries; report count / measured route sessions if that denominator is available. | A future approved privacy-minimal measurement method, if chosen. | `null` / no collection. |
| WhatsApp actions | Observed WhatsApp link or draft opens, separate from messages sent or received; report count / measured route sessions if available. | A future approved privacy-minimal measurement method, if chosen. | `null` / no collection. |
| Confirmed enquiries | Distinct relevant contacts actually received by the business through phone or WhatsApp in the period, deduplicated across channels; never inferred from a click or prepared link. | Owner-maintained minimal aggregate log or approved process. | `null` / no verified record. |
| Qualified enquiries | Confirmed enquiries about a service actually offered in confirmed coverage with enough information for a useful next step; count / confirmed enquiries, with qualification rules documented before use. | Owner review of the minimal aggregate log. | `null` / definition awaits owner confirmation. |

Preparing a link, opening WhatsApp or recording a click does not prove that a message was sent, delivered or received, or that a call connected. Keep the phone and WhatsApp action counts separate. Do not add visitor phone numbers, exact addresses, message contents or other personal details to analytics or ranking records. If aggregate enquiry logging is approved, use anonymous period/channel/intent counts and a documented deduplication method; restrict access and retention before collecting anything.

## Empty baseline record

Fill one row per metric, locale and period; use additional rows for source/filter differences. Preserve `null` until observed. `baseline_date` is the future release-observation date, not this draft date.

| baseline_date | period_start | period_end | metric | locale/code | landing canonical URL | location/country | device | source/account | filter or denominator | value | measurement_status | observed_at | evidence reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `null` | `null` | `null` | `indexed_routes` | `null` | `null` | `null` | `null` | `null` | `expected 15; verified host pending` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `query` | `null` | `null` | `null` | `null` | `null` | `query text pending` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `impressions` | `null` | `null` | `null` | `null` | `null` | `filters pending` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `clicks` | `null` | `null` | `null` | `null` | `null` | `same filters as impressions` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `phone_action` | `null` | `null` | `null` | `null` | `null` | `sessions if available` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `whatsapp_action` | `null` | `null` | `null` | `null` | `null` | `sessions if available` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `confirmed_enquiry` | `null` | `null` | `null` | `null` | `null` | `deduplicated contacts` | `null` | `unmeasured` | `null` | `null` |
| `null` | `null` | `null` | `qualified_enquiry` | `null` | `null` | `null` | `null` | `null` | `confirmed enquiries` | `null` | `unmeasured` | `null` | `null` |

For ranking samples, add a separate row with **query, result type (ordinary organic or map), date and local time, Almaty location or precise sampling point, device, language, search engine, result URL, position and method**. A sampled rank is not a universal position. Use a consistent sample method and report sample count as the denominator; no current ranks are known.

Review approximately **30, 60 and 90 days after the future baseline/release date** using comparable periods, route/locale filters and denominators. Review indexing, query/impression/click trends, action counts and confirmed/qualified enquiries separately. Agree numerical growth targets only after a measured baseline exists. Search Console, Yandex Webmaster and local profile access, verification and any submission are external gates. The exported `/drivePro-website/robots.txt` does not control the host-root robots policy; verify the actual host-root policy separately before interpreting crawl results.
