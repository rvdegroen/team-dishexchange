const express = require("express");

const app = express.Router();

// Profile VOORBEELD
app.get("/", (req, res) => {
  try {
  res.render("pages/register");
  console.log('Register page error handling works');
  } catch(err) {
  console.log('Did not get register page');
  }
});

module.exports = app;
