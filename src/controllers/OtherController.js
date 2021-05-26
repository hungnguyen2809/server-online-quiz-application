const resultServe = require("./../common/resultServe");

class OtherController {
	upLoadImage = async (req, res) => {
		try {
			if (req.file) {
				const image = req.file.path;

				return res.send(resultServe.success("Updated Success", image));
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

module.exports = new OtherController();
