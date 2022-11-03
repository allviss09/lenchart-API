const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 4320 });

const readCache = (key) => {
  const data = myCache.get(key);
  if (data == undefined) {
    return null;
  } else {
    return data;
  }
};

module.exports = readCache;
