const connectDB = require("../database/config");

class QuestionModal {
	constructor() {}

	getQuestionByQuestionSet = (id_qs, per) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_BY_QUESTION_SET(?, ?);";
				const values = [id_qs, per];
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

	addQuestion = (params) => {
		return new Promise((resolve, reject) => {
			try {
				const { id_qs, content, asA, asB, asC, asD, asFinal } = params;
				const values = [id_qs, content, asA, asB, asC, asD, asFinal];
				const sql = "CALL ADD_QUESTION(?, ?, ?, ?, ?, ?, ?);";
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						resolve({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};
}

module.exports = new QuestionModal();
