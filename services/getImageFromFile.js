const path = require("path");
const fs = require("fs");

const getImageFromFile = (name) => {
  var url = path.join(process.cwd(), "images", name);
  var checker = fs.existsSync(url);
  if (checker) {
    return url;
  } else {
    return null;
  }
};

module.exports = getImageFromFile;
