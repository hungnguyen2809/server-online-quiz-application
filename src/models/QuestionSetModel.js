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
}

module.exports = new QuestionSetModel();
