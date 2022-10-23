const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + req.body.name + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(/*res.end('Only images are allowed')*/ null, false);
    }

    cb(null, true);
  },
});

module.exports = upload;