"use strict";

const getLencharts = require("../data/readdata");
const saveLenchart = require("../services/saveLenchart");
const deleteImage = require("../services/deleteImage");
const updateLenchart = require("../services/updateLenchart");
const getLenchartById = require("../services/getLenchartById");
const deleteLenchart = require("../services/deleteLenchart");
const getImageFromFile = require("../services/getImageFromFile");
const checkLogin = require("../services/login");
const resizeImage = require("../services/resizeImage");
const getImage = require("../services/aws/getImage");
const readFile = require("../services/aws/readFile");
const createFile = require("../services/lenchartServicesWithAWS/create");
const deleteOne = require("../services/lenchartServicesWithAWS/delete");
const findOne = require("../services/aws/findOne");

const uuid = require("uuid");

module.exports = {
  get: async (req, res) => {
    const read = await readFile();
    const { success } = read;
    console.log(read);
    if (success === false) {
      res.status(500).json(read);
    } else {
      res.status(200).json(read);
    }
  },
  getImage: async (req, res) => {
    var filename = req.params.name;
    const imageStream = await getImage(filename);
    imageStream.on("error", function (err) {
      res.status(404).json("Not Found");
    });
    imageStream.pipe(res);
  },
  login: async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(req.body);
    var result = checkLogin(data);
    if (result) {
      res.status(200).json({ role: "admin" });
    } else {
      res.status(404).json({ error: "Login Fail" });
    }
  },
  detail: async (req, res) => {
    var id = req.params.id;
    var { success, data } = await findOne(id);
    if (success == true) {
      res.status(200).json(data);
    } else {
      res.status(400).send("Not found");
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const lenchart = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      image: req.files.image[0].filename,
      thumbnail: req.files.thumbnail[0].filename,
    };
    var result = updateLenchart(lenchart, id);
    if (!result) {
      await deleteImage(lenchart.image);
      await deleteImage(lenchart.thumbnail);
      res.status(400).send("Update Fail");
    } else {
      res.status(200).send("Update Lenchart " + lenchart.name + " success");
    }
  },
  save: async (req, res) => {
    const result = await createFile(req);
    if (result.success == true) {
      res.status(200).json({ result });
    } else {
      res.status(500).json({ result });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await deleteOne(id);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result.data);
    }
  },
};
