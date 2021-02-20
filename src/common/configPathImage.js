require("dotenv").config();
const HOST = process.env.SV_HOST;
const PORT = process.env.SV_PORT;

const configPath = (path) => {
	// console.log(path);
	return `http://${HOST}:${PORT}/${path}`;
};

module.exports = configPath;
