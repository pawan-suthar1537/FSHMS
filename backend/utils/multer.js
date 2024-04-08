// multer.config.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure that the directory exists or create it if it doesn't
const profileImageDirectory = path.join(__dirname, "../public/allimages");
if (!fs.existsSync(profileImageDirectory)) {
  fs.mkdirSync(profileImageDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profileImageDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimetype = allowedFileTypes.test(file.mimetype);
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error("Only images with .jpg, .jpeg, or .png extensions are allowed")
    );
  },
});

module.exports = upload;
