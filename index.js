require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const routes = require("./src/routes");
const { io } = require("./src/socketIO");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use("/public/images", express.static("public/images"));

const server = require("http").createServer(app);
server.listen(process.env.PORT || 8888, () => {
	console.log(`Server is runing at port: ${process.env.PORT || 8888}`);
});

app.get("/", (req, res) => {
	return res.send("Wellcome, My name is Hung.");
});

io.listen(server);
app.use("/api", routes);
