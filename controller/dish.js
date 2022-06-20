const { ObjectId } = require("mongodb");
const passport = require("passport");
// add-dish post into mongoDB
const add = async (req, res) => {
  const sessionUser = req.session.passport.user;

  try {
    const newDish = await dishesCollection.insertOne({
      name: req.body.dishName,
      quality: req.body.dishQuality,
      ingredients: req.body.ingredients.split(","),
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags],
      // it doesn't comes back as undefined if it doesn't exist
      img: req?.file?.filename,
      like: false,
    });

    const insertedId = newDish.insertedId;
    console.log(insertedId);
    await userCollection.updateOne(
      { _id: ObjectId(sessionUser) },
      { $push: { mydish: insertedId } }
    );
    res.redirect(`/dish/${insertedId}`);
  } catch (err) {
    res.render("/add-dishes", { error: err.message });
  }
};

const edit = async (req, res) => {
  const query = { _id: new ObjectId(req.params.dishId) };
  const dish = await dishesCollection.findOne(query);

  try {
    await dishesCollection.updateOne(query, {
      $set: {
        name: req.body.dishName,
        quality: req.body.dishQuality,
        ingredients: req.body.ingredients.split(","),
        tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags],
        // it doesn't comes back as undefined if it doesn't exist
        img: req?.file?.filename,
      },
    });
    res.redirect(`/dish/${req.params.dishId}`);
  } catch (err) {
    res.render("pages/edit-dish", { error: err.message, dish });
  }
};

const deleteOne = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.body.delete) };
    await dishesCollection.deleteOne(query);

    res.redirect("/dishes-overview");
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { add, edit, deleteOne };
