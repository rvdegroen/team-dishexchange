// REQUIRE VARIABLES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// VARIABLES
const app = express();
// connection uri to database


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
let user;

// CONNECT DATABASE
connectDB();

// ROUTES
const main = require("./routers/main");
const users = require("./routers/users");
const dishes = require("./routers/dishes");

// MIDDLEWARE
// express knows all my static files are in my static folder
app.use(express.static("static"));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", main);
app.use("/user/", users);
app.use("/dishes/", dishes);

app.use((req, res) => {
  res.status(404).send("This page does not exist!");
}); // 404 error pages

// APP LISTENING
app.listen(process.env.PORT || 3000);
