const UserModel = require("./../models/UserModel");
const resultServe = require("./../common/resultServe");

class AuthController {
	constructor() {}

	hasEmail = async (req, res) => {
		const { email } = req.query;
		// console.log(email);
		try {
			const hasEmail = await UserModel.hasEmail(email);
			if (hasEmail.results) {
				res.statusCode = 400;
				let mes = "Email exists";
				return res.send(resultServe.error(mes));
			}
			return res.send(resultServe.success("Email availability."));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};

	login = async (req, res) => {
		const body = req.body;
		if (!body.email || !body.token) {
			res.statusCode = 400;
			let mes = "Bad requets, Requets must body email, token.";
			return res.send(resultServe.error(mes));
		}
		try {
			const { email, token } = body;
			const hasEmail = await UserModel.hasEmail(email);
			if (!hasEmail.results) {
				res.statusCode = 404;
				let mes = "User not exists";
				return res.send(resultServe.error(mes));
			}
			const user = await UserModel.login(email, token);
			if (user.results.length === 0) {
				res.statusCode = 403;
				let mes = "Incorrect account email or password";
				return res.send(resultServe.error(mes));
			}
			if (user.results[0].status === 0) {
				res.statusCode = 406;
				let mes = "The account is locked, unavailable.";
				return res.send(resultServe.error(mes));
			}
			return res.send(resultServe.success("Success", user.results[0]));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};

	register = async (req, res) => {
		try {
			// check requets
			const body = req.body;
			if (!body.name || !body.email || !body.token) {
				res.statusCode = 400;
				let mes = "Bad requets. Requets must name, email, token";
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
			return res.send(resultServe.success("Create Success", user.results[0]));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error);
		}
	};
}

module.exports = new AuthController();
