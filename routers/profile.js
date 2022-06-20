const express = require("express");

const app = express.Router();

const { ObjectId } = require("mongodb");

app.get("/:userId/", async (req, res) => {
  const query = { _id: ObjectId(req.params.userId) };
  const user = await userCollection.findOne(query);

  console.log(" get /users/:userId/:username ", user);
  res.render("userprofile.ejs", { user });
});

app.get("/:userId/edit", async (req, res) => {
  const query = { _id: ObjectId(req.params.userId) };
  const user = await userCollection.findOne(query);

  console.log(
    " get /users/:userId/:username/edit req.params.userId ",
    req.params.userId
  );
  console.log(" get /users/:userId/:username/edit query ", query);
  console.log(" get /users/:userId/:username/edit user", user);
  res.render("edituserprofile.ejs", { user });
});

app.post("/:userId/edit", async (req, res) => {
  console.log(
    " post /users/:userId/:username/edit req.params.userId",
    req.params.userId
  );

  console.log(req.body);
  const user = await userCollection.updateOne(
    { _id: ObjectId(req.body.userId) },
    {
      $set: {
        _id: ObjectId(req.body.userId),
        country: req.body.country,
        city: req.body.city,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.email,
        username: req.body.username,
      },
    }
  );

  console.log(" post /users/:userId/:username/edit user", user);
  res.render("userprofile.ejs", { user: req.body });
});


module.exports = app;
