const express = require("express");
const connectDB = require("../config/db");

const profile = express.Router();

connectDB();


// Profile VOORDBEELD
profile.get("/", (req, res) => {
  res.render("pages/register");
});

module.exports = profile;
