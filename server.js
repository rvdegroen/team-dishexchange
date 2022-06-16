if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// REQUIRE VARIABLES
const connectDB = require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");

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
const main = require("./routers/main");
const register = require("./routers/user");
// const login = require("./routers/login");
const dishes = require("./routers/dishes");

// MIDDLEWARE
// express knows all my static files are in my static folder
app.use(express.static("static"));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// MIDDLEWARE MULTER | source: https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer/39650303#39650303

app.use("/", main);
app.use("/user/", register);
// app.use("/login/", login);
app.use("/dishes/", dishes);

app.use((req, res) => {
  res.status(404).send("This page does not exist!");
}); // 404 error pages

// APP LISTENING
app.listen(process.env.PORT || 3000);
