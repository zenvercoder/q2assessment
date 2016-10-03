require("dotenv").load();

var configuration = {
    client: "pg",
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
};

module.exports = require("knex")(configuration);

