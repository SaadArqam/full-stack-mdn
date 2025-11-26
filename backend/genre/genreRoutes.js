const express = require("express");
const route = express.Router();
const {
  addGenre,
  showGenre,
  deleteGenre,
  updateGenre,
} = require("./genreController");

route.post("/add", addGenre);
route.get("/", showGenre);
route.patch("/update/:genreId", updateGenre);
route.delete("/delete,:genreId", deleteGenre);

module.exports = route;
