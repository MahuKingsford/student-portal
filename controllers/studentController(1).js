// controllers/studentController.js
// -----------------------------------------------------------------------------
// Handlers that actually mutate or serve data (as opposed to simply rendering
// a page): saving a new student, returning the states/LGA dataset for the
// async dropdowns, and updating a student's admission status asynchronously.
// -----------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");

const studentModel = require("../models/studentModel");
const validateStudent = require("../utils/validateStudent");

const STATES_FILE = path.join(__dirname, "..", "data", "states-lgas.json");

/**
 * GET /api/states
 * Serves the Nigerian states + local-government dataset as JSON so the
 * client can fetch() it asynchronously and populate the two select boxes
 * on the Portal Form (State of Origin -> Local Government).
 */
function getStatesData(req, res) {
  fs.readFile(STATES_FILE, "utf8", (err, fileContents) => {
    if (err) {
      console.error("Failed to read states-lgas.json:", err);
      return res.status(500).json({ error: "Could not load states data." });
    }
    res.type("application/json").send(fileContents);
  });
}

/**
 * POST /students
 * Handles the Portal Form submission.
 *  - Validates every field is filled in.
 *  - Saves the uploaded image to /public/uploads (handled by multer already).
 *  - Saves everything else to the database.
 *  - Redirects to the Index page on success, or re-renders the form with
 *    an error message (and the image removed) on failure.
 */
function createStudent(req, res) {
  const errors = validateStudent(req.body, req.file);

  if (errors.length > 0) {
    // Clean up an uploaded file if validation failed for some other reason,
    // so we don't leave orphaned images in /public/uploads.
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(400).render("form", {
      activeNav: "form",
      errors,
      old: req.body, // re-fill the text fields so the user doesn't retype everything
    });
  }

  try {
    studentModel.insertStudent({
      image: req.file.filename,
      firstName: req.body.firstName.trim(),
      middleName: (req.body.middleName || "").trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phone.trim(),
      address: req.body.address.trim(),
      state: req.body.state,
      lga: req.body.lga,
      nextOfKin: req.body.nextOfKin.trim(),
      jambScore: Number(req.body.jambScore),
    });

    // Success — move on to the Students Index page.
    res.redirect("/students");
  } catch (err) {
    console.error("Failed to save student:", err);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).render("form", {
      activeNav: "form",
      errors: ["Something went wrong while saving your details. Please try again."],
      old: req.body,
    });
  }
}

/**
 * PATCH /students/:id/status
 * Updates a student's admission status asynchronously (called via fetch()
 * from the Details page, without a full page reload).
 */
function updateStatus(req, res) {
  const { status } = req.body;
  const allowedStatuses = ["admitted", "undecided", "rejected"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value." });
  }

  const updated = studentModel.updateStudentStatus(req.params.id, status);

  if (!updated) {
    return res.status(404).json({ success: false, message: "Student not found." });
  }

  res.json({ success: true, status });
}

module.exports = {
  getStatesData,
  createStudent,
  updateStatus,
};
