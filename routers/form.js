const express = require("express");

const connectDB = require("../config/db");

const form = express.Router();

connectDB();

// add-dish post into mongoDB
form.post("/add-dish", async (req, res) => {
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

module.exports = form;