const express = require("express");
const multer = require("multer");
const path = require("path");
const dishes = require("../controller/dish");

const app = express.Router();

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

app.post("/add-dish", upload.single("uploadImage"), dishes.add);
app.post("/edit-dish/:dishId", upload.single("uploadImage"), dishes.edit);
app.delete("/delete", dishes.deleteOne);

module.exports = app;
