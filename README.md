# PEER Teens USA Turkey Trot 2026 website

The website source is this repository. The live site is:

https://turkeytrot.peerteens.workers.dev/

The repository is connected to the live site, so commits to the deployed branch update the site through its configured deployment.

## Main files

| File | Purpose |
|---|---|
| `index.html` | Main event page, event information, progress bars, photos, sponsors, and links to the project guide |
| `projects.html` | Dedicated page with all eight project descriptions, fundraising goals, donation instructions, project-specific donate buttons, and RoundUp information |
| `progress.json` | Fundraising totals used by the overall and eight project progress bars |
| `images/peer-teens-usa-logo.jpg` | PEER Teens USA logo |

## Google Sheets progress connection

Both the homepage and Projects page use the shared loader in `progress-data.js`. The published tab URL supplied for the Turkey Trot has been configured there as a CSV feed.

The embed URL ends in `/pubhtml?...&gid=1535210...`. The loader uses the matching CSV endpoint instead:

```text
https://docs.google.com/spreadsheets/d/e/2PACX-1vSqSnLqYXg1VsARmIiGOmBK7hnTwQFErhNvLkC4miBgNL16BBH-oFE4piVLOz3Cgi431nXe9-ux3yP2/pub?gid=1535210&single=true&output=csv
```

The parser accepts the published two-row layout where one row contains the amounts and the adjacent row contains `Project 1` through `Project 8` and `All Projects`. It also accepts a normalized `key,raised,goal` table. Project goals come from the website's configured goals.

### Important privacy note

Publish only a tab containing aggregate project totals. Do not publish the full donor-tracking tab if it contains donor names, email addresses, or other private information. In Google Sheets, use **File → Share → Publish to web**, select only the totals tab, choose **Comma-separated values (.csv)**, and enable automatic republishing. Google explains how to publish a specific sheet and manage publishing here: https://support.google.com/docs/answer/183965?hl=en

### Updating or changing the feed

The CSV URL is already set in `progress-data.js`; you do not need to paste it again. If the published tab or URL changes, edit the `PROGRESS_CSV_URL` value in that file and commit the change. After editing the spreadsheet, allow Google a little time to republish, then refresh the website.

The loader falls back to `progress.json` if the published CSV cannot be loaded or parsed. This keeps the last manually saved totals visible rather than showing an empty progress state.

## Fallback progress.json file

The website uses the published Google Sheets CSV configured in `progress-data.js` when `PROGRESS_CSV_URL` is filled in. If that URL is blank, both pages fall back to `progress.json`.

If you are not using the Google Sheets feed, update the `raised` amounts in `progress.json` manually at the end of each day. Keep each amount as a number without a dollar sign or commas, and set `updated` to the date/time of the update. Leave a `raised` field as `null` until the actual amount is known so the website displays “not posted yet” rather than a misleading zero.

The goals in `progress.json` are:

- Overall: $14,694
- p1 — Philippines/Solarized Clean Water Supply: $1,914
- p2 — Philippines/Project Cacao: $2,420
- p3 — Philippines/FAITH Springs - Community Water Infrastructure: $2,000
- p4 — Sri Lanka/Clean Milk Production: $1,960
- p5 — Sri Lanka/Improve Dairy Cow Nutrition: $900
- p6 — South Sudan/Water for Dignity: $2,000
- p7 — South Sudan/Goat Community Initiative: $1,500
- p8 — Guatemala/Nutritional Supplements Addressing Child Malnutrition: $2,000

## Donations

The Donate buttons lead to the 2026 Bloomerang Turkey Trot donation form. Donors choose a project using the dropdown at the end of the form under:

“Please direct my 2026 Turkey Trot donation to...”

The form supports credit cards, bank accounts, and Google Pay.

## RoundUp

The RoundUp information section links to PEER Servants' RoundUp page. RoundUp rounds eligible Visa or Mastercard purchases up to the next dollar, with the accumulated roundup amount charged monthly. Todd Engelsen confirmed that RoundUp funds support PEER Servants' Food/Water Security partners.

## Event details

- Date: Saturday, November 28, 2026
- Time: 9:00–11:00 AM
- Venue: High Rock Mill Cafe, Arlington, MA

## Photos

The existing carousel contains photos from past Turkey Trots. New 2026 project photos are not included yet; add them after the partner photos are received and approved.

## Editing

Edit `index.html` for website text, layout, and event information. Project cards and fundraising bars are already included. Keep project names consistent with the Bloomerang donation dropdown so donors can match the website descriptions to the options on the form.
