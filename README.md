# Student Portal

A web application where students can fill in their personal and academic details to register for an online course platform. Once a student submits the form, their information is saved to a database and they can be viewed, managed, and given an admission status by whoever is running the portal.

The app was built with Node.js and Express on the backend, EJS for the HTML pages, and plain HTML/CSS/JavaScript on the frontend — no heavy frameworks. Student photos are saved directly to a folder on the server, and everything else goes into a SQLite database.

---

## What it does

**Landing Page**
The first thing a visitor sees. It has a short description of what the portal is about and a "Get Started" button that takes you straight to the registration form.

**Registration Form**
This is where students fill in their details — name, email, date of birth, gender, phone number, home address, state of origin, local government, next of kin, and their JAMB score. They also upload a photo here. The state and local government dropdowns load their options automatically from a dataset in the background (no page reload needed). Everything is checked before it gets saved, and if something's missing the form stays open with a message explaining what went wrong.

**Students Index**
Once a student submits the form, they land here. It's a table listing every registered student with their name, gender, JAMB score, and admission status. You can search by name or filter by status, gender, or score. Each row has a view button that takes you to that student's full profile.

**Student Details**
The full profile of one student: photo, all personal info, state and LGA, next of kin, JAMB score, and their current admission status. There's a small dropdown here too — you can change the admission status (Admitted, Undecided, Rejected) and it updates on the spot without refreshing the page.

---

## Getting it running

You'll need **Node.js v22.5 or later** installed. Check what you have with `node -v`. If you don't have it yet or need to update, grab it from [nodejs.org](https://nodejs.org/en/download).

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

The database file and uploads folder are created automatically the first time the app starts, so there's nothing else to set up.

> **Windows note:** if your terminal can't find `npm` or `node`, try calling them by their full path instead:
> ```
> & "C:\Program Files\nodejs\npm.cmd" install
> & "C:\Program Files\nodejs\node.exe" server.js
> ```

---

## Loading sample data

The app starts with an empty database, which makes sense for real use — students register themselves. But if you want to see what the index and details pages look like with actual data in them, run:

```bash
npm run seed
```

This adds four sample students with different admission statuses so you can click around straight away. The placeholder photos for them are already in the `public/uploads/` folder. You can run it more than once without any issues — it clears the sample rows before adding fresh ones each time.

---

## Project structure

```
student-portal/
│
├── server.js                   # starts the app, wires everything together
│
├── routes/
│   ├── pages.js                # the four page routes (landing, form, index, details)
│   └── api.js                  # form submission, states data, status updates
│
├── controllers/
│   ├── pageController.js       # fetches data and renders each page
│   └── studentController.js   # handles saving a student, updating status, serving states
│
├── models/
│   └── studentModel.js         # all the database queries in one place
│
├── middleware/
│   └── upload.js               # handles saving the uploaded photo to disk
│
├── utils/
│   └── validateStudent.js      # checks that the submitted form is complete and valid
│
├── db/
│   ├── database.js             # sets up the SQLite connection and creates the table
│   └── seed.js                 # optional script to load sample students
│
├── data/
│   └── states-lgas.json        # Nigerian states and local governments dataset
│
├── views/
│   ├── partials/
│   │   ├── header.ejs          # shared navbar (used on every page)
│   │   └── footer.ejs          # shared footer (used on every page)
│   ├── index.ejs               # landing page
│   ├── form.ejs                # registration form
│   ├── students.ejs            # students index/table
│   ├── details.ejs             # individual student profile
│   └── not-found.ejs           # 404 page
│
└── public/
    ├── css/style.css           # all the styling for every page
    ├── js/form.js              # async state/LGA dropdown logic
    ├── js/details.js           # async admission status update
    └── uploads/                # where student photos get saved
```

---

## Dependencies

| Package | What it's used for |
|---|---|
| `express` | The web server and routing |
| `ejs` | Renders the HTML pages with dynamic data |
| `multer` | Handles the photo file upload |
| `node:sqlite` | Built into Node.js — no extra install needed |
