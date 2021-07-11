const routes = require("express").Router();
const { verifyToken } = require("./../controllers/middlewares/verifyToken");
const TopicController = require("../controllers/TopicController");

routes.post("/topics", verifyToken, TopicController.createNewTopic);
routes.get("/topics", verifyToken, TopicController.getTopics);
routes.delete("/topics", verifyToken, TopicController.deleteTopic);
routes.put("/topics", verifyToken, TopicController.updateTopic);

module.exports = routes;
