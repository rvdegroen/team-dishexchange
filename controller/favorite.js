const { ObjectId } = require("mongodb");

const like = async (req, res) => {
  try { await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.like),
    },
    {
      $set: { like: true },
    }
  );
  res.redirect("/favorite-dishes");
  console.log('Like error handling works');
  } catch(err) {
  console.log('Error has occured: ' + err);
  }
};

const dislike = async (req, res) => {
  try { await dishesCollection.updateOne(
    {
      _id: ObjectId(req.body.dislike),
    },
    {
      $set: { like: false },
    }
  );
  res.redirect("/dishes-overview");
  console.log('Dislike error handling works');
} catch(err) {
  console.log('Error has occured: ' + err);
  }
};

module.exports = { like, dislike };
