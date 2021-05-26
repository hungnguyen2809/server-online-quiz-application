const connectDB = require("../database/config");
const _ = require("lodash");

class TopicModel {
	constructor() {}

	getTopics = (permission) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL GET_ALL_TOPIC_ADMIN(?);";
				const values = [permission];
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

	createTopic = ({ name, image, description }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL TOPIC_CREATE_NEW(?, ?, ?)";
				const values = [name, image, description];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	};

	deleteTopic = ({ id }) => {
		return new Promise((resolve, reject) => {
			try {
				const sqlDel = "CALL TOPIC_DELETE(?)";
				const sqlFind = "CALL TOPIC_FIND(?)";
				const values = [id];
				connectDB.query(sqlFind, values, (err, res) => {
					if (err === null) {
						if (_.get(res[0][0], "NUMBER") > 0) {
							connectDB.query(sqlDel, values, (err, res) => {
								if (err === null) {
									resolve({ data: true });
								} else {
									reject({ error: err });
								}
							});
						} else {
							resolve({ data: false });
						}
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	};

	updateTopic = ({ id, name, image, description, status }) => {
		return new Promise((resolve, reject) => {
			try {
				const sqlUpdate = "CALL TOPIC_UPDATE(?, ?, ?, ?, ?)";
				const values = [id, name, image, description, status];
				connectDB.query(sqlUpdate, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	};
}

module.exports = new TopicModel();
