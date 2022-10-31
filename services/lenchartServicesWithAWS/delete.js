const readFile = require("../aws/readFile");
const deleteFile = require("../aws/deleteFile");
const createFile = require("../aws/createFile");

const deleteLenchart = async (id) => {
  const lencharts = await readFile();
  if (lencharts.success == true && lencharts.data.length > 0) {
    const lenchart = lencharts.data.find((c) => c.id == id);
    if (lenchart != null) {
      const filteredLencharts = lencharts.data.filter((c) => c.id != id);
      const { success } = await createFile(filteredLencharts);
      if (success == true) {
        await deleteFile(lenchart.image);
        await deleteFile(lenchart.thumbnail);
        return { success: true, data: lenchart.id };
      } else {
        return { success: false, data: "Delete Fail !!!" };
      }
    } else {
      return { success: false, data: "Not found !!" };
    }
  } else {
    return { success: false, data: "Not found !!!" };
  }
};

module.exports = deleteLenchart;
