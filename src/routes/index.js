const express = require("express");
const routes = express.Router();
const verifyToken = require("./../controllers/middlewares/verifyToken");
const uploadImg = require("./../controllers/middlewares/uploadImage");

const UserController = require("./../controllers/UserController");
const AuthController = require("./../controllers/AuthController");
const TopicController = require("./../controllers/TopicController");
const QuestionController = require("./../controllers/QuestionController");
const QuestionSetController = require("./../controllers/QuestionSetController");

// Auth
routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.login);
routes.post("/userregister", AuthController.register);
routes.post("/foget-password", UserController.forgetPassword);

// User
routes.get("/users", verifyToken, UserController.find);
routes.post("/users-infor", verifyToken, UserController.updateInfo);
routes.post(
	"/users-avatar",
	[verifyToken, uploadImg],
	UserController.updateAvatar
);

//Topics
routes.post("/topics", verifyToken, TopicController.createNewTopic);
routes.get("/topics", verifyToken, TopicController.getTopics);
routes.delete("/topics", verifyToken, TopicController.deleteTopic);
routes.put("/topics", verifyToken, TopicController.updateTopic);

//Questions
routes.get(
	"/questions/question-qs",
	verifyToken,
	QuestionController.getQuestionByQuestionSet
);

//Questions Set
routes.get(
	"/questions-set/question-topic",
	verifyToken,
	QuestionSetController.questionSetByTopic
);

module.exports = routes;
