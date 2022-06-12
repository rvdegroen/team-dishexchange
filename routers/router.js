const express = require("express");

const connectDB = require("../config/db");

const { ObjectId } = require("mongodb");

const router = express.Router();

connectDB();

// ROUTES

// homepage
router.get("/", async (req, res) => {
  res.render("pages/home");
});

// form pages
router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/overview", async (req, res) => {
  // I want to retrieve data from mongoDB with .find, which returns a cursor
  const cursor = await dishesCollection.find({}, {});

  // I have a cursor but I want my collection with all the dishes documents
  const allDishes = await cursor.toArray();
  // console.log(allDishes);

  res.render("pages/dishes", {
    // variables in the front-end
    numberOfDishes: allDishes.length,
    allDishes,
  });
});

// add-dish page
router.get("/add-dish", (req, res) => {
  res.render("pages/add-dish");
});

// dish-details page
// dishId has the same Id as insertedId from line 79, because that's where you go redirected
router.get("/dish/:dishId", async (req, res) => {
  const urlId = req.params.dishId;
  console.log("urlId", urlId);
  // a query will basically filter the information you're looking for
  // we need to convert the urlId from "string" to (a new variable) objectId
  // source: https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // making sure that when you click on a dish, it will console.log the dish
  console.log("dish", dish);

  res.render("pages/dish-details", {
    // variables in the front-end
    dish,
  });
});



module.exports = router;
