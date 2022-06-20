if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// REQUIRE VARIABLES
const connectDB = require("./config/db");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// const passport = require("passport");

// VARIABLES
const app = express();

// CONFIGURATION
// sets configuration
app.set("view engine", "ejs");
app.set("views", "./views");

// GLOBAL VARIABLES DATABASE - AFTER CLIENT IS CONNECTED
// Variable of the database dish-exchange
let database;
// Variable of dishes collection within dish-exchange
let dishesCollection;
// Variable of users collection within dish-exchange
let userCollection;

// CONNECT DATABASE
connectDB();

// ROUTES
const main = require("./routers/pages");
const user = require("./routers/user");
const profile = require("./routers/profile");
const dishes = require("./routers/dishes");
const favorite = require("./routers/like");

// MIDDLEWARE
app.use(express.static("static"));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
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

app.use("/", main);
app.use("/user/", user);
app.use("/profile/", profile);
app.use("/dishes/", dishes);
app.use("/favorite/", favorite);
app.use((req, res) => {
  res.status(404).send("This page does not exist!");
}); // 404 error pages

// APP LISTENING
app.listen(process.env.PORT || 3000);
