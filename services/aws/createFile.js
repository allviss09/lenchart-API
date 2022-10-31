const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const createFile = (data) => {
  return new Promise(function (resolve, reject) {
    const a = JSON.stringify(data)
    const params = {
      Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
      Key: "data.txt",
      Body: JSON.stringify(data),
    };
    s3.upload(params, function (err, data) {
      if (err) {
        resolve({ success: false, data: err });
      } else {
        resolve({ success: true, data: data });
      }
    });
  });
};

module.exports = createFile;