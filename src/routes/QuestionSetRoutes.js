const routes = require("express").Router();
const QuestionSetController = require("../controllers/QuestionSetController");
const { verifyToken } = require("./../controllers/middlewares/verifyToken");

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

module.exports = routes;
