const express = require("express");
const { ObjectId } = require("mongodb");

const dishes = express.Router();
const multer = require("multer");
const passport = require("passport");
const initializePassport = require("../config/passport-config");

// INCLUDED IN NODEJS
const path = require("path");

initializePassport(
  passport,
  (email) => user.find((user) => user.email === email),
  (_id) => user.find((user) => user._id === _id)
);

dishes.use(passport.initialize());
dishes.use(passport.session());

// MIDDLEWARE MULTER | source: https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer/39650303#39650303
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./static/images/uploads/");
  },
  filename(_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// add-dish post into mongoDB
dishes.post("/add-dish", upload.single("uploadImage"), async (req, res) => {
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
});

dishes.post("/edit-dish/:dishId", upload.single("uploadImage"), async (req, res) => {
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
});

dishes.delete("/delete/:dishId", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.dishId) };
    await dishesCollection.deleteOne(query);
    // if deleteOne sends the response of "OK" then the brower knows it can redirect
    res.send(`OK`);
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    res.status(400).send(err.message);
  }
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dishes/add-dish");
  }
  next();
}

module.exports = dishes;
