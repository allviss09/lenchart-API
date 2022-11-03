"use strict";

const upload = require("../utils/uploadMiddlerware");

module.exports = function (app) {
  let controller = require("../controllers/LenchartController");

  app.route("/lencharts").get(controller.get).post(controller.save);

  app
    .route("/lencharts/:id")
    .get(controller.detail)
    .put(controller.update)
    .delete(controller.delete);

  app.route("/image/:name").get(controller.getImageURL);
  app.route("/user/login").post(controller.login);
};
