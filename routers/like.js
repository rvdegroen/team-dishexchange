const express = require("express");

const { ObjectId } = require("mongodb");

const favorite = express.Router();



favorite.post("/dishes", async (req, res) => {
  const myFavoriteDishes = await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: { like: true },
    }
  );

  res.redirect("/favorite/dishes");
});

module.exports = favorite;
