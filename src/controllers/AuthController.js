const jwt = require("jsonwebtoken");
require("dotenv");
const UserModel = require("./../models/UserModel");
const resultServe = require("./../common/resultServe");
const configPath = require("../common/configPathImage");
const _ = require("lodash");
const { KEY_HEADER_TOKEN } = require("../constants");

class AuthController {
	constructor() {}

	hasEmail = async (req, res) => {
		const { email } = req.query;
		// console.log(email);
		try {
			const hasEmail = await UserModel.hasEmail(email);
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

	login = async (req, res) => {
		const body = req.body;
		if (!body.email || !body.password) {
			res.statusCode = 400;
			let mes = "Bad requets, Requets must body email, password.";
			return res.send(resultServe.error(mes));
		}
		try {
			const { email, password } = body;
			const hasEmail = await UserModel.hasEmail(email);
			if (!hasEmail.results) {
				res.statusCode = 404;
				let mes = "User not exists";
				return res.send(resultServe.error(mes));
			}
			const userLogin = await UserModel.login(email, password);
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
			// return res.send(resultServe.success("Success", user.results[0]));
			const payload = {
				email: _.get(userLogin.results[0], "email", ""),
				name: _.get(userLogin.results[0], "name", ""),
				phone: _.get(userLogin.results[0], "phone", ""),
				address: _.get(userLogin.results[0], "address", ""),
				admin: _.get(userLogin.results[0], "permission", 0) === 1,
			};

			const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24,
			});

			let user = {
				...userLogin.results[0],
				token: token,
			};
			if (user.image) {
				user.image = configPath(user.image);
			}

			return res
				.header(KEY_HEADER_TOKEN, token)
				.send(resultServe.success("Success", user));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};

	register = async (req, res) => {
		try {
			// check requets
			const body = req.body;
			if (!body.name || !body.email || !body.password) {
				res.statusCode = 400;
				let mes = "Bad requets. Requets must name, email, password";
				return res.send(resultServe.error(mes, []));
			}
			// check email already exist
			const hasUser = await UserModel.hasEmail(body.email);
			if (hasUser.results) {
				res.statusCode = 400;
				let mes = "Email already exist.";
				return res.send(resultServe.error(mes, []));
			}
			// success
			const user = await UserModel.create(body);
			res.statusCode = 201;
			// return res.send(resultServe.success("Create Success", user.results[0]));
			const payload = {
				email: _.get(user.results[0], "email", ""),
				name: _.get(user.results[0], "name", ""),
				phone: _.get(user.results[0], "phone", ""),
				address: _.get(user.results[0], "address", ""),
				admin: _.get(user.results[0], "permission", 0) === 1,
			};

			const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
				expiresIn: 60 * 60 * 24,
			});

			return res.header(KEY_HEADER_TOKEN, token).send(
				resultServe.success("Created Success", {
					...user.results[0],
					token: token,
				})
			);
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error);
		}
	};
}

module.exports = new AuthController();
