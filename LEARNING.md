# iTop redesign — learning guide

This is the separate option-3 portfolio prototype, built with React, TypeScript and Vite. The original hosted iTop website has not been changed.

## Start with these files

- `src/App.tsx`: page sections, reusable product tile, enquiry dialog, and TypeScript types.
- `src/styles.css`: colour tokens, desktop grid, responsive breakpoints, focus and hover states.
- `src/main.jsx`: React entry point and locally served Inter font imports.
- `public/assets/`: actual iTop logo plus generic generated concept-product photographs.
- `design-qa.md`: what was visually compared and tested.

## How the interface works

1. The `products` array holds the category data. `.map()` renders one `ProductTile` per entry, so there is no repeated card markup to maintain.
2. The `Product` and `EnquiryKind` types catch inconsistent data while you code. Try changing a category field and run `npx tsc --noEmit`.
3. `App` owns the open-menu and enquiry state. Clicking a button updates state, and React renders the appropriate dialog.
4. The dialog uses the browser's native `<dialog>` element. It traps focus and supports Escape. Closing restores focus to the original button.
5. The form prepares a draft locally using `FormData`. `encodeURIComponent` makes it safe to include as WhatsApp URL text. The visitor must review it and choose to send; there is no payment or automatic message submission.
6. A saved `draft` keeps the fields when moving back from preview to editing. Nothing is stored permanently.
7. CSS Grid creates the three-column shelf. At smaller widths the layout switches to a single column and the navigation becomes a menu.

## Run it yourself

Requires a supported Node.js release and npm.

```sh
npm install
npm run dev
```

Use the local address printed by Vite. To check and build:

```sh
npx tsc --noEmit
npm run build
npm run test:sites
```

## Small exercises

- Change the cyan colour token and compare the result.
- Add a fourth accessory category by editing only the array.
- Split `ProductTile` and `EnquiryDialog` into separate component files.
- Add a required-field test without sending any WhatsApp message.
- Replace the illustrative product assets with genuine iTop photographs.

## Portfolio case study

Describe the problem (iTop resembled another project), reference and chosen design, component architecture, accessibility choices, responsive behaviour, and testing. Present this as a frontend prototype, not a completed ecommerce platform or booking backend.

Photos are generic AI concept imagery, not documentary shop photos or verified live inventory. Opening hours and service details need business-owner confirmation before public launch. There is no analytics, account system, online payment, persisted booking or live stock feed.
