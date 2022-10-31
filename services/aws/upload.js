const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const uploadFile = (buffer, fileParams) => {
  // or module.exports = (buffer, fileParams) => {
  const key = fileParams.fieldName + "-" + Date.now() + "-" + fileParams.fileName.filename.replace(/\s/g, '-');
  const params = {
    Bucket: "cyclic-easy-red-piglet-hat-ap-south-1",
    Key: key,
    Body: buffer,
    ContentType: fileParams.fileType,
    ContentEncoding: fileParams.fileEnc,
  };
  return s3.upload(params).promise();
};

module.exports = uploadFile;
