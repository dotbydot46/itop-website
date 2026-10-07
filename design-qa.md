# iTop option 3 design QA

final result: passed

## Evidence and state

- Source visual truth: `docs/selected-option-3.png` (original 1487 × 1058 pixels).
- Browser implementation: `docs/desktop-final.jpg` (1363 × 936 screenshot, 1348 CSS-pixel content area plus 15px scrollbar, device scale 1).
- Full comparison: `docs/comparison-final.jpg`; earlier comparison: `docs/comparison-first.jpg`.
- Focused typography and hero comparison: `docs/hero-comparison-final.jpg`.
- Responsive evidence: `docs/responsive.jpg`, real browser iframe viewports 390 × 844 and 834 × 844. Their content widths were 375 and 819 after browser scrollbars; scrollWidth matched clientWidth, with no horizontal overflow.
- State: homepage at scrollY 0, navigation closed, no dialog open. Source resized uniformly to 1348 × 959 and top 936 pixels compared to the browser's 1348 × 936 content crop. No warping or comparison against browser chrome.

## Comparison history

1. First comparison: [P2] Hero and accessories had excess vertical spacing. Product shelf began about 30px below the normalized source; repair strip about 50px lower. This reduced above-the-fold repair visibility. Evidence: `comparison-first.jpg`.
2. Fix: header 80→74px; hero top 25→20px and bottom 38→19px; accessories bottom 27→16px, product-copy top 17→15px, availability top 27→20px. Supporting hero text reduced 20→18px to match source optical scale.
3. Revised capture: `desktop-final.jpg`, compared jointly with source in `comparison-final.jpg` and focused hero comparison. Main regions now align closely: left headline, three square-edged product pictures, accessory labels and dark repair strip. No actionable P0/P1/P2 layout mismatch remains.
4. Interaction QA found returning from preview lost form fields. Added in-memory draft retention. Retested: device model and selected battery-replacement issue retained when choosing Edit details.
5. Mobile check: increased icon-only controls to 44px and gave Ask iTop an explicit accessible label. Mobile menu opens and closes, Repairs link reaches the correct section, Start enquiry opens the form.

## Required fidelity surfaces

- Fonts and typography: locally served Inter weights 400–800 closely match the mock's grotesk sans. Headline uses 800, tight spacing and two-line wrapping; headings and product labels are readable and match hierarchy. No clipping or overlapping text in observed desktop, tablet or mobile views. Minor raster-mock vs real-font differences are P3.
- Spacing/layout rhythm: slim header, asymmetrical hero, three-column image shelf, square corners and dark repair band match the selected composition. Tablet adapts band to two columns; mobile intentionally stacks products and sections. No inappropriate generic cards or gradients.
- Colours/tokens: white, charcoal #1b2023 and cyan #00b2ff. Small cyan text darkened to #007eb1 for readability. Focus outlines provided. No unverified full accessibility compliance claim.
- Image quality: all three photographs are standalone generated raster assets matching the reference subjects and art direction. Actual supplied iTop logo retained rather than generated wordmark. Product shapes/angles differ slightly from the mock as expected for regenerated concept photography; crisp, consistent and not presented as documentary shop photos or verified inventory.
- Copy/content: visible reference headline, category names, descriptions, repair-strip steps and CTA labels retained. Added a clear illustrative-stock notice and below-fold trade/contact details. No fabricated rating, price, warranty duration or repair guarantee.
- Icons: Phosphor light-outline search icon matches the mock. Menu, close, location and telephone icons are library components, not hand-drawn assets.

## Primary interaction checks

- Repair quote opens accessible native dialog. Model and repair fields prepare correct draft.
- Draft WhatsApp URL points to +44 7760 616466, encodes line breaks/model/fault, and opens as a user-controlled draft. No external message was sent during testing.
- Edit details retains model and issue. Close returns focus to invoking control.
- Protection image opens accessory enquiry; preview includes Category: Protection and entered details.
- Wholesale button opens trade form; preview includes business and requested products/quantities.
- Mobile menu and section navigation tested in 390px browser frame. Mobile repair form opens.
- Dialog uses native focus trapping, Escape support, labels and required fields. Reduced-motion preference handled.
- Browser console inspected: no app-origin warnings/errors. Browser-extension metadata errors were observed but did not originate from the app.
- `npx tsc --noEmit`, production build and four Sites runtime tests passed.

## Accepted differences / follow-up polish

- P3: genuine supplied logo includes a small Wholesale & Retail line and original navy/cyan colours, unlike the mock's generic black wordmark. Intentional brand preservation.
- P3: generic product photos differ in exact focal angle. Replace with genuine iTop product/shop photographs when supplied.
- Contact hours, service claims and public-launch policy require owner confirmation; Google link previously hit a verification wall, so no current review rating is asserted.
- Not a complete ecommerce or booking backend. No online payment, persisted bookings, analytics, authentication or stock feed.
- Phone/WhatsApp clients were not launched or messages sent. Full screen-reader audit, 200% text enlargement and real-device checks remain outside this prototype check.

## Implementation checklist

- [x] Exact displayed option 3 resolved and inspected.
- [x] Product assets generated, inspected and integrated.
- [x] Primary enquiries functional, no automatic transmission.
- [x] Same-state combined comparison and focused region reviewed.
- [x] P2 spacing issue fixed and recaptured.
- [x] Mobile/tablet layout and core navigation checked.
- [x] Type checking/build/runtime tests passed.
- [x] Existing live iTop site untouched.
