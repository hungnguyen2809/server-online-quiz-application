require("dotenv").config();

const IS_PRODUCT = true;

const KEY_HEADER_TOKEN = "AuthToken-VTNH";

const HOST_PORT = {
	HOST: IS_PRODUCT ? process.env.SV_HOST_PRODUCT : process.env.SV_HOST_DEV,
	PORT: process.env.SV_PORT,
	BaseURL: IS_PRODUCT
		? `http://${process.env.SV_HOST_PRODUCT}:${process.env.SV_PORT}`
		: `http://${process.env.SV_HOST_DEV}:${process.env.SV_PORT}`,
};

module.exports = { KEY_HEADER_TOKEN, HOST_PORT, IS_PRODUCT };
