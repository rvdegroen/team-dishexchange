const express = require("express");

const connectDB = require("../config/db");

const users = express.Router();

connectDB();

// form pages
users.get("/register", (req, res) => {
  res.render("pages/register");
});

users.get("/login", (req, res) => {
  res.render("pages/login");
});

// INSERT USER
users.post("/register", async (req, res) => {
		await user.insertOne({
			name: req.body.name,
			country: req.body.country,
			city: req.body.city,
			phone: req.body.phonenumber,
			dob: req.body.dob,
            email: req.body.email,
			username: req.body.username,
			password: req.body.psw,
			mydish: [],
		});

		res.redirect('/dishes/overview');
	});

module.exports = users;