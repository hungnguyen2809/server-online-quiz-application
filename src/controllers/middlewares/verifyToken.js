const jwt = require("jsonwebtoken");
const { KEY_HEADER_TOKEN } = require("../../constants");
require("dotenv");

const registerToken = (payload) => {
	const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: 60 * 60 * 24,
	});
	return token;
};

const verifyToken = (request, response, next) => {
	const token = request.header(KEY_HEADER_TOKEN);

	if (!token)
		return response.status(401).send({
			message: "Access Denied",
			token_invalid: true,
			payload: null,
			error: true,
		});
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		return response.status(400).send({
			message: "Invalid Token",
			token_invalid: true,
			payload: null,
			error: true,
		});
	}
};

module.exports = { verifyToken, registerToken };
