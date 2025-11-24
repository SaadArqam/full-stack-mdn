const express = require("express");
const route = express.Router();
const { addBook, showBook, updateBook } = require("./bookController");

route.post("/add", addBook);
route.get("/", showBook);
route.get("/update", updateBook);

module.exports = route;
