const data = require("../data/readdata");
const writeFile = require("../data/writedata");
const deleteImage = require("./deleteImage");

const deleteLenchart = async (id) => {
  const list = await data();
  var lenchart = list.find((c) => c.id == id);
  if (lenchart) {
    var filteredList = list.filter((c) => c.id != lenchart.id);
    writeFile(filteredList);
    deleteImage(lenchart.image);
    deleteImage(lenchart.thumbnail);
    return true;
  } else {
    return false;
  }
};

module.exports = deleteLenchart;
