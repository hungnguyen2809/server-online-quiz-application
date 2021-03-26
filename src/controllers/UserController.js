const UserModel = require("./../models/UserModel");
const resultServe = require("./../common/resultServe");
const format = require("./../common/formatDate");
const configPath = require("./../common/configPathImage");
const { toNumber } = require("lodash");

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
			if (user.image) {
				user.image = configPath(user.image);
			}

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
			if (user.image) {
				user.image = configPath(user.image);
			}

			return res.send(resultServe.success("Updated Success", user));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};

	updateAvatar = async (req, res) => {
		try {
			if (req.file) {
				const id = toNumber(req.body.id);
				const image = req.file.path;
			
				const userUpdating = await UserModel.updateAvatar(id, image);
				let user = userUpdating.results[0];
				if (user.image) {
					user.image = configPath(user.image);
				}

				return res.send(resultServe.success("Updated Success", user));
			} else {
				res.statusCode = 500;
				return res.send(resultServe.error("Error by file"));
			}
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error());
		}
	};
}

module.exports = new UserController();
