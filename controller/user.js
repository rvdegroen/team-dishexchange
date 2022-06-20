const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

// INSERT USER
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await userCollection.insertOne({
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phonenumber,
      dob: req.body.dob,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      mydish: [],
    });
    res.redirect("/register");
  } catch {
    res.status(400).send(err.message);
  }
};

// EDIT USER
const edit = async (req, res) => {
  try {
    await userCollection.updateOne(
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
          name: req.body.name,
        },
      }
    );
    res.redirect("/profile");
  } catch {
    res.status(400).send(err.message);
  }
};

// DELETE USER
const deleteOne = async (req, res) => {
  try {
    const sessionUser = req.session.passport.user;
    const query = { _id: new ObjectId(sessionUser) };
    await userCollection.deleteOne(query);

    res.redirect("/login");
    // if something goes wrong then it will stop the code in try and go to catch to show the error on the add-dish page
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { register, edit, deleteOne };
