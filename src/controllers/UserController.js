const UserModel = require("./../models/UserModel");
const resultServe = require("./../common/resultServe");
const format = require("./../common/formatDate");

// insert ngày vào thì ngày trừ đi 1 => lấy ra phải cộng thêm 1
// insert theo định dạng năm-tháng-ngày

class UserController {
	constructor() {}

	find = async (req, res) => {
		try {
			const params = req.params;
			const user = await UserModel.find(params.id);
			if (!user.results) {
				res.statusCode = 404;
				let mes = "User not found";
				return res.send(resultServe.error(mes));
			}

			return res.send(resultServe.success("Success", user.results[0]));
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
				image: body.image ? body.image : userOld.image,
				phone: body.phone ? body.phone : userOld.phone,
				birtday: body.birtday
					? format.formatDate(body.birtday)
					: userOld.birtday,
				address: body.address ? body.address : userOld.address,
				id: body.id,
			};

			const user = await UserModel.updateInfo(newUser);
			return res.send(resultServe.success("Updated Success", user.results[0]));
		} catch (error) {
			res.statusCode = 500;
			return res.send(resultServe.error);
		}
	};
}

module.exports = new UserController();
