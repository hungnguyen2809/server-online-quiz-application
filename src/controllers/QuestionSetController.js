const QuestionSetModel = require("./../models/QuestionSetModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");
const { checkUndefined } = require("../common/methodServer");

class QuestionSetController {
	constructor() {}

	questionSetByTopic = async (req, res) => {
		try {
			const { id_topic } = req.query;
			if (checkUndefined(id_topic)) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate 'id_topic'."));
			}
			const questions = await QuestionSetModel.getQuetionSetByTopic(id_topic);
			return res.send(resServe.success("Success", _.get(questions, "data")));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	getAllQuestionSet = async (req, res) => {
		try {
			const { id_topic, per } = req.query;
			if (checkUndefined(id_topic) || checkUndefined(per)) {
				res.statusCode = 400;
				return res.send(
					resServe.error("Bad request. Validate 'id_topic', 'per'.")
				);
			}
			const payload = { id_topic, per };
			const questionsSet = await QuestionSetModel.getAllQuestionSet(payload);
			return res.send(resServe.success(null, questionsSet.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error(ex.message));
		}
	};

	createUpdateQuestionSet = async (req, res) => {
		try {
			const { type, id_topic, des, level, id_qs, total } = req.body;
			if (
				checkUndefined(type) ||
				checkUndefined(id_topic) ||
				checkUndefined(des) ||
				checkUndefined(level) ||
				checkUndefined(id_qs) ||
				checkUndefined(total)
			) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'type', 'id_topic', 'des', 'level', 'id_qs', 'total'"
					)
				);
			}
			const params = { type, id_topic, des, level, id_qs, total };
			const response = await QuestionSetModel.createUpdateQuestionSet(params);
			return res.send(resServe.success(null, response.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error(ex.message));
		}
	};
}

module.exports = new QuestionSetController();
