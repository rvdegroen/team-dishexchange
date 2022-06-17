const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { ObjectId } = require("mongodb");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const initializePassport = require("../config/passport-config");

const app = express.Router();

initializePassport(
  passport,
  (email) => user.find((user) => user.email === email),
  (_id) => user.find((user) => user._id === _id)
);

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
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/overview", checkAuthenticated, async (req, res) => {
  req.user.then(async (value) => {
    // I want to retrieve data from mongoDB with .find, which returns a cursor
    // const dish = await dishesCollection.find({}, {});

    const dishes = await userCollection.findOne({ _id: value._id }, {});
    // console.log(dishes.mydish);

    if (dishes.mydish) {
      const items = dishes.mydish.map((item) =>
        dishesCollection.find({ _id: new ObjectId(item) }, {}).toArray()
      );

      Promise.all(items).then((data) => {
        const myDishes = data.flat(); // squeeze multiple array

        res.render("pages/dishes", {
          // variables in the front-end
          numberOfDishes: myDishes.length,
          myDishes,
          user: value,
        });
      });
    }
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
