const { size, filter } = require("lodash");
const TopicModel = require("../models/TopicModel");
const UserModel = require("../models/UserModel");
const resultServe = require("./../common/resultServe");

class DashBroadController {
	getInfoDashbroad = async (req, res) => {
		try {
			const permission = 0; // 1 = admin, 0 user
			const topics = await TopicModel.getTopics(1);
			const userNormal = await UserModel.getAllUserBy(permission);

			const number_topic = size(topics.data);
			const topic_active = size(
				filter(topics.data, (item) => item.status === 1)
			);
			const number_user = size(userNormal.data);
			const user_active = size(
				filter(userNormal.data, (item) => item.status === 1)
			);

			return res.send(
				resultServe.success(null, {
					number_topic,
					topic_active,
					number_user,
					user_active,
				})
			);
		} catch (ex) {
			if (ex.error) {
				const { sqlMessage } = ex.error;
				return res.send(resultServe.error(sqlMessage));
			}
			return res.send(resultServe.error());
		}
	};
}

module.exports = new DashBroadController();
