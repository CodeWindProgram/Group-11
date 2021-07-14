const jwt = require("jsonwebtoken");
require("dotenv").config();


function jwtGenerator(sid){
    const payload = {
        student: sid
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;