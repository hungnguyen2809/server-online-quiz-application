const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = 8888;

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

app.get("/", (req, res) => {
	// res.statusCode
	// req.params
	// req.query
	return res.send("Wellcome");
});

app.use("/api", routes);

app.listen(PORT, () => {
	console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
