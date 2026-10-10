# Maintaining iPhone buying offers

The editable spreadsheet source is `src/iphone-prices.csv`. Open it in Excel or another spreadsheet, edit rows and save as UTF-8 CSV with the same column names. Publish the website after editing; changing a downloaded copy alone does not update the live website. There is no customer-accessible admin panel.

The first snapshot contains 15 exact variants across seven iPhone models, read from the displayed CeX product pages on 10 October 2026. These are cash buying values, not voucher or retail values. This is a starter catalogue, not every iPhone, storage, colour or grade. Other variants remain manual enquiries. No photos or product descriptions were copied.

## Columns

| Column | Meaning |
| --- | --- |
| id | CeX product ID matching the source URL |
| model, storage, colour, network, grade | Exact variant; grades A/B/C are condition reference categories |
| cexCash | Verified cash buying price in pounds, without a £ symbol |
| checkedAt | Actual date the reference was checked, YYYY-MM-DD |
| sourceUrl | Matching HTTPS CeX product-detail URL |
| override | Optional iTop offer in pounds; blank uses cexCash + £20 |
| enabled | true offers estimates; false pauses the variant |

Never refresh the check date without checking the source. Use an override to preserve an intentional iTop price when updating a reference; leave it blank to use the £20 rule. An override also needs a current reference check, but the customer sees “price set by iTop”, not a claimed £20 comparison.

References stop producing instant estimates after seven days and fall back to a manual quote. This is an implementation maintenance safeguard, not an offer reservation period. Review the CSV at least weekly, then rebuild and publish. The expiry can be adjusted in `REFERENCE_MAX_DAYS` if the owner approves a different maintenance schedule.

The quote requires exact model/storage/colour/network/grade matching, a fully working condition and no reported faults. Unknown details, faults, disabled variants and stale/future-dated references never borrow another variant's price. Final inspection may change the grade and offer. No online sale/payment, binding quote, automated CeX synchronisation or account administration is implemented.

## Selling through iTop

The separate route is an enquiry to discuss an agreed price and a one-month selling target. It shows no estimated payout. Fees, payment timing and handling an unsold device must be agreed before taking it. The instant buying offer is excluded from this message.

## Checks

Run the enquiry tests, TypeScript check, Pages build and Pages tests before publication. CSV parsing rejects duplicate IDs/variants, invalid source/date/money and malformed rows. Pricing tests cover exact matching, £20 calculation, overrides, expiry, manual fallbacks and route-specific messages.

Sources: each CSV row links its checked CeX listing. Condition reference: https://uk.support.webuy.com/support/solutions/articles/80001011621-how-are-your-items-graded-

