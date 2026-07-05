// routes/api.js
// -----------------------------------------------------------------------------
// Routes that exchange data rather than render a page: the states/LGA
// dataset for the dynamic dropdowns, the form submission itself, and the
// async admission-status update.
// -----------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const upload = require("../middleware/upload");

// Serves data/states-lgas.json for the Portal Form's State/LGA dropdowns.
router.get("/api/states", studentController.getStatesData);

// Handles the Portal Form submission (multipart/form-data, one image field named "image").
router.post("/students", upload.single("image"), studentController.createStudent);

// Asynchronously updates a student's admission status from the Details page.
router.patch("/students/:id/status", studentController.updateStatus);

module.exports = router;
