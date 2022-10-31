const readFile = require("../aws/readFile");

const findOne = async (id) => {
  const lencharts = await readFile();
  if (lencharts.success == true && lencharts.data.length > 0) {
    const { data } = lencharts;
    const lenchart = data.find((c) => c.id == id);
    console.log(lenchart);
    if (lenchart != null) {
      return { success: true, data: lenchart };
    } else {
      return { success: false, error: " Not Found!!" };
    }
  } else {
    return { success: false, error: " Not Found!!" };
  }
};

module.exports = findOne;
