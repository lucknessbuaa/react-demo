var express = require("express");
var app = express();
var path = require("path");

app.set("views", "./views");
app.set("view engine", "pug");

// basic vue example
app.get("/", function(req, res) {
	res.render("index");
});

// async and defer demo
app.get("/async", function(req, res) {
	res.render("async");
});

// jquery defer object
app.get("/defer", (req, res) => {
	res.render("defer");
});

app.get("/promise", (req, res) => {
	res.render("promise");
});

app.get("/datas/error", (req, res) => {
	res.sendStatus(500);
});

app.get("/datas/:name/:time", (req, res) => {
	setTimeout(() => {
		res.json({
			data: req.params.name
		});
	}, req.params.time);
});

app.get("/datas/:name", (req, res) => {
	res.json({
		data: req.params.name
	});
});

app.get("/static/deferAndAsync/zero.js", function(req, res) {
	setTimeout(function() {
		res.sendFile(path.join(__dirname, 'dist/deferAndAsync/zero.js'));
	}, 2000);
})

app.use("/static", express.static('dist'));

app.listen(7079, function() {
	console.log("Example app listening on port 7079!");
});