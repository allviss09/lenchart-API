"use strict";

async function readFile() {
  var responseData = require("./database.json");
  return responseData
}
module.exports = readFile;
