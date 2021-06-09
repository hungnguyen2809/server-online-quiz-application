const connectDB = require("../database/config");

class UserQuestionModel {
	constructor() {}

	getInfoExamByUserTopic = (id_user, id_topic) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_QUESTION_USER_TOPIC(?, ?);";
				const values = [id_user, id_topic];
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

	insertUserQuestion = ({ id_user, id_qs, time_finish, number_qc }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL INSERT_USER_QUESTION(?, ?, ?, ?);";
				const values = [id_user, id_qs, time_finish, number_qc];
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

	updateUserQuestion = ({ id_user, id_qs, time_finish, number_qc }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL UPDATE_USER_QUESTION(?, ?, ?, ?);";
				const values = [id_user, id_qs, time_finish, number_qc];
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

	getRateUser = () => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_RATE_USER();";
				connectDB.query(sql, (err, res) => {
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

	getPercentTopic = (id_user) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_PERCENT_TOPIC(?);";
				const values = [id_user];
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

module.exports = new UserQuestionModel();
