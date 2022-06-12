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

// INSERT USER
form.post('/register', async (req, res) => {
		await users.insertOne({
			name: req.body.name,
			country: req.body.country,
			city: req.body.city,
			phone: req.body.phonenumber,
			dob: req.body.dob,
      email: req.body.email,
			username: req.body.username,
			password: req.body.psw,
		});
	})

module.exports = form;
