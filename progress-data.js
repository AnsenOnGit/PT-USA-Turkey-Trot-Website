/* Shared fundraising-progress loader for the Turkey Trot website.
   To connect Google Sheets manually:
   1) Publish a totals-only Google Sheets tab as CSV.
   2) Paste that published CSV URL between the quotation marks below.
   Leave it blank to use progress.json instead.
*/
(function () {
  var PROGRESS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqSnLqYXg1VsARmIiGOmBK7hnTwQFErhNvLkC4miBgNL16BBH-oFE4piVLOz3Cgi431nXe9-ux3yP2/pub?gid=1535210&single=true&output=csv";

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
    var number = Numbe  function makeProgress(raisedByKey, goalsByKey) {
    var result = {
      updated: new Date().toISOString(),
      overall: {
        raised: raisedByKey.overall,
        goal: goalsByKey.overall || DEFAULT_GOALS.overall
      },
      projects: {}
    };

    Object.keys(DEFAULT_GOALS).filter(function (key) { return key !== "overall"; }).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(raisedByKey, key)) {
        throw new Error("The published progress sheet is missing " + key + ".");
      }
      result.projects[key] = {
        raised: raisedByKey[key],
        goal: goalsByKey[key] || DEFAULT_GOALS[key]
      };
    });

    return result;
  }

  function keyFromProjectLabel(label) {
    var value = String(label || "").trim().toLowerCase();
    var project = value.match(/^project\s*(\d+)$/);
    if (project && Number(project[1]) >= 1 && Number(project[1]) <= 8) {
      return "p" + project[1];
    }
    if (/^(all\s+projects?|overall|total)$/.test(value)) return "overall";
    return null;
  }

  function progressFromCsv(csvText) {
    var rows = parseCsvRows(csvText);
    if (rows.length < 2) throw new Error("The published progress CSV is empty.");

    // Format A: key, raised, goal (the recommended totals-only table).
    var headers = rows[0].map(function (cell) { return String(cell).trim().toLowerCase(); });
    var keyColumn = headers.indexOf("key");
    var raisedColumn = headers.indexOf("raised");
    var goalColumn = headers.indexOf("goal");

    if (keyColumn >= 0 && raisedColumn >= 0) {
      var keyedRaised = {};
      var keyedGoals = {};
      rows.slice(1).forEach(function (cells) {
        var key = String(cells[keyColumn] || "").trim().toLowerCase();
        if (!key) return;
        keyedRaised[key] = parseAmount(cells[raisedColumn], key + " raised amount", true);
        keyedGoals[key] = goalColumn >= 0
          ? parseAmount(cells[goalColumn], key + " goal", true)
          : DEFAULT_GOALS[key];
      });
      if (!Object.prototype.hasOwnProperty.call(keyedRaised, "overall")) {
        throw new Error("The published progress CSV is missing the overall row.");
      }
      return makeProgress(keyedRaised, keyedGoals);
    }

    // Format B: the published project-summary layout with one row of amounts
    // and another row labelled Project 1 ... Project 8, All Projects.
    // The label row may appear immediately before or after the amount row.
    var labelRowIndex = -1;
    var labelColumns = {};
    for (var r = 0; r < rows.length; r++) {
      var found = {};
      rows[r].forEach(function (cell, column) {
        var key = keyFromProjectLabel(cell);
        if (key) found[key] = column;
      });
      if (Object.keys(found).length >= 9 &&
          Object.keys(found).indexOf("overall") >= 0) {
        labelRowIndex = r;
        labelColumns = found;
        break;
      }
    }

    if (labelRowIndex >= 0) {
      var candidates = [labelRowIndex - 1, labelRowIndex + 1];
      var bestRow = null;
      var bestNumericCount = -1;

      candidates.forEach(function (candidateIndex) {
        if (candidateIndex < 0 || candidateIndex >= rows.length) return;
        var candidate = rows[candidateIndex];
        var numericCount = 0;
        Object.keys(labelColumns).forEach(function (key) {
          var cell = candidate[labelColumns[key]];
          if (String(cell == null ? "" : cell).trim() === "") return;
          try {
            parseAmount(cell, key + " raised amount", false);
            numericCount++;
          } catch (error) {
            // Ignore rows that are not the amount row.
          }
        });
        if (numericCount > bestNumericCount) {
          bestNumericCount = numericCount;
          bestRow = candidate;
        }
      });

      if (!bestRow || bestNumericCount < 9) {
        throw new Error("Could not find the row of amounts next to the project labels.");
      }

      var raisedByLabel = {};
      var goalsByLabel = {};
      Object.keys(labelColumns).forEach(function (key) {
        raisedByLabel[key] = parseAmount(bestRow[labelColumns[key]], key + " raised amount", true);
        goalsByLabel[key] = DEFAULT_GOALS[key];
      });
      return makeProgress(raisedByLabel, goalsByLabel);
    }

    // Format C: one project per row, with the name in column A and the
    // raised amount in column B (for example, Project 1,$150).
    var verticalRaised = {};
    var verticalGoals = {};
    rows.forEach(function (cells) {
      var key = keyFromProjectLabel(cells[0]);
      if (!key) {
        var rawKey = String(cells[0] || "").trim().toLowerCase();
        if (rawKey === "p1" || rawKey === "p2" || rawKey === "p3" ||
            rawKey === "p4" || rawKey === "p5" || rawKey === "p6" ||
            rawKey === "p7" || rawKey === "p8") key = rawKey;
        if (rawKey === "key") return;
      }
      if (key && cells.length > 1) {
        verticalRaised[key] = parseAmount(cells[1], key + " raised amount", true);
        verticalGoals[key] = DEFAULT_GOALS[key];
      }
    });

    if (Object.prototype.hasOwnProperty.call(verticalRaised, "overall")) {
      return makeProgress(verticalRaised, verticalGoals);
    }

    throw new Error("Unrecognized published progress sheet layout. Expected key/raised columns or Project 1–8 and All Projects labels.");
  }
 + key + " row.");
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
