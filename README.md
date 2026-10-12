# PEER Teens USA Turkey Trot website

A one-page site for the Turkey Trot. It's free to host on GitHub Pages, and its
progress bar updates itself from the Kindful crowdfunding page every hour.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole website. **All yearly edits are in the `SITE` block near the bottom.** |
| `progress.json` | Raised / goal numbers. Written automatically, so don't edit by hand. |
| `scripts/update_progress.py` | Reads the totals off the Kindful page. |
| `.github/workflows/update-progress.yml` | Runs that script every hour. |
| `registration-form-2026.md` | Questions for the 2026 Google Form. |

## Put it online (one time, about 10 minutes, free)

1. Make a free account at github.com (or use a PEER account so it isn't tied to one person).
2. Click **New repository**, name it `turkey-trot`, set it to **Public**, and create it.
3. Click **uploading an existing file** and drag in everything inside this folder,
   including the hidden `.github` folder. Click **Commit changes**.
   - If the `.github` folder won't drag in, use **Add file → Create new file**, type
     `.github/workflows/update-progress.yml` as the name, and paste that file's contents.
4. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`, then Save.
   About a minute later the site is live at `https://<account>.github.io/turkey-trot/`.
5. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*, then Save.

## Turn on the automatic progress bar

1. **Settings → Secrets and variables → Actions → Variables tab → New repository variable**
   - Name: `KINDFUL_URL`
   - Value: the 2026 Kindful page, e.g. `https://peerservants.kindful.com/2026-holiday-giving`
2. **Actions tab → Update fundraising progress → Run workflow** to test it right away.
   After that it runs on its own every hour.

Until `KINDFUL_URL` is set, the page shows "Fundraising goal coming soon."

> **Check with David:** in 2025 the Kindful page total combined the Turkey Trot,
> Giving Tuesday, and Christmas Gifting. If the 2026 page is shared the same way, the bar
> shows the combined total (that's also what last year's site showed). For a
> Turkey-Trot-only number, Kindful would need a separate campaign page for the Trot.

> GitHub pauses scheduled jobs in repos with no activity for 60 days. During the campaign
> the bot's own updates keep it active. If it ever pauses, click **Enable workflow** on the Actions tab.

## Use turkeytrot.peerservants.org (optional)

PEER already uses `turkeytrot.peerservants.org` (the Kindful page links to it). To point it here,
David (or whoever manages peerservants.org's DNS) changes that name's **CNAME** record to
`<account>.github.io`. Then in **Settings → Pages → Custom domain**, enter
`turkeytrot.peerservants.org` and tick **Enforce HTTPS**.

## Yearly edits

Open `index.html` on GitHub, click the pencil icon, and scroll to the `SITE` block:

- `date`, `time`, `place`
- `donateUrl` (Kindful page) and `registerUrl` (Google Form)
- `projects`: one line per cause, e.g. `{ name: "Clean Water", place: "Philippines" },`
- `sponsors`: one line per store, e.g. `{ name: "Market Basket", note: "Arlington" },`
- `PHOTOS`: add a year's pictures (see below)

Anything left empty shows as "coming soon" on the page. Click **Commit changes**,
and the site updates in about a minute.

### Adding photos

Photos are loaded straight from the shared Google Photos albums and Drive folder. Nothing
is copied. To add one, open the album, right-click a photo, choose **Copy image address**, and paste it
as a new `PHOTOS` line, deleting anything from `=` onward at the end of the address. Photos stay
visible only while their album stays shared by link.
