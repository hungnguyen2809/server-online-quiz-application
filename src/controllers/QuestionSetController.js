const QuestionSetModel = require("./../models/QuestionSetModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");

class QuestionSetController{
  constructor() {}
  _isUndefined = (value) => {
		return typeof value === "undefined";
	};

  questionSetByTopic = async (req, res) => {
    try {
      const {id_topic} = req.query;
      if (this._isUndefined(id_topic)) {
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
  }
}

module.exports = new QuestionSetController();