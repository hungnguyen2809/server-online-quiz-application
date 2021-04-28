require("dotenv").config();
const HOST = process.env.SV_HOST;
const PORT = process.env.SV_PORT;
const PRODUCT = process.env.PRODUCT;

const configPath = (path) => {
	// console.log(path);
	return PRODUCT === "true"
		? "https://onlinequiz-server.herokuapp.com/" + path
		: `http://${HOST}:${PORT}/${path}`;
};

module.exports = configPath;
