# Managed development

Owner enrollment request: 2026-10-03. Project ID: `drivepro-website`.
Requirements source: [PROJECT.md](../PROJECT.md).
Implementation baseline: the existing `drivePro-website` repository, observed at `71efab2b53b668511179408de1dab977d78771b0` before enrollment. Reinspect current source before integration or release.

DrivePro_2 is a completely different product. No requirements, source, rides, authentication, design, hosting assumptions, progress, release exceptions or approvals transfer between the two. The scheduler and coordinator are the shared resources.

## State and ownership

- Coordinator: `/Users/macbookairm3_16gb/Developer/project-supervisor`.
- Source/integration checkout: `/Users/macbookairm3_16gb/Developer/drivePro-website`, existing `main` branch and `origin` remote.
- Canonical transactional state: the coordinator's `.state/state.sqlite3`.
- This project's records: `.state/projects/drivepro-website/`; derived status/history: `workflow/STATUS.md`, `workflow/state.json` and `workflow/events.jsonl` below that project directory.
- Private worker/evaluator artifacts: `.state/runs/<run-id>/`, linked by this project's canonical task/run IDs.
- Owner authority and source evidence: this project's `policy.json` and `evidence/` directory in supervisor state.

From the coordinator directory, inspect `uv run --no-sync project-supervisor status drivepro-website` and `history drivepro-website`. Markdown is a view of saved evidence, not a replacement for it.

Reuse the existing `local.project-supervisor` LaunchAgent and `drivepro-supervisor-continuation` heartbeat. Do not install, launch or restart another scheduler for this project. Retain the existing limits: at most two active projects and one active task per project, with the shared daily attempt limit. Count any manually coordinated work toward project concurrency as well.

Do not change the enrolled source while a worker/evaluator has snapshotted it. Keep progress updates in supervisor state. Refresh this document only between project runs. Preserve unrelated work and all failed or frozen evidence.

## Requirements

| ID | Scope | Acceptance |
| --- | --- | --- |
| DPW-BASE-001 | Existing-site baseline | Inspect this repository's own code/history, routes, business copy and deployment; distinguish source findings, browser observations and live evidence. |
| DPW-SEO-001 | Trilingual local SEO | Useful RU/KK/EN service content, localized metadata, correct language/canonical/hreflang/sitemap output, researched Almaty intents and measured indexing/search outcomes. |
| DPW-QUOTE-001 | Excavator enquiry | No excavator hire without our operator; individual quote; optional job, volume/dimensions, location/date and access questions; editable translated contact summary. |
| DPW-CONTACT-001 | Honest ongoing contact | Calling and WhatsApp remain accessible; partial details are supported; preparing/opening a message is never reported as sent, received or booked. |
| DPW-MOPED-001 | Moped route | Fresh Stories from the owner's account after verified API feasibility, permanent useful text and tested empty/stale/failure states; no invented stock, price or sale/rental terms. |
| DPW-UI-001 | Identity and usability | Audit this site's current UI; verify mobile/desktop and keyboard journeys, contrast and relevant loading/error states; use the shared existing-site redesign guide. |
| DPW-PLAY-001 | Optional playful interaction | A reviewed lightweight excavator scene/game loaded on demand, with reduced-motion/static fallback and no obstruction of SEO or contact. |
| DPW-CONTENT-001 | Concrete content preparation | Complete RU/KK/EN page/quote drafts and relevant campaign/demo drafts with source-grounded claims; business/language/asset gaps remain explicit. |
| DPW-RELEASE-001 | Controlled checked release | Scoped sole-owner signed commits with bodies and actual commitlint; warning-free applicable checks; batched ordinary pushes, exact-SHA CI and separate deployment evidence. |
| DPW-APPROVAL-001 | Separate approval history | Before external publication/outreach, persist exact content/version/hash, destination, effects/cost, dependencies and decision history under this project only. |

## First bounded tasks

1. `dpw-audit-001-existing-site`: a read-only source audit of the current website. Map requirements to existing source, identify SEO/quote/contact defects and concrete next tasks, and list this repository's own checks and deployment trigger. No source changes or live-success claims.
2. `dpw-dev-content-001-contact-drafts`: after audit acceptance, repair the callback interaction so it prepares a WhatsApp request without claiming successful delivery; preserve the entered phone and a retry path, label the input and localize the helper text in the existing languages. In the same isolated candidate, prepare complete RU/KK/EN equipment/moped page and quote-message drafts plus a source/confirmation ledger. This is a bounded first slice, not completion of the full quote wizard or English website.
3. Coordinator reviews the exact candidate, performs available runtime/browser checks and integrates only when source/evidence match. Address the SEO foundation and required release tooling next. Prepare later task definitions using the accepted audit and `PROJECT.md`; do not infer authority or requirements from another project.

The existing scheduler runs separate worker and evaluator processes. Source audits can become `accepted`; implementation candidates stop at `ready_for_integration`. Independent evaluation does not mean the source was integrated, committed, pushed, deployed or published. The current coordinator still performs integration and release explicitly; a recurring heartbeat does not guarantee complete unattended release/recovery.

## Release policy

The owner's explicit 2026-10-03 request authorizes scoped signed commits, batched ordinary pushes and existing push-triggered deployments. Workers cannot perform these actions. Before the first managed commit, establish real commitlint configuration consistent with this repository's history, require a nonempty body and run its actual CLI.

At enrollment, `package.json` declares `npm run lint` and `npm run build`; CI `.github/workflows/deploy.yml` builds and deploys GitHub Pages on pushes to `main`. Audit dependency installation, noninteractive lint configuration, types, build output and warnings before claiming a release-ready baseline. New meaningful tests should cover introduced behaviour. Add/fix validation tooling where required without suppressing warnings or weakening checks.

The configured static export/base path and the conflicting `drivepro.kz` SEO defaults must be reconciled with the verified production target. Website deployment is covered by the existing workflow authority; social posts, local-listing account changes, outreach, purchases or a new hosting service need separate concrete approval. Do not silently change hosting or borrow the DrivePro_2 deployment.

Canonical release declaration is a follow-up once exact checks, tooling and production target are verified. A local policy draft is not recorded release proof. Keep prepared, source-reviewed, locally tested, integrated, committed, pushed, exact-CI-verified, deployed and externally submitted separate.

## Approval preparation

Save incomplete drafts as prepared work. Request a decision only when exact copy/media and destination are ready and effects, costs and blocked work are identified. Missing business facts or Kazakh review are targeted dependencies, not reasons to halt unrelated development. Content changes invalidate previous approval. Check execution history before any retry to avoid duplicate publication.
