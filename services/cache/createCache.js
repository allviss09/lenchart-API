const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 4320 });

const createCache = (key, data, time) => {
  const success = myCache.set(key, data, time);
  return success;
};

module.exports = createCache;
