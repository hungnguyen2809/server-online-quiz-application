const success = (mes = null, payload = []) => {
	return {
		message: mes ? mes : "Thành công",
		error: false,
		payload,
	};
};

const error = (mes = null, payload = []) => {
	return {
		message: mes ? mes : "Thất bại",
		error: true,
		payload,
	};
};

module.exports = {
	success,
	error,
};
