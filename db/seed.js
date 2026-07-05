// db/seed.js
// -----------------------------------------------------------------------------
// Optional helper script: populates the database with a handful of sample
// students so the Index/Details pages have something to show immediately,
// without needing to fill in the Portal Form by hand first.
//
// This is NOT part of the app itself — it's a one-off convenience script.
// Run it with:
//   npm run seed
//
// Re-running it is safe: it clears out any existing rows first, so you won't
// end up with duplicate sample students piling up.
// -----------------------------------------------------------------------------

const db = require("./database");
const studentModel = require("../models/studentModel");

// Each sample re-uses one of the placeholder avatar images already saved in
// public/uploads/ (seed-*.png), the same way a real upload would be saved.
const sampleStudents = [
  {
    image: "seed-john-amadi.png",
    firstName: "John",
    middleName: "",
    lastName: "Amadi",
    email: "john@amadi.com",
    dob: "2001-03-18",
    gender: "male",
    phone: "08012345678",
    address: "2, General Avenue, Yenagoa",
    state: "Bayelsa State",
    lga: "Ekeremor",
    nextOfKin: "Abigael Adebisi",
    jambScore: 280,
  },
  {
    image: "seed-amaka-okeke.png",
    firstName: "Amaka",
    middleName: "Chioma",
    lastName: "Okeke",
    email: "amaka.okeke@example.com",
    dob: "2002-07-09",
    gender: "female",
    phone: "08023456789",
    address: "14, Marina Road, Lagos",
    state: "Lagos State",
    lga: "Ikeja",
    nextOfKin: "Ngozi Okeke",
    jambScore: 312,
  },
  {
    image: "seed-bashir-suleiman.png",
    firstName: "Bashir",
    middleName: "",
    lastName: "Suleiman",
    email: "bashir.suleiman@example.com",
    dob: "2000-11-02",
    gender: "male",
    phone: "08034567890",
    address: "9, Ahmadu Bello Way, Kano",
    state: "Kano State",
    lga: "Kano Municipal",
    nextOfKin: "Fatima Suleiman",
    jambScore: 245,
  },
  {
    image: "seed-chiamaka-uba.png",
    firstName: "Chiamaka",
    middleName: "Grace",
    lastName: "Uba",
    email: "chiamaka.uba@example.com",
    dob: "2003-01-27",
    gender: "female",
    phone: "08045678901",
    address: "21, Independence Layout, Enugu",
    state: "Enugu State",
    lga: "Enugu North",
    nextOfKin: "Emeka Uba",
    jambScore: 298,
  },
];

// A small variety of statuses, just so the Index page demonstrates all three
// status pill colors instead of every row defaulting to "undecided".
const demoStatuses = ["admitted", "undecided", "rejected", "admitted"];

function seed() {
  // Clear any existing rows first, so re-running this script stays idempotent.
  db.exec("DELETE FROM students");

  sampleStudents.forEach((student, index) => {
    const id = studentModel.insertStudent(student);
    studentModel.updateStudentStatus(id, demoStatuses[index] || "undecided");
  });

  console.log(`Seeded ${sampleStudents.length} sample students.`);
}

seed();
