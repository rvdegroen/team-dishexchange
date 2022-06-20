const express = require("express");
const favorite = require("../controller/favorite");

const app = express.Router();

app.post("/like", favorite.like);
app.post("/dislike", favorite.dislike);

module.exports = app;
