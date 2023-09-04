const { db } = require("../db");

function setRecord(request, respond) {
	const name = request.body.name;
	const temperature = request.body.temperature;
	const symptoms = request.body.symptoms;
	const contactWtih = request.body.contactWtih;

	if (name === null || name === undefined) {
		respond.json({ status: 400, msg: "Missing name" });
		return;
	}

	if (temperature === null || temperature === undefined) {
		respond.json({ status: 400, msg: "Missing temperature" });
		return;
	}

	if (symptoms === null || symptoms === undefined) {
		respond.json({ status: 400, msg: "Missing symptoms" });
		return;
	}

	if (contactWtih === null || contactWtih === undefined) {
		respond.json({ status: 400, msg: "Missing contactWtih" });
		return;
	}

	db.execute({
		sql: "INSERT INTO `records` (`name`, `temperature`, `symptoms`, `contactWith`) VALUES (?, ?, ?, ?)",
		args: [name, temperature, symptoms, contactWtih],
	}).then((results) => {
		if (results.rowsAffected == 0) {
			respond.json({ status: 500, msg: "Internal Server Error" });
		} else {
			respond.json({ status: 200, msg: "OK" });
		}
	});
}

function getRecords(request, respond) {
	db.execute({
		sql: "SELECT * FROM `records`",
		args: [],
	}).then((results) => {
		respond.json(results.rows);
	});
}

module.exports = {
	setRecord,
	getRecords,
};
