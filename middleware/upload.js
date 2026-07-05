// middleware/upload.js
// -----------------------------------------------------------------------------
// Configures multer to save uploaded student photos straight to disk, inside
// /public/uploads, under a unique filename. Only the resulting filename (not
// the binary image data) is ever stored in the database.
// -----------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads");

// Make sure the uploads folder exists before multer tries to write into it.
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // e.g. "1719580231245-photo.png" — timestamp keeps every name unique.
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueName);
  },
});

// Only accept common image formats.
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const isAllowed = allowed.test(path.extname(file.originalname).toLowerCase());
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png, gif, webp) are allowed."));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;
