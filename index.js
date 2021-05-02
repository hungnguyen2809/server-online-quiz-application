const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const { HOST_PORT } = require("./src/constants");

// Routes
const routes = require("./src/routes");

// HTTP Logger
app.use(morgan("dev"));

//Parser Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

// Public images
app.use("/public/images", express.static("public/images"));

app.get("/", (req, res) => {
	// res.statusCode
	// req.params
	// req.query
	return res.send("Wellcome, My name is Hung.");
});

app.use("/api", routes);

app.listen(HOST_PORT.PORT, () => {
	console.log(
		`Server is runing at host:${HOST_PORT.HOST}, port:${HOST_PORT.PORT}`
	);
});
