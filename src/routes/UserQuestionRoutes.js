const routes = require("express").Router();
const UserQuestionController = require("../controllers/UserQuestionController");
const { verifyToken } = require("./../controllers/middlewares/verifyToken");

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

module.exports = routes;
