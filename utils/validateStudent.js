// utils/validateStudent.js
// -----------------------------------------------------------------------------
// Server-side validation for the Portal Form submission. The form already
// uses the `required` attribute on the client, but real validation must also
// happen on the server in case a request bypasses the browser (or the client
// validation is somehow skipped).
// -----------------------------------------------------------------------------

/**
 * Checks that every required field for a new student was actually sent.
 * @param {Object} body - req.body from the submitted form
 * @param {Object} file - req.file from multer (the uploaded image)
 * @returns {string[]} a list of human-readable error messages (empty = valid)
 */
function validateStudent(body, file) {
  const errors = [];

  const requiredTextFields = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    dob: "Date of birth",
    gender: "Gender",
    phone: "Phone number",
    address: "Address",
    state: "State of origin",
    lga: "Local government",
    nextOfKin: "Next of kin",
    jambScore: "Jamb score",
  };

  for (const [field, label] of Object.entries(requiredTextFields)) {
    if (!body[field] || String(body[field]).trim() === "") {
      errors.push(`${label} is required.`);
    }
  }

  // Basic email shape check.
  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push("Please enter a valid email address.");
  }

  // Jamb score must be a real number.
  if (body.jambScore && Number.isNaN(Number(body.jambScore))) {
    errors.push("Jamb score must be a number.");
  }

  // The photo upload is required, just like every other field.
  if (!file) {
    errors.push("Please upload a photo.");
  }

  return errors;
}

module.exports = validateStudent;
