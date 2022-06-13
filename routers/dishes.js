const express = require("express");

const connectDB = require("../config/db");

const { ObjectId } = require("mongodb");

const dishes = express.Router();

connectDB();

dishes.get("/overview", async (req, res) => {   
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
dishes.get("/add-dish", (req, res) => {
  res.render("pages/add-dish");
});

// add-dish post into mongoDB
dishes.post("/add-dish", async (req, res) => {
  const newDish = await dishesCollection.insertOne({
    name: req.body.dishName,
    quality: req.body.dishQuality,
    ingredients: req.body.ingredients.split(","),
    tags: req.body.tags,
    img: "test.jpeg",
  });

  // console log will return the insertedId
  // console.log("newDish", newDish);
  const insertedId = newDish.insertedId;
  // using ``, because then I can use the ${} to insert variables (template literals)
  res.redirect(`/dish/${insertedId}`);
});


// dish-details page
// dishId has the same Id as insertedId from line 79, because that's where you go redirected
dishes.get("/:dishId", async (req, res) => {
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

module.exports = dishes ;