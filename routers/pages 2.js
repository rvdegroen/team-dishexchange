const express = require("express");
const { ObjectId } = require("mongodb");

const app = express.Router();
const checkAuthenticated = require("../controller/authenticate");

// HOME
app.get("/", async (req, res) => {
  try { res.render("pages/home");
  console.log('Homepage error handling works');
  } catch(err) {
  console.log('Did not get homepage');
  }
});

// DISHES ROUTES
app.get("/dishes-overview", checkAuthenticated, async (req, res) => {
  
  const sessionUser = req.session.passport.user;
  console.log(sessionUser);

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
  try {
  res.render("pages/add-dish");
  console.log('Add-dishes page error handling works');
  } catch(err) {
  console.log('Did not get add-dishes page');
  }
});

// dish-details page
app.get("/dish/:dishId", checkAuthenticated, async (req, res) => {
  try {
  const urlId = req.params.dishId;
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);
  // making sure that when you click on a dish, it will console.log the dish

  res.render("pages/dish-details", {
    // variables in the front-end
    dish,
  });
  console.log('Dish-details page error handling works');
  } catch(err) {
  console.log('Did not get dish-details page');
  }
});

app.get("/favorite-dishes", checkAuthenticated, async (req, res) => {
  try {
  const myDishes = await dishesCollection
    .find({
      like: true,
    })
    .toArray();

  res.render("pages/favo-dish", { myDishes });
  console.log('Favo-dish page error handling works');
  } catch(err) {
  console.log('Did not get favo-dish page');
  }
});

// dish details edit page
app.get("/edit-dish/:dishId", checkAuthenticated, async (req, res) => {
  try {
  const urlId = req.params.dishId;
  const query = { _id: new ObjectId(urlId) };
  const dish = await dishesCollection.findOne(query);

  res.render("pages/edit-dish", {
    dish,
  });
  console.log('Edit-dish page error handling works');
  } catch(err) {
  console.log('Did not get edit-dish page');
  }
});

// USER ROUTES
app.get("/register", (req, res) => {
  try {
  res.status(error);
  res.render("pages/register");
  console.log('Register page error handling works');
  } catch(err) {
  console.log('Did not get register page');
  }
});

app.get("/profile", checkAuthenticated, (req, res) => {
  try {
  res.render("pages/register");
  console.log('Profile page error handling works');
  } catch(err) {
  console.log('Did not get profile page');
  }
});

app.get("/login", (req, res) => {
  try {
  res.render("pages/login");
  console.log('Login page error handling works');
  } catch(err) {
  console.log('Did not get login page');
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
