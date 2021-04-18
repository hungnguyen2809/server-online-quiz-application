const UserQuestionModal = require("./../models/UserQuestionModel");
const resServe = require("./../common/resultServe");
const _ = require("lodash");

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
}

module.exports = new UserQuestionController();
