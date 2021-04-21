const UserQuestionModal = require("./../models/UserQuestionModel");
const _ = require("lodash");
const resServe = require("./../common/resultServe");
const configPath = require("../common/configPathImage");

class UserQuestionController {
	constructor() {}

	getInfoExam = async (req, res) => {
		try {
			const { id_user, id_topic } = req.query;
			if (!id_topic || !id_user) {
				res.statusCode = 400;
				return res.send(
					resServe.error("Bad request. Validate 'id_user' or 'id_topic'.")
				);
			}
			const infoExam = await UserQuestionModal.getInfoExamByUserTopic(
				id_user,
				id_topic
			);
			return res.send(resServe.success("Success", _.get(infoExam, "data")));
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
			if (!id_qs || !id_user || !time_finish || !number_qc) {
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
			const infoExam = await UserQuestionModal.insertUserQuestion(params);
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
			if (!id_qs || !id_user || !time_finish || !number_qc) {
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
			const infoExam = await UserQuestionModal.updateUserQuestion(params);
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
			const rate = await UserQuestionModal.getRateUser();
			const rateUsers = _.map(_.get(rate, "data", []), (item) => {
				return {
					...item,
					image: item.image ? configPath(item.image) : item.image,
				};
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

			const percentTopics = await UserQuestionModal.getPercentTopic(id_user);
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
