const Busboy = require("busboy");
const sharp = require("sharp");

const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = Busboy({ headers: req.headers });
    const files = []; // create an empty array to hold the processed files
    const buffers = {}; // create an empty object to contain the buffers
    const fields = {}; // create an empty object to contain the fields and values
    form.on("file", (field, file, filename, enc, mime) => {
      buffers[field] = []; // add a new key to the buffers object
      file.on("data", (data) => {
        buffers[field].push(data);
      });
      file.on("end", () => {
        files.push({
          fileBuffer: Buffer.concat(buffers[field]),
          fileType: mime,
          fileName: filename,
          fileEnc: enc,
          fieldName: field,
        });
      });
    });
    form.on("field", function (fieldname, val) {
      fields[fieldname] = val;
    });
    form.on("error", (err) => {
      reject(err);
    });
    form.on("finish", () => {
      resolve({ files, fields });
    });
    req.pipe(form); // pipe the request to the form handler
  });
};

module.exports = parseForm;
