const connectDB = require("./../database/config");
const lodash = require("lodash");
const { reject, result } = require("lodash");

const TABLE_NAME = "users";

class UserModel {
	constructor() {}

	hasEmail(email) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ?`;
			try {
				connectDB.query(sql, [email], (err, results) => {
					// không thấy => false, tìm thấy => true
					if (lodash.isEmpty(results)) {
						resolve({ results: false });
					} else {
						resolve({ results: true });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	find(id) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
			try {
				connectDB.query(sql, [id], (err, results) => {
					if (lodash.isEmpty(results)) {
						resolve({ results: false });
					} else {
						resolve({ results });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	login(email, token) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM ${TABLE_NAME} WHERE email = ? AND token = ? `;
			const values = [email, token];
			try {
				connectDB.query(sql, values, (err, results) => {
					resolve({ results });
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	create(user) {
		return new Promise((resolve, reject) => {
			// (name, email, token, image, phone, birtday, address, permission, status)
			const sql = `INSERT INTO ${TABLE_NAME} VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
			let permission = 0;
			let status = 1;
			const values = [
				user.name,
				user.email,
				user.token,
				user.image ? user.image : null,
				user.phone ? user.phone : null,
				user.birtday ? user.birtday : null,
				user.address ? user.address : null,
				permission,
				status,
			];

			try {
				connectDB.query(sql, values, (err, res) => {
					const id = res.insertId;
					connectDB.query(
						`SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
						[id],
						(error, results) => {
							resolve({ results });
						}
					);
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	updateInfo(user) {
		return new Promise((resolve, reject) => {
			const sql = `UPDATE ${TABLE_NAME} SET name = ?, image = ?, phone = ?, birtday = ?, address = ? WHERE id = ?`;
			const values = [
				user.name,
				user.image,
				user.phone,
				user.birtday,
				user.address,
				user.id,
			];
			try {
				connectDB.query(sql, values, (err, res) => {
					connectDB.query(
						`SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
						[user.id],
						(error, results) => {
							resolve({ results });
						}
					);
				});
			} catch (error) {
				reject({ error });
			}
		});
	}
}

module.exports = new UserModel();
