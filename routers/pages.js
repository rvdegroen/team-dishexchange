const express = require("express");
const { ObjectId } = require("mongodb");

const app = express.Router();
const checkAuthenticated = require("../controller/authenticate");

// HOME
app.get("/", async (req, res) => {
  try {
    res.render("pages/home");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DISHES ROUTES
app.get("/dishes-overview", checkAuthenticated, async (req, res) => {
  const sessionUser = req.session.passport.user;

  const user = await userCollection.findOne({ _id: ObjectId(sessionUser) }, {});
  if (user.mydish) {
    const items = user.mydish.map((item) =>
      dishesCollection.find({ _id: new ObjectId(item) }, {}).toArray()
    );

    Promise.all(items).then((data) => {
      const myDishes = data.flat(); // squeeze multiple array

      res.render("pages/dishes", {
        numberOfDishes: myDishes.length,
        myDishes,
        user,
      });
    });
  }
});

app.get("/add-dishes", checkAuthenticated, (req, res) => {
  try {
    res.render("pages/add-dish");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// dish-details page
app.get("/dish/:dishId", checkAuthenticated, async (req, res) => {
  try {
    const urlId = req.params.dishId;
    const query = { _id: new ObjectId(urlId) };
    const dish = await dishesCollection.findOne(query);

    res.render("pages/dish-details", {
      dish,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// dish details edit page
app.get("/edit-dish/:dishId", async (req, res) => {
  const query = { _id: new ObjectId(req.params.dishId) };
  const dish = await dishesCollection.findOne(query);

  res.render("pages/edit-dish", {
    dish,
  });
});

app.get("/favorite-dishes", checkAuthenticated, async (req, res) => {
  const sessionUser = req.session.passport.user;

  const user = await userCollection.findOne({ _id: ObjectId(sessionUser) }, {});
  if (user.mydish) {
    const items = user.mydish.map((item) =>
      dishesCollection.find({ _id: new ObjectId(item), like: true }, {}).toArray()
    );

    Promise.all(items).then((data) => {
      const myDishes = data.flat(); // squeeze multiple array

      res.render("pages/favo-dish", {
        myDishes,
      });
    });
  }
});

// USER ROUTES
app.get("/register", (req, res) => {
  try {
    res.render("pages/register");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", checkAuthenticated, async (req, res) => {
  const sessionUser = req.session.passport.user;
  const query = { _id: ObjectId(sessionUser) };
  const user = await userCollection.findOne(query);
  res.render("pages/userprofile", { user });
});

app.get("/edit-profile", async (req, res) => {
  const sessionUser = req.session.passport.user;
  const query = { _id: ObjectId(sessionUser) };
  const user = await userCollection.findOne(query);

  res.render("pages/edit-profile", { user });
});

app.get("/login", (req, res) => {
  try {
    res.render("pages/login");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = app;
