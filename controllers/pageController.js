// controllers/pageController.js
// -----------------------------------------------------------------------------
// Controllers for the four "page" views of the app. Each function's only job
// is to gather the data a view needs, then render that view.
// -----------------------------------------------------------------------------

const studentModel = require("../models/studentModel");

/** GET / — the public landing page. */
function showLandingPage(req, res) {
  res.render("index", { activeNav: "home" });
}

/** GET /portal-form — the Student Portal Form page. */
function showPortalForm(req, res) {
  res.render("form", { activeNav: "form", errors: [], old: {} });
}

/** GET /students — the Index page listing every student, with optional search/filter. */
function showStudentsIndex(req, res) {
  const filters = {
    name: req.query.name || "",
    status: req.query.status || "",
    gender: req.query.gender || "",
    jambScore: req.query.jambScore || "",
  };

  const students = studentModel.findAllStudents(filters);

  res.render("students", { activeNav: "students", students, filters });
}

/** GET /students/:id — the Details page for one specific student. */
function showStudentDetails(req, res) {
  const student = studentModel.findStudentById(req.params.id);

  if (!student) {
    return res.status(404).render("not-found", { activeNav: "" });
  }

  res.render("details", { activeNav: "students", student });
}

module.exports = {
  showLandingPage,
  showPortalForm,
  showStudentsIndex,
  showStudentDetails,
};
