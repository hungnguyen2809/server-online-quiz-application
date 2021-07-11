const { isEmpty } = require("lodash");
const connectDB = require("../database/config");

class AuthModal {
	hasEmail(email) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM users WHERE email = ?`;
			try {
				connectDB.query(sql, [email], (err, results) => {
					if (isEmpty(results)) {
						resolve({ results: false });
					} else {
						resolve({ results: true, id: results[0].id });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	loginUser(email, password) {
		return new Promise((resolve, reject) => {
			const sql = "CALL Login_User(?, ?);";
			const values = [email, password];
			try {
				connectDB.query(sql, values, (err, res) => {
					resolve({ results: res[0] });
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	loginAdmin(email, password) {
		return new Promise((resolve, reject) => {
			const sql = "CALL LOGIN_ADMIN(?, ?)";
			const values = [email, password];
			try {
				connectDB.query(sql, values, (err, results) => {
					if (err === null) {
						resolve({ data: results[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	registerUser(user) {
		return new Promise((resolve, reject) => {
			const sql = "CALL REGISTER_USER(?, ?, ?, ?, ?, ?, ?, ?, ?);";
			let permission = 0;
			let status = 1;
			const values = [
				user.name,
				user.email,
				user.password,
				user.image ? user.image : null,
				user.phone ? user.phone : null,
				user.birtday ? user.birtday : null,
				user.address ? user.address : null,
				permission,
				status,
			];

			try {
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ results: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	}

	registerTokenRefresh = (token, id_user) => {
		return new Promise((resolve, reject) => {
			const sql = "CALL Insert_Token_Refresh(?, ?);";
			const values = [token, id_user];
			try {
				connectDB.query(sql, values, (err, res) => {
					if (err) {
						reject({ error: err });
					} else {
						resolve({ data: res[0] });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	unregisterTokenRefresh = (token) => {
		return new Promise((resolve, reject) => {
			const sql = "CALL Delete_Token_Refresh(?);";
			const values = [token];
			try {
				connectDB.query(sql, values, (err, res) => {
					if (err) {
						reject({ error: err });
					} else {
						resolve({ data: res[0] });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	findTokenRefresh = (token) => {
		return new Promise((resolve, reject) => {
			const sql = "CALL Find_Token_Refresh(?);";
			const values = [token];
			try {
				connectDB.query(sql, values, (err, res) => {
					if (err) {
						reject({ error: err });
					} else {
						resolve({ data: res[0] });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};
}

module.exports = new AuthModal();
