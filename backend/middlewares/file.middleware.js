const multer = require("multer");
const path = require("path");

// set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// init upload
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1000000 }, // limit 1Mb
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); // check file existed
  },
}).single("file"); // input name

function checkFileType(file, cb) {
  const fileTypes = /jpeg||jpg||png||gif||webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Image Only!");
  }
}

module.exports = { upload };
