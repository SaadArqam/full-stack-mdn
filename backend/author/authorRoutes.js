const express = require("express");
const route = express.Router();
const { addAuthor, showAuthor } = require("./authorC    ontroller");

route.post("/add", addAuthor);
route.get("/", showAuthor);

module.exports = route;
