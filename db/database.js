// db/database.js
// -----------------------------------------------------------------------------
// Sets up the application's SQLite database (using Node's built-in node:sqlite
// module, so no native build step is required) and exposes a single shared
// connection that the rest of the app can import.
// -----------------------------------------------------------------------------

const path = require("path");

let DatabaseSync;
try {
  // node:sqlite ships built into Node.js (v22.5+), so no native build step
  // or extra dependency is needed.
  ({ DatabaseSync } = require("node:sqlite"));
} catch (err) {
  console.error(
    "\nThis app uses Node's built-in 'node:sqlite' module, which needs Node.js v22.5 or later.\n" +
      "Please upgrade Node (check with `node -v`) and try again.\n"
  );
  process.exit(1);
}

// The .db file lives inside this same folder, next to this script.
const DB_PATH = path.join(__dirname, "students.db");

const db = new DatabaseSync(DB_PATH);

// Create the students table the first time the app runs.
// Every column here maps directly to a field on the Portal Form.
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    image         TEXT,                 -- saved filename of the uploaded photo
    first_name    TEXT NOT NULL,
    middle_name   TEXT,
    last_name     TEXT NOT NULL,
    email         TEXT NOT NULL,
    dob           TEXT NOT NULL,
    gender        TEXT NOT NULL,
    phone         TEXT NOT NULL,
    address       TEXT NOT NULL,
    state         TEXT NOT NULL,
    lga           TEXT NOT NULL,
    next_of_kin   TEXT NOT NULL,
    jamb_score    INTEGER NOT NULL,
    status        TEXT NOT NULL DEFAULT 'undecided',
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

module.exports = db;
