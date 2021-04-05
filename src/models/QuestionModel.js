const connectDB = require("../database/config");
const _ = require("lodash");

class QuestionModal {
	constructor() {}

	getQuestionByQuestionSet = (id_qs) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_BY_QUESTION_SET(?);";
				const values = [id_qs];
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

module.exports = new QuestionModal();
