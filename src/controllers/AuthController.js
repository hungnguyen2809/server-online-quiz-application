const resultServe = require("./../common/resultServe");
const {
	registerToken,
	registerRefreshToken,
	verifyRefreshToken,
} = require("./middlewares/verifyToken");
const { get, size, isEmpty } = require("lodash");
const AuthModal = require("../models/AuthModal");

class AuthController {
	constructor() {}

	hasEmail = async (req, res) => {
		const { email } = req.query;
		try {
			const hasEmail = await AuthModal.hasEmail(email);
			if (hasEmail.results) {
				return res.send(
					resultServe.success("Email exists", { exists: true, id: hasEmail.id })
				);
			}
			return res.send(
				resultServe.success("Email availability", { exists: false, id: null })
			);
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};

	loginUser = async (req, res) => {
		const body = req.body;
		if (!body.email || !body.password) {
			res.statusCode = 400;
			let mes = "Bad requets, Requets must body email, password.";
			return res.send(resultServe.error(mes));
		}
		try {
			const { email, password } = body;
			const hasEmail = await AuthModal.hasEmail(email);
			if (!hasEmail.results) {
				res.statusCode = 404;
				let mes = "User not exists";
				return res.send(resultServe.error(mes));
			}
			const userLogin = await AuthModal.loginUser(email, password);
			if (userLogin.results.length === 0) {
				res.statusCode = 403;
				let mes = "Incorrect account email or password";
				return res.send(resultServe.error(mes));
			}
			if (userLogin.results[0].status === 0) {
				res.statusCode = 406;
				let mes = "The account is locked, unavailable.";
				return res.send(resultServe.error(mes));
			}
			const payload = {
				id: get(userLogin, "results.0.id", -1),
				email: get(userLogin.results[0], "email", ""),
				name: get(userLogin.results[0], "name", ""),
				phone: get(userLogin.results[0], "phone", ""),
				address: get(userLogin.results[0], "address", ""),
				admin: get(userLogin.results[0], "permission", 0) === 1,
				image: get(userLogin.results[0], "image", ""),
			};
			const token = registerToken(payload);
			const tokenRefresh = registerRefreshToken(payload);

			await AuthModal.registerTokenRefresh(
				tokenRefresh,
				get(userLogin, "results.0.id", "")
			);

			const userResponse = {
				userInfo: userLogin.results[0],
				userToken: {
					token: token,
					tokenRefresh: tokenRefresh,
				},
			};
			return res.send(resultServe.success("Success", userResponse));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};

	loginAdmin = async (req, res) => {
		const body = req.body;
		try {
			if (!body.email || !body.password) {
				res.statusCode = 400;
				let mes = "Bad requets, Requets must body email, password.";
				return res.send(resultServe.error(mes));
			}

			const { email, password } = body;
			const adminLogin = await AuthModal.loginAdmin(email, password);
			if (size(adminLogin.data) === 0) {
				return res.send(
					resultServe.error(
						"Thông tin tài khoản hoặc mật khẩu không chính xác."
					)
				);
			}

			const payload = {
				id: get(adminLogin.data[0], "id", -1),
				email: get(adminLogin.data[0], "email", ""),
				name: get(adminLogin.data[0], "name", ""),
				phone: get(adminLogin.data[0], "phone", ""),
				address: get(adminLogin.data[0], "address", ""),
				admin: get(adminLogin.data[0], "permission", 0) === 1,
				image: get(adminLogin.data[0], "image", ""),
			};
			const token = registerToken(payload);
			const refreshToken = registerRefreshToken(payload);

			await AuthModal.registerTokenRefresh(
				refreshToken,
				get(adminLogin, "data.0.id", "")
			);

			const userResponse = {
				userInfo: adminLogin.data[0],
				userToken: {
					token: token,
					tokenRefresh: refreshToken,
				},
			};
			return res.send(resultServe.success(null, userResponse));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};

	registerUser = async (req, res) => {
		try {
			// check requets
			const body = req.body;
			if (!body.name || !body.email || !body.password) {
				res.statusCode = 400;
				let mes = "Bad requets. Requets must name, email, password";
				return res.send(resultServe.error(mes, []));
			}
			// check email already exist
			const hasUser = await AuthModal.hasEmail(body.email);
			if (hasUser.results) {
				res.statusCode = 400;
				let mes = "Email already exist.";
				return res.send(resultServe.error(mes, []));
			}
			// success
			const user = await AuthModal.registerUser(body);
			res.statusCode = 201;
			const payload = {
				id: get(user, "results.0.id", -1),
				email: get(user.results[0], "email", ""),
				name: get(user.results[0], "name", ""),
				phone: get(user.results[0], "phone", ""),
				address: get(user.results[0], "address", ""),
				admin: get(user.results[0], "permission", 0) === 1,
				image: get(user.results[0], "image", ""),
			};
			const token = registerToken(payload);
			const tokenRefresh = registerRefreshToken(payload);

			await AuthModal.registerTokenRefresh(
				tokenRefresh,
				get(user, "results.0.id", "")
			);

			return res.send(
				resultServe.success("Created Success", {
					userInfo: user.results[0],
					userToken: {
						token: token,
						tokenRefresh,
					},
				})
			);
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};

	refreshToken = async (req, res) => {
		try {
			const { token, id_user } = req.body;
			if (!token || !id_user) {
				return res.send(resultServe.error("Invalid token, id_user"));
			}
			const tokenRefreshs = await AuthModal.findTokenRefresh(token);
			if (isEmpty(tokenRefreshs.data)) {
				return res
					.status(403)
					.send(resultServe.errorToken("Phiên đăng nhập không tồn tại"));
			}
			const tokenNew = verifyRefreshToken(token);
			await AuthModal.unregisterTokenRefresh(token);
			if (isEmpty(tokenNew)) {
				return res
					.status(403)
					.send(resultServe.errorToken("Bạn không có quyền truy cập"));
			}

			await AuthModal.registerTokenRefresh(tokenNew.refreshToken, id_user);
			const userToken = {
				token: tokenNew.token,
				tokenRefresh: tokenNew.refreshToken,
			};
			return res.send(resultServe.success(null, userToken));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};

	unregisterTokenRefresh = async (req, res) => {
		try {
			const { token } = req.body;
			if (!token) {
				return res.send(resultServe.error("Invalid key token"));
			}
			await AuthModal.unregisterTokenRefresh(token);
			return res.send(resultServe.success());
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};
}

module.exports = new AuthController();
