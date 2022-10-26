const path = require("path");
const sharp = require("sharp")
const deleteImage = require("../services/deleteImage");

async function resizeImage (req) {
    const newFilename = req.files.thumbnail[0].fieldname + "-" + req.body.name + "-" + "480-" + Date.now() + path.extname(req.files.thumbnail[0].originalname);
    const pathurl = path.join(process.cwd(), "images", newFilename);
    await sharp(req.files.thumbnail[0].path).resize(480,480).toFile(pathurl).then(async function(){
      await deleteImage(req.files.thumbnail[0].filename)
    })
    return  newFilename
}

module.exports = resizeImage