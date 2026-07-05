// server.js
// -----------------------------------------------------------------------------
// Application entry point. Sets up Express, the EJS view engine, static asset
// serving, body parsing, and mounts the two route files. Run with:
//   node server.js
// -----------------------------------------------------------------------------

const express = require("express");
const path = require("path");

const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- View engine -----------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---- Static assets (CSS, client JS, uploaded photos) ----------------------
app.use(express.static(path.join(__dirname, "public")));

// ---- Body parsing -----------------------------------------------------------
app.use(express.urlencoded({ extended: true })); // for normal form fields
app.use(express.json()); // for the async status-update fetch() call

// ---- Routes -----------------------------------------------------------------
app.use(pageRoutes);
app.use(apiRoutes);

// ---- 404 fallback -----------------------------------------------------------
app.use((req, res) => {
  res.status(404).render("not-found", { activeNav: "" });
});

// ---- Error handler (e.g. multer file-type errors) --------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).render("form", {
    activeNav: "form",
    errors: [err.message || "Something went wrong. Please try again."],
    old: req.body || {},
  });
});

app.listen(PORT, () => {
  console.log(`Student Portal running at http://localhost:${PORT}`);
});
