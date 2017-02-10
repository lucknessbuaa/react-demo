var express = require("express");
var app = express();
var path = require("path");

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/async", function(req, res) {
	res.render("async");
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