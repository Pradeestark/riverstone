const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const DB = require("./app/db")
const path = require('path');
global.appRoot = path.resolve(__dirname);
// set port, listen for requests
const PORT = process.env.PORT || 5000;

let corsOptions = {
    origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// heartbeat route
app.get("/ping", (req, res) => {
    res.status(200).send("pong")
});

// routes
app.use("/api", require("./app/routes"));

//initialize database connection
DB.init()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});