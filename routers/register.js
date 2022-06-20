const express = require("express");
const user = require("../controller/user");

const app = express.Router();

// INSERT USER
app.post("/", user.register);



function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dishes-overview");
  }
  next();
}

module.exports = app;