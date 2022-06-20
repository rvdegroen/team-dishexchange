const express = require("express");
const user = require("../controller/user");

const app = express.Router();

// INSERT USER
app.post("/", user.register);

module.exports = app;