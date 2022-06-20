const express = require("express");

const app = express.Router();
const user = require("../controller/user");

app.post("/edit", user.edit); 
app.delete("/delete", user.deleteOne); 

module.exports = app;
