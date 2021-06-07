const express = require("express");
const routes = express.Router();
const { verifyToken } = require("./../controllers/middlewares/verifyToken");
const uploadImg = require("./../controllers/middlewares/uploadImage");

const UserController = require("./../controllers/UserController");
const AuthController = require("./../controllers/AuthController");
const TopicController = require("./../controllers/TopicController");
const QuestionController = require("./../controllers/QuestionController");
const QuestionSetController = require("./../controllers/QuestionSetController");
const UserQuestionController = require("./../controllers/UserQuestionController");
const OtherController = require("./../controllers/OtherController");
const PostController = require("../controllers/PostController");

// Auth
routes.get("/hasemail", AuthController.hasEmail);
routes.post("/userlogin", AuthController.login);
routes.post("/adminlogin", AuthController.loginAdmin);
routes.post("/userregister", AuthController.register);
routes.post("/foget-password", UserController.forgetPassword);

//Other
routes.post("/upload-image", uploadImg, OtherController.upLoadImage);

// DashBroad
routes.get("/info-dashbroad", verifyToken, AuthController.getInfoDashbroad);

// User
routes.get("/users", verifyToken, UserController.find);
routes.post("/users-infor", verifyToken, UserController.updateInfo);
routes.post(
	"/users-avatar",
	[verifyToken, uploadImg],
	UserController.updateAvatar
);
routes.get("/users-all", verifyToken, UserController.getAllUserBy);
routes.post("/users/update-info-admin", UserController.updateInfoUserAdmin);

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
routes.post(
	"/questions/add-question",
	verifyToken,
	QuestionController.addQuestion
);

//Questions Set
routes.get(
	"/questions-set/question-topic",
	verifyToken,
	QuestionSetController.questionSetByTopic
);
routes.get(
	"/questions-set/get-all",
	verifyToken,
	QuestionSetController.getAllQuestionSet
);
routes.post(
	"/questions-set/create-update",
	verifyToken,
	QuestionSetController.createUpdateQuestionSet
);

//UserQuestion
routes.get(
	"/user-question/getexam-by-usertopic",
	verifyToken,
	UserQuestionController.getInfoExam
);
routes.post(
	"/user-question/create-user-question",
	verifyToken,
	UserQuestionController.createUserQustion
);
routes.put(
	"/user-question/update-user-question",
	verifyToken,
	UserQuestionController.updateUserQustion
);
routes.get(
	"/user-question/rate-users",
	verifyToken,
	UserQuestionController.getRateUser
);
routes.get(
	"/user-question/percent-topics",
	verifyToken,
	UserQuestionController.getPercentTopic
);

//Post
routes.get("/post/get-all", verifyToken, PostController.getAllPost);
routes.get("/post/get-post-id", verifyToken, PostController.getPostByID);
routes.post("/post/create-post", verifyToken, PostController.createNewPost);
routes.post("/post/update-post", verifyToken, PostController.updatePost);

//Post Comment
routes.post(
	"/post-cmt/create-post-cmt",
	verifyToken,
	PostController.createPostComment
);
routes.get(
	"/post-cmt/get-comment",
	verifyToken,
	PostController.getPostCommentByID
);
routes.post(
	"/post-cmt/update-post-cmt",
	verifyToken,
	PostController.updatePostComment
);

module.exports = routes;
