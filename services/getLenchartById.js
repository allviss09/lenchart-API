const data = require("../data/readdata");

const getLenchartById = async (id) => {
    const list = await data();
    var lenchart = list.find(c => c.id == id);
    if (lenchart) return lenchart;
    return null;
}
module.exports = getLenchartById;