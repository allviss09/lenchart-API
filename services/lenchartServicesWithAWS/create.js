const readFile = require("../aws/readFile");
const createFile = require("../aws/createFile");
const parseForm = require("../aws/parseForm");
const uploadFile = require("../aws/upload");
const sharp = require("sharp");

const uuid = require("uuid");
const getImageUrl = require("../aws/getImageUrl");

const createLenchart = async (req) => {
  try {
    const read = await readFile();
    let data = [];
    if (read.success == true) {
      data = read.data;
    } else if (read.error == "NoSuchKey") {
      data = [];
    } else {
      return { success: false, data: "Create Fail !!" };
    }
    const { files, fields } = await parseForm(req);
    const fileUrls = [];
    for (const file of files) {
      let { fileBuffer, ...fileParams } = file;
      if (file.fieldName == "thumbnail") {
        fileBuffer = await sharp(fileBuffer).resize(500, 500).toBuffer();
      }
      const result = await uploadFile(fileBuffer, fileParams);
      fileUrls.push({
        fieldname: file.fieldName,
        filename: result.key,
        url: result.Location,
      });
    }
    if (fileUrls.length > 1) {
      const lenchart = {
        id: uuid.v4(),
        name: fields.name,
        description: fields.description,
        image: fileUrls.find((c) => c.fieldname == "image").filename,
        thumbnail: fileUrls.find((c) => c.fieldname == "thumbnail").filename,
        imageAWSURL: getImageUrl(
          fileUrls.find((c) => c.fieldname == "image").filename
        ),
        thumbnailAWSURL: getImageUrl(
          fileUrls.find((c) => c.fieldname == "thumbnail").filename
        ),
      };
      const checkDuplicate = data.find((c) => c.name == lenchart.name);
      if (checkDuplicate != null) {
        return { success: false, data: "Duplicate" };
      }
      data.push(lenchart);
      var responseCreate = await createFile(data);
      var { success } = responseCreate;
      if (success == false) {
        return { success: false, data: "Create Fail" };
      } else {
        return { success: true, data: lenchart.id };
      }
    } else {
      return { success: false, data: "Create Fail" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, data: error.message };
  }
};

module.exports = createLenchart;
