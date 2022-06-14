const express = require("express");
const connectDB = require("../config/db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport-config");

const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express.Router();

connectDB();

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // dont save if nothing in de session has change
    saveUninitialized: false, // don't save an empty value
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
// form pages
// REGISTER
app.get("/register", (req, res) => {
  res.render("pages/register");
});

// INSERT USER
app.post("/registerForm", checkNotAuthenticated, async (req, res) => {
  // await user.insertOne({
  //   name: req.body.name,
  //   country: req.body.country,
  //   city: req.body.city,
  //   phone: req.body.phonenumber,
  //   dob: req.body.dob,
  //   email: req.body.email,
  //   username: req.body.username,
  //   password: hashedPassword,
  //   mydish: [],
  // });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
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

  console.log(users);

  // res.redirect("/dishes/overview");
});

// LOGIN
app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post(
  "/loginForm",
  passport.authenticate("local", {
    successRedirect: "/user/overview",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

app.delete("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/overview", checkAuthenticated, async (req, res) => {
  // I want to retrieve data from mongoDB with .find, which returns a cursor
  const cursor = await dishesCollection.find({}, {});

  // I have a cursor but I want my collection with all the dishes documents
  const allDishes = await cursor.toArray();
  // console.log(allDishes);

  res.render("pages/dishes", {
    // variables in the front-end
    numberOfDishes: allDishes.length,
    allDishes,
    name: req.user.name,
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
   res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/overview");
  }
  next();
}

module.exports = app;
