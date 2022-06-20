const { ObjectId } = require("mongodb");

const like = async (req, res) => {
  try {
    await dishesCollection.updateOne(
      {
        _id: ObjectId(req.body.like),
      },
      {
        $set: { like: true },
      }
    );
    res.redirect("/favorite-dishes");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const dislike = async (req, res) => {
  try {
    await dishesCollection.updateOne(
      {
        _id: ObjectId(req.body.dislike),
      },
      {
        $set: { like: false },
      }
    );
    res.redirect("/dishes-overview");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { like, dislike };
