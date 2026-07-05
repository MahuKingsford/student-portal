// routes/pages.js
// -----------------------------------------------------------------------------
// Routes for the four pages a person navigates between in the browser.
// -----------------------------------------------------------------------------

const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/", pageController.showLandingPage);
router.get("/portal-form", pageController.showPortalForm);
router.get("/students", pageController.showStudentsIndex);
router.get("/students/:id", pageController.showStudentDetails);

module.exports = router;
