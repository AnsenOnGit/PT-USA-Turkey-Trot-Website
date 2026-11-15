/* Shared fundraising-progress loader for the Turkey Trot website.
   To connect Google Sheets manually:
   1) Publish a totals-only Google Sheets tab as CSV.
   2) Paste that published CSV URL between the quotation marks below.
   Leave it blank to use progress.json instead.
*/
(function () {
  var PROGRESS_CSV_URL = "";

  var DEFAULT_GOALS = {
    overall: 14694,
    p1: 1914,
    p2: 2420,
    p3: 2000,
    p4: 1960,
    p5: 900,
    p6: 2000,
    p7: 1500,
    p8: 2000
  };

  function parseCsvRows(text) {
    var rows = [];
    var row = [];
    var value = "";
    var quoted = false;
    text = String(text || "").replace(/^\uFEFF/, "");

    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);

      if (quoted) {
        if (ch === '"' && text.charAt(i + 1) === '"') {
          value += '"';
          i++;
        } else if (ch === '"') {
          quoted = false;
        } else {
          value += ch;
        }
      } else if (ch === '"' && value.length === 0) {
        quoted = true;
      } else if (ch === ",") {
        row.push(value);
        value = "";
      } else if (ch === "\n" || ch === "\r") {
        row.push(value);
        value = "";
        if (row.some(function (cell) { return String(cell).trim() !== ""; })) rows.push(row);
        row = [];
        if (ch === "\r" && text.charAt(i + 1) === "\n") i++;
      } else {
        value += ch;
      }
    }

    row.push(value);
    if (row.some(function (cell) { return String(cell).trim() !== ""; })) rows.push(row);
    return rows;
  }

  function parseAmount(value, label, allowBlank) {
    var cleaned = String(value == null ? "" : value).trim().replace(/[$,\s]/g, "");
    if (cleaned === "") {
      if (allowBlank) return null;
      throw new Error("Missing " + label + " in the published progress sheet.");
    }
    var number = Number(cleaned);
    if (!isFinite(number) || number < 0) {
      throw new Error("Invalid " + label + " in the published progress sheet.");
    }
    return number;
  }

  function progressFromCsv(csvText) {
    var rows = parseCsvRows(csvText);
    if (rows.length < 2) throw new Error("The published progress CSV is empty.");

    var headers = rows[0].map(function (cell) { return String(cell).trim().toLowerCase(); });
    var keyColumn = headers.indexOf("key");
    var raisedColumn = headers.indexOf("raised");
    var goalColumn = headers.indexOf("goal");
    if (keyColumn < 0 || raisedColumn < 0 || goalColumn < 0) {
      throw new Error("The CSV needs these exact column headers: key, raised, goal.");
    }

    var records = {};
    rows.slice(1).forEach(function (cells) {
      var key = String(cells[keyColumn] || "").trim().toLowerCase();
      if (!key) return;
      records[key] = {
        raised: parseAmount(cells[raisedColumn], key + " raised amount", true),
        goal: parseAmount(cells[goalColumn], key + " goal", true)
      };
    });

    var overall = records.overall;
    if (!overall) throw new Error("The published CSV is missing the overall row.");

    var result = {
      updated: new Date().toISOString(),
      overall: {
        raised: overall.raised,
        goal: overall.goal || DEFAULT_GOALS.overall
      },
      projects: {}
    };

    Object.keys(DEFAULT_GOALS).filter(function (key) { return key !== "overall"; }).forEach(function (key) {
      var item = records[key];
      if (!item) throw new Error("The published CSV is missing the " + key + " row.");
      result.projects[key] = {
        raised: item.raised,
        goal: item.goal || DEFAULT_GOALS[key]
      };
    });

    return result;
  }

  window.loadTurkeyTrotProgress = function () {
    if (PROGRESS_CSV_URL.trim()) {
      return fetch(PROGRESS_CSV_URL, { cache: "no-store" })
        .then(function (response) {
          if (!response.ok) throw new Error("Could not load the published Google Sheets CSV.");
          return response.text();
        })
        .then(progressFromCsv);
    }

    return fetch("progress.json", { cache: "no-store" }).then(function (response) {
      if (!response.ok) throw new Error("Could not load progress.json.");
      return response.json();
    });
  };
})();
