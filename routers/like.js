const express = require("express");

const { ObjectId } = require("mongodb");

const favorite = express.Router();

favorite.post("/like", async (req, res) => {
  await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: { like: true },
    }
  );
  res.redirect("/favorite-dishes");
});

favorite.post("/dislike", async (req, res) => {
  await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.dislike),
    },
    {
      $set: { like: false },
    }
  );

  res.redirect("/dishes-overview");
});

module.exports = favorite;
