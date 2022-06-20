const bcrypt = require("bcrypt");

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
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
};

module.exports = {register};
