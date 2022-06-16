const express = require("express");
const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

const favorite = express.Router();

connectDB();

// favorite dish page
favorite.get("/dishes", async (req, res) => {
  const myFavoriteDishes = await dishesCollection
    .find({
      like: true,
    })
    .toArray();

  console.log(myFavoriteDishes);
  res.render("pages/favo-dish", { myFavoriteDishes });
});

favorite.post("/dishes", async (req, res) => {
  const myFavoriteDishes = await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: { like: true },
    }
  );

  console.log(myFavoriteDishes);
  res.redirect("/favorite/dishes");
});

module.exports = favorite;
