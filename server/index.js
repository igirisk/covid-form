const { initializeApp } = require("firebase/app");
const recordController = require("./controllers/recordController");

const express = require("express");
const bodyParser = require("body-parser");

("use strict");

const firebaseConfig = {
	apiKey: "AIzaSyBwseOkS7aP_KpNidfsmWnx3iUUvhWf0K0",
	authDomain: "covid-form-10643.firebaseapp.com",
	projectId: "covid-form-10643",
	storageBucket: "covid-form-10643.appspot.com",
	messagingSenderId: "52450111638",
	appId: "1:52450111638:web:b70c774b739bd3f28952b7",
};
const firebase = initializeApp(firebaseConfig);

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("../build"));
// app.use("/", express.static("../build"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function gotoIndex(req, res) {
	console.log(req.params);
	res.sendFile(__dirname + "/" + startPage);
}

app.get(`/${startPage}`, gotoIndex);

// app.route("/");
app
	.route("/records")
	.post(recordController.setRecord)
	.get(recordController.getRecords);

var server = app.listen(port, host, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
