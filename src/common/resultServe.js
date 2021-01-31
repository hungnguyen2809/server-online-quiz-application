const success = (mes = "Success", payload = []) => {
	return {
		message: mes,
		payload,
	};
};

const error = (mes = "Error by Serve", payload = []) => {
	return {
		message: mes,
		payload,
	};
};

module.exports = {
	success,
	error,
};
