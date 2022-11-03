const readFile = require("../aws/readFile");
const getImageURL = require("../aws/getImageUrl");
const createFile = require("../aws/createFile");

const syncJsonWithAws = async () => {
  const { success, data } = await readFile();
  if (success == true && data.length > 0) {
    await data.map((item) => {
      item.imageAWSURL = getImageURL(item.image);
      item.thumbnailAWSURL = getImageURL(item.thumbnail);
    });
    createFile(data);
    return { success: true, data: data };
  } else {
    return { success: false, data: "Not Found Data" };
  }
};

module.exports = syncJsonWithAws;
