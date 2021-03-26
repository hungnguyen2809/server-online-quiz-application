const success = (mes = "Success", payload = []) => {
	return {
		message: mes,
		error: false,
		payload,
	};
};

const error = (mes = "Error by Serve", payload = []) => {
	return {
		message: mes,
		error: true,
		payload,
	};
};

module.exports = {
	success,
	error,
};
