const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "pvpp@1234",
    host: "localhost",
    post: 5432,
    database: "student"
}
);

module.exports = pool;