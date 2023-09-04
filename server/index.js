const recordController = require("./controllers/recordController");

const express = require("express");
const bodyParser = require("body-parser");

("use strict");

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("../build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function gotoIndex(req, res) {
	console.log(req.params);
	res.sendFile(__dirname + "/" + startPage);
}

app.get(`/${startPage}`, gotoIndex);

app
	.route("/records")
	.post(recordController.setRecord)
	.get(recordController.getRecords);

var server = app.listen(port, host, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
