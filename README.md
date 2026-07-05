# Student Portal

A web application where students can fill in their personal and academic details to register for an online course platform. Once a student submits the form, their information is saved to a database and they can be viewed, managed, and given an admission status by whoever is running the portal.

The app was built with Node.js and Express on the backend, EJS for the HTML pages, and plain HTML, CSS and JavaScript on the frontend with no heavy frameworks. Student photos are saved directly to a folder on the server, and everything else goes into a SQLite database.


## What it does

**Landing Page**
The first thing a visitor sees. It has a short description of what the portal is about and a Get Started button that takes you straight to the registration form.

**Registration Form**
This is where students fill in their details including name, email, date of birth, gender, phone number, home address, state of origin, local government, next of kin, and their JAMB score. They also upload a photo here. The state and local government dropdowns load their options automatically from a dataset in the background without any page reload needed. Everything is checked before it gets saved, and if something is missing the form stays open with a message explaining what went wrong.

**Students Index**
Once a student submits the form, they land here. It is a table listing every registered student with their name, gender, JAMB score, and admission status. You can search by name or filter by status, gender, or score. Each row has a view button that takes you to that student's full profile.

**Student Details**
The full profile of one student showing their photo, all personal info, state and local government, next of kin, JAMB score, and their current admission status. There is also a small dropdown on this page where you can change the admission status between Admitted, Undecided, and Rejected. It updates on the spot without refreshing the page.


## Getting it running

You will need Node.js v22.5 or later installed. Check what you have with `node -v`. If you do not have it yet, grab it from https://nodejs.org/en/download.

Once Node is installed, open a terminal inside the project folder and run:

```
npm install
npm start
```

Then open http://localhost:3000 in your browser.

The database file and uploads folder are created automatically the first time the app starts so there is nothing else to set up.

Note for Windows users: if your terminal says npm is not recognized, try running the execution policy fix first:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then close and reopen your terminal and try again.


## Loading sample data

The app starts with an empty database which makes sense for real use since students register themselves through the form. But if you want to see what the index and details pages look like with actual data in them straight away, run this command after npm install:

```
npm run seed
```

This adds four sample students with different admission statuses so you can click around right away. The placeholder photos for them are already included in the project. You can run it more than once without any problems since it clears the old sample rows before adding fresh ones each time.


## Project structure

```
student-portal/
│
├── server.js                       starts the app and wires everything together
│
├── routes/
│   ├── pages.js                    the four page routes
│   └── api.js                      form submission, states data, status updates
│
├── controllers/
│   ├── pageController.js           fetches data and renders each page
│   └── studentController.js       handles saving a student and updating status
│
├── models/
│   └── studentModel.js             all the database queries in one place
│
├── middleware/
│   └── upload.js                   handles saving the uploaded photo to disk
│
├── utils/
│   └── validateStudent.js          checks that the submitted form is complete
│
├── db/
│   ├── database.js                 sets up the SQLite connection and creates the table
│   └── seed.js                     optional script to load sample students
│
├── data/
│   └── states-lgas.json            Nigerian states and local governments dataset
│
├── views/
│   ├── partials/
│   │   ├── header.ejs              shared navbar used on every page
│   │   └── footer.ejs              shared footer used on every page
│   ├── index.ejs                   landing page
│   ├── form.ejs                    registration form
│   ├── students.ejs                students index table
│   ├── details.ejs                 individual student profile
│   └── not-found.ejs              404 page
│
└── public/
    ├── css/style.css               all the styling for every page
    ├── js/form.js                  async state and LGA dropdown logic
    ├── js/details.js               async admission status update
    └── uploads/                    where student photos get saved
```


## Dependencies

Express handles the web server and routing. EJS renders the HTML pages with dynamic data. Multer handles the photo file upload. SQLite comes built into Node.js so no extra installation is needed for the database.
