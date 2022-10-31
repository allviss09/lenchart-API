const AWS = require("aws-sdk");
const { json } = require("body-parser");
const s3 = new AWS.S3();

const readTxtFile = () => {
  return new Promise(function (resolve, reject) {
    const params = {
      Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
      Key: "data.txt",
    };
    s3.getObject(params, function (err, data) {
      if (err) {
        resolve({ success: false, error: err.name });
      } else {
        var data = JSON.parse(Buffer.from(data.Body).toString("utf8"));
        resolve({ success: true, data: data });
      }
    });
  });
};

module.exports = readTxtFile;
