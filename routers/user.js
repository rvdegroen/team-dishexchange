const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const app = express.Router();

// INSERT USER
app.post("/registerForm", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await userCollection.insertOne({
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phonenumber,
      dob: req.body.dob,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      mydish: [],
    });
    res.redirect("/user/login");
  } catch {
    res.redirect("/user/register");
  }
});

app.post(
  "/loginForm",
  passport.authenticate("local", {
    successRedirect: "/dishes-overview",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dishes-overview");
  }
  next();
}

module.exports = app;
