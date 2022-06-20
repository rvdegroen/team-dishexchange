const { ObjectId } = require("mongodb");

const like = async (req, res) => {
  await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: { like: true },
    }
  );
  res.redirect("/favorite-dishes");
};

const dislike = async (req, res) => {
  await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.dislike),
    },
    {
      $set: { like: false },
    }
  );

  res.redirect("/dishes-overview");
};

module.exports = { like, dislike };
