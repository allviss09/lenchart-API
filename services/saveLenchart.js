const getData = require("../data/readdata");
const writeFile = require("../data/writedata");
const uuid = require("uuid");

const saveLenchart = async (lenchart) => {
  const data = await getData()
  if (data.length > 0) {
    const list = data
    var checkDupl = list.find((c) => c.name == lenchart.name);
    if (checkDupl != undefined) {
      return false;
    } else {
      list.push(lenchart);
      return writeFile(list);
    }
  } else {
    const list = [];
    list.push(lenchart);
    return writeFile(list);
  }
};

module.exports = saveLenchart;
