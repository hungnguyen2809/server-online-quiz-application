const QuestionModal = require("./../models/QuestionModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");

class QuestionController {
	constructor() {}
	_isUndefined = (value) => {
		return typeof value === "undefined";
	};

	getQuestionByQuestionSet = async (req, res) => {
		try {
			const { id_qs } = req.query;
			if (this._isUndefined(id_qs)) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate 'id_qs'."));
			}
			const questions = await QuestionModal.getQuestionByQuestionSet(id_qs);
			return res.send(resServe.success("Success", _.get(questions, "data")));
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
