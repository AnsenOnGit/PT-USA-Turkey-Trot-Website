# PEER Teens USA Turkey Trot website

A one-page site for the Turkey Trot. It's free to host on GitHub Pages, and its
progress bar updates itself from the Kindful crowdfunding page every hour.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole website. Sections you'll edit are marked `(edit here)`. |
| `images/peer-teens-usa-logo.jpg` | The logo in the top-left corner. |
| `progress.json` | Raised / goal numbers. Written automatically, so don't edit by hand. |
| `scripts/update_progress.py` | Reads the totals off the Kindful page. |
| `.github/workflows/update-progress.yml` | Runs that script every hour. |
| `registration-form-2026.md` | Questions for the 2026 Google Form. |

## Put it online (one time, about 10 minutes, free)

1. Make a free account at github.com (or use a PEER account so it isn't tied to one person).
2. Click **New repository**, name it (e.g. `PT-USA-Turkey-Trot-Website`), set it to **Public**, and create it.
3. Click **uploading an existing file** and drag in everything inside this folder,
   including the hidden `.github` folder. Click **Commit changes**.
   - If the `.github` folder won't drag in, use **Add file → Create new file**, type
     `.github/workflows/update-progress.yml` as the name, and paste that file's contents.
4. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`, then Save.
   About a minute later the site is live at `https://<account>.github.io/<repository-name>/` (currently https://ansenongit.github.io/PT-USA-Turkey-Trot-Website/).
5. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*, then Save.

## Turn on the automatic progress bar

1. **Settings → Secrets and variables → Actions → Variables tab → New repository variable**
   - Name: `KINDFUL_URL`
   - Value: the 2026 Kindful page, e.g. `https://peerservants.kindful.com/2026-holiday-giving`
2. **Actions tab → Update fundraising progress → Run workflow** to test it right away.
   After that it runs on its own every hour.

Until `KINDFUL_URL` is set, the page shows "Our 2026 goal is coming soon."

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

Open `index.html` on GitHub and click the pencil icon. Look for the comments that say
`(edit here)`, and type over the text the same way you'd edit a document:

- **Event details** (top): the date, time and place, plus the links on the **Donate**
  button (Kindful page) and the **Register** button (Google Form).
  The Kindful and form links also appear in the "Register" and "How to donate" sections,
  so update those too (Ctrl+F for `kindful` and `docs.google.com/forms`).
- **Projects**: replace the "coming soon" line with a list. There's an example in the comment just above it.
- **Sponsors**: same idea, with an example in the comment.
- **Countdown date**: `EVENT_DATE` in the countdown script near the bottom.
- **Add to calendar**: once the start time is set, update the `dates=` part of that link
  (the comment above it shows how).
- **If the web address changes** (e.g. to turkeytrot.peerservants.org), Ctrl+F for
  `ansenongit.github.io` and replace it everywhere. It's used by link previews,
  the calendar link and the Share button.

Click **Commit changes**, and the site updates in about a minute.

### Adding photos

The photos appear in a carousel with a year bar on top. It moves to the next photo every
5 seconds; change `SECONDS_PER_PHOTO` in the carousel script to make that faster or slower.
Photos load straight from the shared Google Photos albums and Drive folder. Nothing is copied.

**Add a photo to an existing year:**

1. Open the album, right-click a photo, and choose **Copy image address**.
2. In `index.html`, find that year's block (e.g. `<div class="year" data-year="2025">`).
3. Copy one of its `<img ...>` lines and paste it below. Replace the address with the one you copied,
   deleting anything after the `=` at the end and putting `=w1200` there instead.

**Add a new year (e.g. 2026 after this year's trot):** copy a whole year block, from
`<div class="year" ...>` to its `</div>`, paste it **above** the 2025 block, change `data-year`
to `2026`, and swap in the new photos. The year bar updates by itself.

Photos stay visible only while their album stays shared by link.
