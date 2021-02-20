const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.SV_PORT;
const HOST = process.env.SV_HOST;

const routes = require("./src/routes/index");

// HTTP Logger
app.use(morgan("dev"));

//Parser Body
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(
	bodyParser.json({
		type: "application/json",
	})
);

app.use("/public/images", express.static("public/images"));

app.get("/", (req, res) => {
	// res.statusCode
	// req.params
	// req.query
	return res.send("Wellcome");
});

app.use("/api", routes);

app.listen(PORT, () => {
	console.log(`Server listening at http://${HOST}:${PORT}`);
});
