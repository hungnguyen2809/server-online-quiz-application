const jwt = require("jsonwebtoken");
require("dotenv");

const verifyToken = (request, response, next) => {
	const token = request.header("auth-token");

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

module.exports = verifyToken;
