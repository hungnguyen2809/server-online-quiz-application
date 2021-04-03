const express = require("express");
const routes = express.Router();
const verifyToken = require("./../controllers/middlewares/verifyToken");
const uploadImg = require("./../controllers/middlewares/uploadImage");

const UserController = require("./../controllers/UserController");
const AuthController = require("./../controllers/AuthController");
const TopicController = require("./../controllers/TopicController");

// Auth
routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.login);
routes.post("/userregister", AuthController.register);

// User
routes.get("/users", verifyToken, UserController.find);
routes.post("/users-infor", verifyToken, UserController.updateInfo);
routes.post(
	"/users-avatar",
	[verifyToken, uploadImg],
	UserController.updateAvatar
);
routes.post("/foget-password", verifyToken, UserController.forgetPassword);

//Topics
routes.post("/topics", TopicController.createNewTopic);
routes.get("/topics", TopicController.getTopics);
routes.delete("/topics", TopicController.deleteTopic);
routes.put("/topics", TopicController.updateTopic);

module.exports = routes;
