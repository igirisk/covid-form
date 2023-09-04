const { createClient } = require("@libsql/client");

const config = {
	url: "file:libsql.db",
};

const db = createClient(config);

module.exports = {
	db,
};
