const UserQuestionModel = require("./../models/UserQuestionModel");
const QuestionSetModel = require("./../models/QuestionSetModel");
const _ = require("lodash");
const resServe = require("./../common/resultServe");

class UserQuestionController {
	constructor() {}

	undefined = (value) => {
		return typeof value === "undefined";
	};

	getInfoExam = async (req, res) => {
		try {
			const { id_user, id_topic } = req.query;
			if (!id_topic || !id_user) {
				res.statusCode = 400;
				return res.send(
					resServe.error("Bad request. Validate 'id_user' or 'id_topic'.")
				);
			}
			const questionSets = await QuestionSetModel.getQuetionSetByTopic(
				id_topic
			);
			const mapQS = _.map(questionSets.data, (item) => {
				return {
					id_qs: item.id,
					id_topic: item.id_topic,
					description: item.description,
					level: item.level,
					total_question: item.total_question,
				};
			});
			const infoExam = await UserQuestionModel.getInfoExamByUserTopic(
				id_user,
				id_topic
			);

			let dataResult = [];
			if (_.isEmpty(infoExam.data)) {
				dataResult = mapQS;
			} else {
				dataResult = _.map(mapQS, (item) => {
					let indexInfo = _.findIndex(
						infoExam.data,
						(ie) => ie.id_qs === item.id_qs
					);
					if (indexInfo !== -1) {
						return infoExam.data[indexInfo];
					} else {
						return item;
					}
				});
			}
			return res.send(resServe.success("Success", dataResult));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	createUserQustion = async (req, res) => {
		try {
			const { id_user, id_qs, time_finish, number_qc } = req.body;
			if (
				this.undefined(id_qs) ||
				this.undefined(id_user) ||
				this.undefined(time_finish) ||
				this.undefined(number_qc)
			) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'id_user' or 'id_qs' or 'time_finish' or 'number_qc'."
					)
				);
			}
			let params = {
				id_user,
				id_qs,
				time_finish,
				number_qc,
			};
			const infoExam = await UserQuestionModel.insertUserQuestion(params);
			return res.send(resServe.success("Success", _.get(infoExam, "data")));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	updateUserQustion = async (req, res) => {
		try {
			const { id_user, id_qs, time_finish, number_qc } = req.body;
			if (
				this.undefined(id_qs) ||
				this.undefined(id_user) ||
				this.undefined(time_finish) ||
				this.undefined(number_qc)
			) {
				res.statusCode = 400;
				return res.send(
					resServe.error(
						"Bad request. Validate 'id_user' or 'id_qs' or 'time_finish' or 'number_qc'."
					)
				);
			}
			let params = {
				id_user,
				id_qs,
				time_finish,
				number_qc,
			};
			const infoExam = await UserQuestionModel.updateUserQuestion(params);
			return res.send(resServe.success("Success", _.get(infoExam, "data")));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	getRateUser = async (req, res) => {
		try {
			const rate = await UserQuestionModel.getRateUser();
			const rateUsers = _.map(_.get(rate, "data", []), (item) => {
				return { ...item };
			});
			return res.send(resServe.success("Success", rateUsers));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};

	getPercentTopic = async (req, res) => {
		try {
			const { id_user } = req.query;
			if (!id_user) {
				res.statusCode = 400;
				return res.send(resServe.error("Bad request. Validate 'id_user'."));
			}

			const percentTopics = await UserQuestionModel.getPercentTopic(id_user);
			return res.send(resServe.success("Success", percentTopics.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resServe.error(sqlMessage));
			}
			return res.send(resServe.error());
		}
	};
}

module.exports = new UserQuestionController();
