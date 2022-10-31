const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const getImage = async (key) => {
  // try {
  let params = {
    Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
    Key: key,
  };
  const result = await s3.getObject(params).createReadStream();
  return result;
};

module.exports = getImage;
