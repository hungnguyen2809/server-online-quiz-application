const QuestionModal = require("./../models/QuestionModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");
const { checkUndefined } = require("../common/methodServer");

class QuestionController {
	constructor() {}
	_isUndefined = (value) => {
		return typeof value === "undefined";
	};

	getQuestionByQuestionSet = async (req, res) => {
		try {
			const { id_qs, per } = req.query;
			if (this._isUndefined(id_qs)) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate 'id_qs'."));
			}
			const permission = checkUndefined(per) ? 0 : 1;
			const questions = await QuestionModal.getQuestionByQuestionSet(
				id_qs,
				permission
			);
			return res.send(resServe.success("Success", _.get(questions, "data")));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	addQuestion = async (req, res) => {
		try {
			const { id_qs, content, asA, asB, asC, asD, asFinal } = req.body;
			if (!id_qs || !content || !asA || !asB || !asC || !asD || !asFinal) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate params miss"));
			}
			const params = { id_qs, content, asA, asB, asC, asD, asFinal };
			const question = await QuestionModal.addQuestion(params);
			return res.send(resServe.success(null, question.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};
}

module.exports = new QuestionController();
