# First wholesale catalogue import

Source: user-supplied WhatsApp catalogue screenshots in this conversation. Uploaded iTops Wholesale Stock.zip could not be opened because the workspace was disconnected. Screenshots are readable in the conversation; original image bytes have not yet been accessible for product-photo assets.

Imported 205 fully visible listings, grouped into 11 categories (the initial 90 plus 115 additional cases). This is a partial snapshot, not a full stock export. Ignore clipped header/footer listings. Do not interpret 'See all' as containing only the three visible products.

The user explicitly requested category screenshots with photos and prices. Price values are transcribed from the visible current prices, with crossed-out promotional amounts omitted. Prices are stored in integer pence and labelled catalogue price, not used for checkout or calculated totals. VAT treatment and item/pack quantities are not established; final trade prices remain confirmed by staff.

Use consistent human-readable names; retain supplier labels on ambiguous device variants. Do not claim EW97 earbuds are genuine Apple AirPods, generic charging adapters are genuine Samsung products, or 17/18 shared case labels establish verified fit. Product reference fields contain only visible model/code information; import IDs wa-NN-N are internal keys, not invented supplier SKUs.

Product-level warranty text in screenshots has not been imported as a verified policy. No stock counts, units per pack, minimum quantity, connector specification beyond supplier labels or general 'high quality' claims inferred.

Known follow-up:
- Original product photos or accessible full category screenshots for photo matching.
- Additional listings behind See all; more screens may be required for each collection.
- Actual pack sizes, VAT treatment, current price maintenance and availability.
- Confirm model labels, connector variants and any product warranties with iTop.
- Real approved trade accounts remain a separate backend phase.

Quote flow: search/filter → choose up to 12 products → adjust item/pack quantities → existing quote builder → editable message review → visitor chooses whether to send on WhatsApp to +447417465401.

## Additional case screenshots — imported

On 8 October 2026 the owner confirmed the screenshot amounts are iTop selling prices. The VERON HUB LTD label does not change that explicit confirmation. The 115 additional readable listings are now in `src/wholesaleCatalogue.mjs`: 32 thin, 8 colourful, 18 additional blurred, 11 packaged and 46 shiny. Overlapping screenshots and three existing blurred products were excluded; total catalogue entries: 205.

Thin cases are £1.29, colourful £1.79, blurred £1.59, packaged £0.99. Shiny Galaxy listings are £1.19 except A35, A56, S23 Plus and S21 at £0.99; shiny iPhone listings are £0.99. Crossed-out previous amounts are not imported. The clipped 7P/8P row remains excluded.

The accompanying case import manifest retains original supplier labels and owner-confirmed prices. This confirmation resolves buying versus selling price status; VAT, item/pack basis, availability and compatibility still need confirmation with the quote.

Original photo files remain inaccessible while the workspace is disconnected. Two enlarged style photos are visible in the conversation, but no photo asset was imported. The shiny photo shows cards marked For iP 16 while the listing says S24, so treat shared photos as style illustrations rather than verified model-specific images.
