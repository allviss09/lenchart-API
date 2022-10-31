const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const deleteFile = (key) => {
  return new Promise(function (resolve, reject) {
    const params = {
      Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
      Key: key,
    };
    s3.deleteObject(params, function (err, data) {
      if (err) {
        resolve({ success: false, error: err.name });
      } else {
        resolve({ success: true, data: data });
      }
    });
  });
};

module.exports = deleteFile;
