const express = require("express");

const main = express.Router();


// homepage
main.get("/", async (req, res) => {
  res.render("pages/home");
});

module.exports = main;
