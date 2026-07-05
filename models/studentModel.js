// models/studentModel.js
// -----------------------------------------------------------------------------
// All raw database queries for the "students" table live in this file.
// Keeping queries here (instead of inside route handlers) makes it easy to
// find, reuse and debug them independently of the request/response cycle.
// -----------------------------------------------------------------------------

const db = require("../db/database");

/**
 * Insert a brand-new student record.
 * @param {Object} data - validated form fields + saved image filename
 * @returns {number} the new row's id
 */
function insertStudent(data) {
  const stmt = db.prepare(`
    INSERT INTO students
      (image, first_name, middle_name, last_name, email, dob, gender,
       phone, address, state, lga, next_of_kin, jamb_score, status)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'undecided')
  `);

  const result = stmt.run(
    data.image,
    data.firstName,
    data.middleName || null,
    data.lastName,
    data.email,
    data.dob,
    data.gender,
    data.phone,
    data.address,
    data.state,
    data.lga,
    data.nextOfKin,
    data.jambScore
  );

  return result.lastInsertRowid;
}

/**
 * Fetch every student, optionally narrowed down by the Index page's
 * search/filter controls (name, gender, admission status, jamb score).
 */
function findAllStudents(filters = {}) {
  let sql = "SELECT * FROM students WHERE 1 = 1";
  const params = [];

  if (filters.name) {
    sql += " AND (first_name || ' ' || COALESCE(middle_name, '') || ' ' || last_name) LIKE ?";
    params.push(`%${filters.name}%`);
  }
  if (filters.status) {
    sql += " AND status = ?";
    params.push(filters.status);
  }
  if (filters.gender) {
    sql += " AND gender = ?";
    params.push(filters.gender);
  }
  if (filters.jambScore) {
    sql += " AND jamb_score = ?";
    params.push(filters.jambScore);
  }

  sql += " ORDER BY id DESC";

  return db.prepare(sql).all(...params);
}

/** Fetch a single student by their primary key. */
function findStudentById(id) {
  return db.prepare("SELECT * FROM students WHERE id = ?").get(id);
}

/** Update only the admission status of a student (used by the async select on the Details page). */
function updateStudentStatus(id, status) {
  const stmt = db.prepare("UPDATE students SET status = ? WHERE id = ?");
  const result = stmt.run(status, id);
  return result.changes > 0;
}

module.exports = {
  insertStudent,
  findAllStudents,
  findStudentById,
  updateStudentStatus,
};
