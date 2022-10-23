"use strict";

const upload = require("../utils/uploadMiddlerware");

module.exports = function (app) {
  let controller = require("../controllers/LenchartController");

  app
    .route("/lencharts")
    .get(controller.get)
    .post(
      upload.fields([
        { name: "image", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
      ]),
      controller.save
    );

  app
    .route("/lencharts/:id")
    .get(controller.detail)
    .put(
      upload.fields([
        { name: "image", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
      ]),
      controller.update
    )
    .delete(controller.delete);

  app.route("/image/:name").get(controller.getImage);
  app.route("/user/login").post(controller.login);
};