"""Read the raised/goal totals from the public Kindful crowdfunding page and
write them to progress.json, which the website reads to draw its progress bar.

Run by .github/workflows/update-progress.yml every hour. Can also be run by hand:
    KINDFUL_URL=https://peerservants.kindful.com/2026-holiday-giving python scripts/update_progress.py
"""
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "progress.json"
URL = os.environ.get("KINDFUL_URL", "").strip()


def amount(html: str, label: str) -> int:
    # Kindful renders each stat as: <h2>$8,974</h2> <p>Raised</p>
    m = re.search(r"<h2>\s*\$([\d,]+(?:\.\d+)?)\s*</h2>\s*<p>\s*" + label + r"\s*</p>", html, re.I)
    if not m:
        raise ValueError(f"Could not find the '{label}' amount on {URL}")
    return round(float(m.group(1).replace(",", "")))


def main() -> int:
    if not URL:
        print("KINDFUL_URL is not set; leaving progress.json unchanged.")
        return 0

    req = urllib.request.Request(URL, headers={"User-Agent": "PEER-Teens-Turkey-Trot-site"})
    with urllib.request.urlopen(req, timeout=30) as r:
        html = r.read().decode("utf-8", "replace")

    raised, goal = amount(html, "Raised"), amount(html, "Goal")

    old = json.loads(OUT.read_text()) if OUT.exists() else {}
    if old.get("raised") == raised and old.get("goal") == goal:
        print(f"No change: ${raised:,} of ${goal:,}")
        return 0

    OUT.write_text(json.dumps({
        "raised": raised,
        "goal": goal,
        "updated": datetime.now(timezone.utc).isoformat(timespec="minutes"),
        "source": URL,
    }, indent=2) + "\n")
    print(f"Updated: ${raised:,} of ${goal:,}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
