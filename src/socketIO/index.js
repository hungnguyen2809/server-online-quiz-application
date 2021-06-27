const { Server } = require("socket.io");
const {
	SOCKET_CLIENT_SEND_PROFILE,
	SOCKET_CLIENT_SEND_NEW_POST,
	SOCKET_SERVER_SEND_NEW_POST,
} = require("./constant");
const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log("Co nguoi ket noi: ", socket.id);
	socket.on(SOCKET_CLIENT_SEND_PROFILE, (data) => {
		socket.user = JSON.parse(data);
		// console.log("Người dùng hiện tại: ", socket.user.name);
	});

	//POST
	socket.on(SOCKET_CLIENT_SEND_NEW_POST, () => {
		socket.broadcast.emit(SOCKET_SERVER_SEND_NEW_POST);
	});
});

module.exports = { io };
