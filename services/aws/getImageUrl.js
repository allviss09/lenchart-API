const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const getImageUrl = (key) => {
  let params = {
    Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
    Key: key,
    Expires: 604800,
  };
  const url = s3.getSignedUrl("getObject", params);
  return url
};

module.exports = getImageUrl;
