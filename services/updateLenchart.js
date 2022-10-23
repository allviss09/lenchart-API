const data = require("../data/readdata");
const writeFile = require("../data/writedata");
const deleteImage = require('../services/deleteImage.js')

const updateLenchart = (lenchart, id) => {
  if (id !== lenchart.id) {
    return false;
  } else {
    const list = data();

    if (list.length == 0) return false;
    var index = list.findIndex((c) => c.id == id);

    if (index < 0) return false;
    deleteImage(list[index].image)
    deleteImage(list[index].thumbnail)
    list[index] = lenchart;
    return writeFile(list);
  }
};
module.exports = updateLenchart;
