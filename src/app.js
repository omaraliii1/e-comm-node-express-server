const authRoute = require("./routes/auth.routes");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", authRoute);

const server = http.createServer(app);
module.exports = server;
