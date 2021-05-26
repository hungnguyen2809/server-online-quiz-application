const connectDB = require("../database/config");
const _ = require("lodash");

class QuestionSetModel {
	constructor() {}

	getQuetionSetByTopic = (id_topic) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_QUESTIONSET_TOPIC(?);";
				const values = [id_topic];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	getAllQuestionSet = ({ id_topic, per }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_ALL_QUESTION_SET(?, ?);";
				const values = [id_topic, per];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	createUpdateQuestionSet = (params) => {
		return new Promise((resolve, reject) => {
			try {
				const { type, id_topic, des, level, id_qs, total } = params;
				const sql = "CALL Create_Update_QuestionSet(?, ?, ?, ?, ?, ?);";
				const values = [type, id_topic, des, level, id_qs, total];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};
}

module.exports = new QuestionSetModel();
