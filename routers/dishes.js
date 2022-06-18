const express = require("express");
const session = require("express-session");
const flash = require("express-flash");

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

dishes.use(express.urlencoded({ extended: false }));
dishes.use(flash());
dishes.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // dont save if nothing in de session has change
    saveUninitialized: false, // don't save an empty value
  })
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

// add-dish page
dishes.get("/add-dish", checkNotAuthenticated, (req, res) => {
  res.render("pages/add-dish");
});

// add-dish post into mongoDB
dishes.post("/add-dish", upload.single("uploadImage"), async (req, res) => {
  // NEW
  // using try & catch for things that could potentially throw an error
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
    // console log will return the insertedId
    // console.log("newDish", newDish);
    const insertedId = newDish.insertedId;
    // using ``, because then I can use the ${} to insert variables (template literals)
    res.redirect(`/dishes/${insertedId}`);
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    res.render("pages/add-dish", { error: err.message });
  }
});

// dish-details page
// dishId has the same Id as insertedId from line 79, because that's where you go redirected
dishes.get("/:dishId", async (req, res) => {
  const urlId = req.params.dishId;
  // a query will basically filter the information you're looking for
  // we need to convert the urlId from "string" to (a new variable) objectId
  // source: https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // making sure that when you click on a dish, it will console.log the dish

  res.render("pages/dish-details", {
    // variables in the front-end
    dish,
  });
});

// dish details edit page
dishes.get("/edit/:dishId", async (req, res) => {
  const urlId = req.params.dishId;
  console.log("urlId", urlId);
  // a query will basically filter the information you're looking for
  // we need to convert the urlId from "string" to (a new variable) objectId
  // source: https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // making sure that when you click on a dish, it will console.log the dish

  res.render("pages/edit-dish", {
    // variables in the front-end
    dish,
  });
});

dishes.post("/edit/:dishId", upload.single("uploadImage"), async (req, res) => {
  const urlId = req.params.dishId;
  console.log("urlId", urlId);
  // a query will basically filter the information you're looking for
  // we need to convert the urlId from "string" to (a new variable) objectId
  // source: https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // using try & catch for things that could potentially throw an error
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
    // using ``, because then I can use the ${} to insert variables (template literals)
    res.redirect(`/dishes/${urlId}`);
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    res.render("pages/edit-dish", { error: err.message, dish });
  }
});

dishes.delete("/delete/:dishId", async (req, res) => {
  const urlId = req.params.dishId;
  // using try & catch for things that could potentially throw an error
  try {
    // a query will basically filter the information you're looking for
    // we need to convert the urlId from "string" to (a new variable) objectId
    // source: https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
    const query = { _id: new ObjectId(urlId) };
    await dishesCollection.deleteOne(query);
    // if deleteOne sends the response of "OK" then the brower knows it can redirect
    res.send(`OK`);
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    // res.render("pages/edit-dish", { error: err.message, dish });
    res.status(400).send(err.message);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dishes/add-dish");
  }
  next();
}

module.exports = dishes;
