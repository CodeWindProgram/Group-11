const express = require("express");
const app = express();
const cors = require("cors");

// middleware

app.use(express.json());
app.use(cors());

// Routes

//Registation &  Login

app.use("/auth", require("./routes/studentAuth"));

app.listen(5000, () => {
    console.log("server is running on port 5000");
});