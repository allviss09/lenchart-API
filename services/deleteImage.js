const fs = require("fs");

const path = "./images/";

const deleteImage = async (fileName) => {
  let url = String(path + fileName);
  fs.unlink(url, (err) => {});
};

module.exports = deleteImage;
