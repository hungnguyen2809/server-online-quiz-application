const { findIndex, find } = require("lodash");
const { Server } = require("socket.io");
const io = new Server({ cors: { origin: "*" } });
const {
	SOCKET_CLIENT_SEND_PROFILE,
	SOCKET_CLIENT_SEND_NEW_POST,
	SOCKET_SERVER_SEND_NEW_POST,
	SOCKET_CLIENT_SEND_JOIN_ROOM_POST,
	SOCKET_CLIENT_SEND_LEAVE_ROOM_POST,
	SOCKET_CLIENT_SEND_USER_FOCUS_POSTCOMMENT,
	SOCKET_SERVER_SEND_USER_FOCUS_POSTCOMMENT,
	SOCKET_CLIENT_SEND_USER_UNFOCUS_POSTCOMMENT,
	SOCKET_SERVER_SEND_USER_UNFOCUS_POSTCOMMENT,
	SOCKET_CLIENT_SEND_NEW_POSTCOMMENT,
	SOCKET_SERVER_SEND_NEW_POSTCOMMENT,
	SOCKET_CLIENT_SEND_MEMBER_COMMENT_POST,
	SOCKET_SERVER_SEND_MEMBER_COMMENT_POST,
} = require("./constant");

let clients = [];

io.on("connection", (socket) => {
	// console.log("Co nguoi ket noi: ", socket.id);
	socket.on(SOCKET_CLIENT_SEND_PROFILE, (data) => {
		socket.user = data;
		const client = {
			socket_id: socket.id,
			...data,
		};
		clients.push(client);
	});

	socket.on("disconect", () => {
		const idxClient = findIndex(
			clients,
			(item) => item.socket_id === socket.id
		);
		if (idxClient !== -1) {
			clients.splice(idxClient, 1);
		}
	});

	//POST
	socket.on(SOCKET_CLIENT_SEND_NEW_POST, () => {
		socket.broadcast.emit(SOCKET_SERVER_SEND_NEW_POST);
	});

	// Join vào room của bài viết
	socket.on(SOCKET_CLIENT_SEND_JOIN_ROOM_POST, (data) => {
		const nameRoomPost = `POST_POSTCOMMENT_${data.id_post}`;
		socket.nameRoomPost = nameRoomPost;
		socket.join(nameRoomPost);
		// console.log("JOIN ", io.sockets.adapter.rooms.keys());
	});
	// Leave ra khỏi room của bài viết
	socket.on(SOCKET_CLIENT_SEND_LEAVE_ROOM_POST, (data) => {
		const nameRoomPost = `POST_POSTCOMMENT_${data.id_post}`;
		socket.nameRoomPost = "";
		socket.leave(nameRoomPost);
		// console.log("LEAVE", io.sockets.adapter.rooms.keys());
	});

	// Hiển thị có người đang nhập bình luận
	socket.on(SOCKET_CLIENT_SEND_USER_FOCUS_POSTCOMMENT, () => {
		if (socket.nameRoomPost) {
			socket.broadcast
				.in(socket.nameRoomPost)
				.emit(SOCKET_SERVER_SEND_USER_FOCUS_POSTCOMMENT);
		}
	});
	//Hủy bỏ hiển thị khi không có người nhập bình luận
	socket.on(SOCKET_CLIENT_SEND_USER_UNFOCUS_POSTCOMMENT, () => {
		if (socket.nameRoomPost) {
			socket.broadcast
				.in(socket.nameRoomPost)
				.emit(SOCKET_SERVER_SEND_USER_UNFOCUS_POSTCOMMENT);
		}
	});

	socket.on(SOCKET_CLIENT_SEND_NEW_POSTCOMMENT, (data) => {
		if (socket.nameRoomPost) {
			socket.broadcast
				.in(socket.nameRoomPost)
				.emit(SOCKET_SERVER_SEND_NEW_POSTCOMMENT, data);
		}
	});

	socket.on(SOCKET_CLIENT_SEND_MEMBER_COMMENT_POST, (data) => {
		const client = find(clients, (i) => i.id_user === data.id_user);
		// console.log({ client });
		// console.log({ clients });
		// console.log({ data });
		if (client) {
			socket
				.to(client.socket_id)
				.emit(SOCKET_SERVER_SEND_MEMBER_COMMENT_POST, data);
		}
	});
});

module.exports = { io };
