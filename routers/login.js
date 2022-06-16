const express = require("express");
// const connectDB = require("../config/db");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const initializePassport = require("../config/passport-config");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);
const users = require("./users");
 

const user = express.Router();
// let userCollection;


user.use(express.urlencoded({ extended: false }));
user.use(flash());
user.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // dont save if nothing in de session has change
    saveUninitialized: false, // don't save an empty value
  })
);
user.use(passport.initialize());
user.use(passport.session());
user.use(methodOverride("_method"));
// LOGIN
user.get("/", (req, res) => {
  res.render("pages/login");
});

user.post(
  "/form",
  passport.authenticate("local", {
    successRedirect: "/user/overview",
    failureRedirect: "/login/",
    failureFlash: true,
  })
);



user.delete("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = user;