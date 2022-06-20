const express = require("express");

const app = express.Router();

// Profile VOORDBEELD
app.get("/", (req, res) => {
  res.render("pages/register");
});

module.exports = app;
