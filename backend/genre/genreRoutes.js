const express = require("express");
const route = express.Router();
const { addGenre, showGenre } = require("./genreController");

route.post("/add", addGenre);
route.get("/", showGenre);

module.exports = route;
