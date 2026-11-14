# PEER Teens USA Turkey Trot 2026 website

The website source is this repository. The live site is:

https://turkeytrot.peerteens.workers.dev/

The repository is connected to the live site, so commits to the deployed branch update the site through its configured deployment.

## Main files

| File | Purpose |
|---|---|
| `index.html` | Website layout, event details, project descriptions, donation links, RoundUp information, and photos |
| `progress.json` | Fundraising totals used by the overall and eight project progress bars |
| `images/peer-teens-usa-logo.jpg` | PEER Teens USA logo |

## Daily fundraising updates

Fundraising totals are updated manually. There is no longer an hourly Kindful updater.

At the end of each day, use the shaded/current totals in the Turkey Trot fundraising Google Sheet and update `progress.json`. Keep the same structure and replace each `null` in a `raised` field with the corresponding dollar amount as a number (without a dollar sign or commas). Set `updated` to the date/time of the update.

The structure in `progress.json` is:

```json
{
  "updated": null,
  "overall": {
    "raised": null,
    "goal": 14694
  },
  "projects": {
    "p1": { "raised": null, "goal": 1914 },
    "p2": { "raised": null, "goal": 2420 },
    "p3": { "raised": null, "goal": 2000 },
    "p4": { "raised": null, "goal": 1960 },
    "p5": { "raised": null, "goal": 900 },
    "p6": { "raised": null, "goal": 2000 },
    "p7": { "raised": null, "goal": 1500 },
    "p8": { "raised": null, "goal": 2000 }
  }
}
```

Replace the `null` values in the `raised` fields with the actual dollar amounts from the team's spreadsheet as numbers (without dollar signs or commas). Set `updated` to the date/time of the update.

Project goals:
- p1 — Project 1 - Philippines/Solarized Clean Water Supply: $1,914
- p2 — Project 2 - Philippines/Project Cacao: $2,420
- p3 — Project 3 - Philippines/FAITH Springs - Community Water Infrastructure: $2,000
- p4 — Project 4 - Sri Lanka/Clean Milk Production: $1,960
- p5 — Project 5 - Sri Lanka/Improve Dairy Cow Nutrition: $900
- p6 — Project 6 - South Sudan/Water for Dignity: $2,000
- p7 — Project 7 - South Sudan/Goat Community Initiative: $1,500
- p8 — Project 8 - Guatemala/Nutritional Supplements Addressing Child Malnutrition: $2,000

The overall goal is $14,694. Until the actual current totals are entered, leave the `raised` fields as `null`; the website will say the daily total has not been posted rather than show a misleading zero.

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
