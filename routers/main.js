const express = require("express");

const connectDB = require("../config/db");

const main = express.Router();

connectDB();

// homepage
main.get("/", async (req, res) => {
  res.render("pages/home");
});

module.exports = main;
