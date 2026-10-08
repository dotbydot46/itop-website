# iTop — Modern Product Counter

A responsive React/TypeScript website for iTop Wholesale & Retail, Catford. The approved third concept uses white, charcoal and cyan, a product shelf and a repair enquiry strip. This is separate from the older iTop and MH Connect websites.

## Preview

[Sites preview](https://itop-design-three.zaryabrawa.chatgpt.site) — owner-private, not a public customer website yet.

## Local development

Requires a current supported Node.js LTS release and npm.

```sh
npm ci
npm run dev
```

```sh
npx tsc --noEmit
npm run build
npm run test:sites
```

The build creates `dist/client`, `dist/server/index.js` and `dist/.openai/hosting.json`. Build before running the hosting tests.

## Features

- Responsive homepage and mobile navigation.
- Dedicated `/repairs` page with six service enquiry categories, repair steps and expandable FAQs.
- Repair, accessory, wholesale and buy/sell enquiry dialogs.
- Local draft preview and editable details before opening WhatsApp.
- Tap-to-call, email, directions and Google-profile links.
- Native dialog keyboard behaviour and reduced-motion support.
- Locally served fonts and original iTop logo.

There is no checkout, booking confirmation, database, stock feed or message sending from the app. The visitor decides whether to send the prepared WhatsApp message. Never enter passwords or device passcodes.

## Editing and hosting

`src/App.tsx` holds content and interactions; `src/styles.css` holds the design; `public/assets` holds images. Read [LEARNING.md](LEARNING.md) for short explanations and exercises, and [business-info.md](docs/business-info.md) for research and confirmation gaps.

GitHub stores the source and change history. Sites hosts the preview. A GitHub commit does **not** automatically update Sites: publish the verified build separately. Do not change the hosting project identity when updating the existing preview. GitHub Pages publishes the compiled website automatically after pushes to `main` using `.github/workflows/pages.yml`. Its separate `npm run build:pages` command builds for `/itop-website/` and creates a direct Repairs page. Shared links and image paths adapt to each hosting target. The public website is https://dotbydot46.github.io/itop-website/.

## Images and business claims

The product images are AI-generated illustrations, not evidence of iTop stock or premises. The user approved retaining them for now; the page labels them as illustrative. Do not import MH Connect imagery, invented customer reviews, ratings, prices, product specifications or unconfirmed warranty periods.

Contact details were carried over from the old iTop website. Google listing verification was blocked on 8 October 2026. Opening days, current hours and warranty terms still need owner confirmation.

## Next phase

Preserve the approved homepage and Repairs page. Add dedicated Accessories, Wholesale and Buy/Sell pages after agreeing their scope. Confirm business details and policy wording before public launch; then complete remaining accessibility and real-device checks and connect the final domain.
