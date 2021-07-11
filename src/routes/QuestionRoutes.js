const routes = require("express").Router();
const { verifyToken } = require("./../controllers/middlewares/verifyToken");
const QuestionController = require("../controllers/QuestionController");

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

module.exports = routes;
