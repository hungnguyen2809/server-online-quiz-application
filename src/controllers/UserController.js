const UserModel = require("./../models/UserModel");
const resultServe = require("./../common/resultServe");
const format = require("./../common/formatDate");
const { toNumber } = require("lodash");
const { checkUndefined } = require("./../common/methodServer");

class UserController {
	constructor() {}

	find = async (req, res) => {
		try {
			const query = req.query;
			const userFinding = await UserModel.find(query.id);
			if (!userFinding.results) {
				res.statusCode = 404;
				let mes = "User not found";
				return res.send(resultServe.error(mes));
			}

			let user = userFinding.results[0];

			return res.send(resultServe.success("Success", user));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error);
		}
	};

	updateInfo = async (req, res) => {
		try {
			const body = req.body;
			const userOld = await UserModel.find(body.id);
			if (!userOld.results) {
				res.statusCode = 404;
				let mes = "User not found";
				return res.send(resultServe.error(mes));
			}

			const newUser = {
				name: body.name ? body.name : userOld.name,
				phone: body.phone ? body.phone : userOld.phone,
				birtday: body.birtday
					? format.formatDate(body.birtday)
					: userOld.birtday,
				address: body.address ? body.address : userOld.address,
				id: toNumber(body.id),
			};

			const userUpdating = await UserModel.updateInfo(newUser);
			let user = userUpdating.results[0];

			return res.send(resultServe.success("Updated Success", user));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error(error.message));
		}
	};

	updateAvatar = async (req, res) => {
		try {
			const { id, imageUrl } = req.body;
			if (!id || !imageUrl) {
				return res.send(resultServe.error("Invalie id and image"));
			}

			const userUpdating = await UserModel.updateAvatar(id, imageUrl);
			return res.send(resultServe.success(null, userUpdating.results[0]));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error(ex.message));
		}
	};

	forgetPassword = async (req, res) => {
		try {
			const { email, password } = req.body;
			const userUpdate = await UserModel.updatePassword(email, password);

			let user = userUpdate.data;

			return res.send(resultServe.success("Updated Success", user));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error(error.message));
		}
	};

	getAllUserBy = async (req, res) => {
		try {
			const per = typeof req.query.per === "undefined" ? 0 : 1;
			const allUser = await UserModel.getAllUserBy(per);
			return res.send(resultServe.success(null, allUser.data));
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error(ex.message));
		}
	};

	updateInfoUserAdmin = async (req, res) => {
		try {
			const { id, email, password, status, per } = req.body;
			if (
				checkUndefined(id) ||
				checkUndefined(email) ||
				checkUndefined(password) ||
				checkUndefined(status) ||
				checkUndefined(per)
			) {
				res.statusCode = 400;
				return res.send(resultServe.error("Bad request. Validate field."));
			}
			const params = { id, email, password, status, per };
			const userUp = await UserModel.updateInfoUserAdmin(params);
			return res.send(resultServe.success(null, userUp.data[0]));
		} catch (ex) {
			res.statusCode = 500;
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error(ex.message));
		}
	};
}

module.exports = new UserController();
