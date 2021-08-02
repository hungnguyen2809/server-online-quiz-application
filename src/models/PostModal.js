const connectDB = require("../database/config");

class PostModal {
	constructor() {}

	getAllPost = (per, offset) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Get_All_Post(?, ?);";
				const values = [per, offset];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	createNewPost = ({ id_user, content, image }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Create_New_Post(?, ?, ?);";
				const values = [id_user, content, image];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	getPostById = (id_post) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Get_Post_By_Id(?);";
				const values = [id_post];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	updatePost = ({ id_post, content, image, newStatus }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Update_Post(?, ?, ?, ?);";
				const values = [id_post, content, image, newStatus];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	createPostComment = ({ id_post, id_user, comment, image }) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Create_New_Post_Comment(?, ?, ?, ?);";
				const values = [id_post, id_user, comment, image];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	getPostCommentByID = (id_post, per) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Get_Post_Comment_By_Id(?, ?);";
				const values = [id_post, per];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};

	updatePostComment = ({id_post_cmt, comment, image, status}) => {
		return new Promise((resolve, reject) => {
			try {
				const sql = "CALL Update_Post_Comment(?, ?, ?, ?);";
				const values = [id_post_cmt, comment, image, status];
				connectDB.query(sql, values, (err, res) => {
					if (err === null) {
						resolve({ data: res[0] });
					} else {
						reject({ error: err });
					}
				});
			} catch (error) {
				reject({ error });
			}
		});
	};
}

module.exports = new PostModal();
