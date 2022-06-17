const express = require("express");

const profile = express.Router();

// Profile VOORDBEELD
profile.get("/", (req, res) => {
  res.render("pages/register");
});

module.exports = profile;
