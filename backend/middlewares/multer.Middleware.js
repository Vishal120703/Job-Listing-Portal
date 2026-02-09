const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, "upload/images");
    } 
    else if (file.fieldname === "resume") {
      cb(null, "upload/resumes");
    } 
    else {
      cb(new Error("Invalid field name"), false);
    }
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {

  if (file.fieldname === "profileImage") {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG allowed for profile image"), false);
    }
  } 
  
  else if (file.fieldname === "resume") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF allowed for resume"), false);
    }
  } 
  
  else {
    cb(new Error("Invalid field name"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
});

module.exports = upload;

