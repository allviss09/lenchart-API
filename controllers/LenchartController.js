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

const uuid = require("uuid");

module.exports = {
  get: async (req, res) => {
    var data = await getLencharts();
    res.status(200).json(data);
  },
  getImage: async (req, res) => {
    var filename = req.params.name;
    var url = getImageFromFile(filename);
    if (url) {
      res.status(200).sendFile(url);
    } else {
      res.status(404).send("Image Not Found");
    }
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
    var result = await getLenchartById(id);
    if (result) {
      res.status(200).json(result);
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
    
    const newFilename = await resizeImage(req);
    console.log(req.files)
    const lenchart = {
      id: uuid.v4(),
      name: req.body.name,
      description: req.body.description,
      image: req.files.image[0].filename,
      thumbnail: newFilename,
    };
    var result = await saveLenchart(lenchart);
    if (!result) {
      await deleteImage(lenchart.image);
      await deleteImage(lenchart.thumbnail);
      res.status(400).json({ error: "Create Fail" });
    } else {
      res.status(200).json({ data: lenchart.id });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await deleteLenchart(id);
    if (!result) {
      res.status(400).json({ error: "Delete Fail" });
    } else {
      res.status(200).json({ data: id });
    }
  },
};
