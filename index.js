const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const routes = require("./src/routes");

// HTTP Logger
// app.use(morgan("dev"));

//Parser Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

//Accept CORS
app.use(cors());

// Public images
app.use("/public/images", express.static("public/images"));

app.get("/", (req, res) => {
	// res.statusCode
	// req.params
	// req.query
	return res.send("Wellcome, My name is Hung.");
});

app.use("/api", routes);

app.listen(process.env.PORT || 8888, () => {
	console.log(`Server is runing at port: ${process.env.PORT || 8888}`);
});
