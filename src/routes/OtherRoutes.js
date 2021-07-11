const routes = require("express").Router();
const uploadImg = require("../controllers/middlewares/uploadImage");
const OtherController = require("../controllers/OtherController");

routes.post("/upload-image", uploadImg, OtherController.upLoadImage);

module.exports = routes;
