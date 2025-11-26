const express = require("express");
const router = express.Router();
const { addBook, showBooks, updateBook, deleteBook } = require("./bookController");

router.post("/add", addBook);
router.get("/", showBooks);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
