# Maintaining iPhone buying offers

The private [iTop master sheet](https://docs.google.com/spreadsheets/d/1A9Isn4tKjhxUyJXOK4uaFJakaK4PEpYDCWf7jeu4oi0/edit) is the editing source. The website reads a validated published snapshot in `src/iphone-prices.csv`. Editing the sheet does not immediately change customer prices. Publishing is reviewed; automatic CeX refresh and automatic sheet publishing are future work.

The 10 October 2026 snapshot contains 138 checked exact variants across 33 models, from iPhone 11 onwards plus SE (2nd / 3rd generation) and Air. This includes Pro, Pro Max, mini and Plus models. All 54 identified iPhone models are selectable for enquiries, independently of price coverage. Not every storage, colour, network or grade is priced.

iPhone 18 Pro Max now covers all 48 listed unlocked combinations: 256GB, 512GB, 1TB and 2TB; Black, Silver, Glacier and Burgundy; grades A, B and C. Include out-of-stock listings when checking CeX buying prices: retail availability does not determine whether a cash reference is listed. Each imported variant still needs its own visible cash buying price, product ID and source URL. Locked, faulty, uncertain and expired combinations remain manual enquiries.

## Staff workflow

1. In **iPhone prices**, set Approval to **Draft** before editing.
2. Check the matching CeX listing's **cash buying value**, and enter its exact model, capacity, colour, network, grade, product ID, URL and actual check date. Use the model dropdown and **iPhone models** tab for names and released capacities.
3. Leave Override blank for **CeX cash + £20**, or enter an intentional iTop offer. Use **Paused** to stop offering a variant. Review and mark **Approved** once correct.
4. Confirm Action says **Ready for review**. Draft, paused, incomplete, duplicate, invalid and expired rows cannot produce enabled exports. Formula and table capacity is 500 variants; extend master, table and export together beyond that.
5. Ask the website maintainer to import and publish the checked **Website export** snapshot. Keep the sheet private; no credentials or public sharing are required.

The £20 and seven-day sheet controls describe the agreed website policy. Changing those controls alone does not change website rules. Keep them aligned with `IPHONE_BONUS` and `REFERENCE_MAX_DAYS`; use per-row overrides for individual offers.

## Reusable website connection

Read **Website export!A1:K501** using the connected Google Sheets tool and save its values result as JSON, or download that tab as UTF-8 CSV. Preview with:

```sh
node scripts/import-iphone-sheet.mjs website-export.csv
```

The importer also accepts JSON with `values` or `structuredContent.values`. It validates headers, released model/capacity, source/ID, money, duplicates, dates and enabled price freshness. It lists added, changed and removed IDs without writing. Review the list, then run with `--write` to update the snapshot and sync record.

Run enquiry tests, TypeScript checks, Pages build and Pages tests, then publish. A successful GitHub Pages deployment updates the live website. The current native sheet import preserved all 15 existing records and added 78 checked variants.

Incomplete drafts must be completed or excluded from an import; malformed data stops publication. Complete paused/draft records import as disabled. The website independently checks freshness at quote time.

## Price rules and customer journey

Export columns are `id,model,storage,colour,network,grade,cexCash,checkedAt,sourceUrl,override,enabled`. Money is in pounds, dates are YYYY-MM-DD, grades are A/B/C, and CeX source URLs must match product IDs. Never refresh a date without checking the listing. Overrides also require a current reference; customers see an iTop-set offer rather than a £20 comparison.

References expire after seven days, so review at least weekly. Unknown details, faults, paused variants and missing/stale references lead to a manual quote with an explanation. Storage follows the selected model; changing it clears incompatible selections. Final condition, ownership and account-lock checks happen at inspection. Customers review before choosing to send through WhatsApp. No sale or payment happens online.

Selling through iTop is a separate enquiry with a one-month target. Fees, payout, payment timing and unsold-device handling must be agreed before taking the device. No sale or higher payout is promised.

Sources: each price row links its checked CeX listing. [Apple model identification](https://support.apple.com/en-gb/108044) informs names and capacities. [CeX grading guidance](https://uk.support.webuy.com/support/solutions/articles/80001011621-how-are-your-items-graded-) informs condition labels.

