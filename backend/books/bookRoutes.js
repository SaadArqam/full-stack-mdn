const express = require("express");
const route = express.Router();
const { addBook, showBook, updateBook, deleteBook} = require("./bookController");

route.post("/add", addBook);
route.get("/", showBook);
route.get("/update", updateBook);
route.get("/delete", deleteBook);

module.exports = route;
