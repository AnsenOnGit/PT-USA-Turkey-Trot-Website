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

## Connect the progress bars to Google Sheets

Both the homepage and Projects page use the shared loader in `progress-data.js`. To connect it to Google Sheets without a Google connector, publish a small totals-only tab as CSV.

### 1. Make a totals-only tab

In the team's fundraising spreadsheet, add a new tab named `Website Totals`. Put these exact headers in row 1:

```csv
key,raised,goal
overall,,14694
p1,,1914
p2,,2420
p3,,2000
p4,,1960
p5,,900
p6,,2000
p7,,1500
p8,,2000
```

Fill the `raised` column with the current aggregate amounts for the overall campaign and each project. You can type the totals or use formulas that reference the shaded total cells in the private tracking tab. Leave a raised cell blank until there is a real posted amount; do not enter zero just to fill it in. Keep the `key` values exactly as shown.

### 2. Publish only that tab as CSV

In Google Sheets, open **File → Share → Publish to web**. Select only the `Website Totals` sheet tab, choose **Comma-separated values (.csv)** as the format, and click **Publish**. Keep **Automatically republish when changes are made** enabled. Copy the published CSV URL.

Do not publish the full donor-tracking tab if it contains names, email addresses, or other private donor information. Publish only the totals-only tab. Google Sheets lets you publish an individual sheet, and its help page warns against publishing sensitive information: https://support.google.com/docs/answer/183965?hl=en

### 3. Add the published URL to the website

In this GitHub repository, open `progress-data.js`, click the pencil (Edit) button, and find:

```js
var PROGRESS_CSV_URL = "";
```

Paste your published CSV URL between the quotation marks, for example:

```js
var PROGRESS_CSV_URL = "PASTE_THE_PUBLISHED_CSV_URL_HERE";
```

Do not change the other code. Click **Commit changes**. Both website pages use this same file, so you only need to add the URL once.

### 4. Check that it works

Open the published CSV URL in a private/incognito browser window. It should show the CSV data with the `key`, `raised`, and `goal` columns and all nine rows. Then open the website and refresh the homepage and Projects page. The overall and project bars should use the sheet totals. When the sheet is edited later, the published tab updates automatically (it can take a few minutes), and a page refresh reloads the latest values.

If the CSV URL is blank, the site continues to use `progress.json` as a fallback. If you want to undo the public feed later, unpublish the tab in Google Sheets and clear the URL in `progress-data.js`.

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
