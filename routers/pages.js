const express = require("express");
const { ObjectId } = require("mongodb");

const app = express.Router();
const checkAuthenticated = require("../controller/authenticate");

// HOME
app.get("/", async (req, res) => {
  res.render("pages/home");
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
        // variables in the front-end
        numberOfDishes: myDishes.length,
        myDishes,
        user,
      });
    });
  }
});

app.get("/add-dishes", checkAuthenticated, (req, res) => {
  res.render("pages/add-dish");
});

// dish-details page
app.get("/dish/:dishId", checkAuthenticated, async (req, res) => {
  const urlId = req.params.dishId;
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // making sure that when you click on a dish, it will console.log the dish

  res.render("pages/dish-details", {
    // variables in the front-end
    dish,
  });
});

app.get("/favorite-dishes", checkAuthenticated, async (req, res) => {
  const myDishes = await dishesCollection
    .find({
      like: true,
    })
    .toArray();

  res.render("pages/favo-dish", { myDishes });
});

// dish details edit page
app.get("/edit-dish/:dishId", checkAuthenticated, async (req, res) => {
  const urlId = req.params.dishId;
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);

  res.render("pages/edit-dish", {
    dish,
  });
});

// USER ROUTES
app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.get("/profile", checkAuthenticated, async (req, res) => {
  const sessionUser = req.session.passport.user;
  const query = { _id: ObjectId(sessionUser) };
  const user = await userCollection.findOne(query);
  res.render("pages/userprofile", { user});
});

app.get("/edit-profile", async (req, res) => {
  const sessionUser = req.session.passport.user;
  const query = { _id: ObjectId(sessionUser) };
  const user = await userCollection.findOne(query);

  res.render("pages/edit-profile", { user });
});

app.get("/login", (req, res) => {
  res.render("pages/login");
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
