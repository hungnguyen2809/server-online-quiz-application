require("dotenv").config();
const HOST = process.env.SV_HOST;
const PORT = process.env.SV_PORT;
const PRODUCT = process.env.PRODUCT;
const HOST_HEROKU = process.env.HOST_HEROKU;

const configPath = (path) => {
	// console.log(path);
	return PRODUCT === "true"
		? HOST_HEROKU + path
		: `http://${HOST}:${PORT}/${path}`;
};

module.exports = configPath;
