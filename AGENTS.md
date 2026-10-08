# Prototype Instructions

The user prioritises design and functionality before connecting a domain. On 8 October 2026 they supplied the preferred name iTop Phones & Repair Center and hours Monday–Saturday 08:00–21:30, Sunday 10:00–21:30. These supersede the old hours; document them as user-supplied, not independently Google-verified. Dedicated Accessories, Wholesale and Buy/Sell pages and device-specific enquiries are authorised. Preserve the existing visual direction and illustrative photos.

The user approved keeping the existing AI product imagery for now and likes the current design. Preserve it. Source is stored in `dotbydot46/itop-website`; Sites publication remains a separate operation, not an automatic consequence of a GitHub update. Consult `docs/business-info.md` before adding business claims.

## iTop redesign decisions

The service pages `/repairs/`, `/accessories/`, `/wholesale/` and `/buy-sell/` share the header, typography, palette, button styles and enquiry dialog. Keep the six repair issue choices, conditional warranty/same-day wording and native FAQ disclosure controls. Homepage anchors remain usable; navigation links to dedicated service pages and Visit links to the homepage address and hours.

The user selected the third displayed concept, Modern Product Counter. Preserve its white/charcoal/cyan palette, oversized left headline, square three-product shelf and dark repair strip. This is a separate portfolio and learning project: do not modify the existing hosted iTop site. Use React/TypeScript and concise learning notes. Product photos are generic AI concept imagery, not verified store stock; do not use MH Connect's photos or fabricate iTop premises, ratings, prices or warranty periods. Genuine iTop photographs should replace concept imagery when supplied.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

The user authorised bringing useful content and structure from the legacy `dotbydot46/iTop` project into the React website. Preserve the legacy site until the final website is ready; no deletion or redirect is authorised yet. Contact and Warranty/Aftercare pages, contextual repair details, setup enquiries and local-business enquiry content extend the selected design. Do not copy legacy demo prices or fixed warranty periods. Preferred name and user-supplied weekly hours remain authoritative over legacy content.

The user wants a clear customer roadmap and less repetitive information. Homepage uses a five-choice service selector, short product captions and a location summary. Keep full hours/contact information on Contact; general warranty/aftercare FAQs on Support. Preserve the white/charcoal/cyan visual direction, three product images and dark repair band. Service-specific guidance stays on its own page. Use consistent service and enquiry labels; do not add more pages simply to expand content.
