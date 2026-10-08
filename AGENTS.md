# Prototype Instructions

The user approved keeping the existing AI product imagery for now and likes the current design. Preserve it. Source is stored in `dotbydot46/itop-website`; Sites publication remains a separate operation, not an automatic consequence of a GitHub update. Consult `docs/business-info.md` before adding business claims.

## iTop redesign decisions

The approved `/repairs` extension uses the same header, typography, palette, button styles and enquiry dialog. Keep its six issue choices, conditional warranty/same-day wording and native FAQ disclosure controls. Existing homepage anchors remain for Accessories, Trade and Visit; only Repairs has a dedicated route at present.

The user selected the third displayed concept, Modern Product Counter. Preserve its white/charcoal/cyan palette, oversized left headline, square three-product shelf and dark repair strip. This is a separate portfolio and learning project: do not modify the existing hosted iTop site. Use React/TypeScript and concise learning notes. Product photos are generic AI concept imagery, not verified store stock; do not use MH Connect's photos or fabricate iTop premises, ratings, prices or warranty periods. Genuine iTop photographs should replace concept imagery when supplied.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
