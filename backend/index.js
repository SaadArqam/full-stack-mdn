const express = require("express");
const app = express();
const cors=require('cors')

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));
require("dotenv").config();
const bookRoutes = require("./books/bookRoutes");
const authorRoutes = require("./author/authorRoutes");
const genreRoutes = require("./genre/genreRoutes");
app.use(express.json());
app.use("/book", bookRoutes);
app.use("/author", authorRoutes);
app.use("/genre", genreRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("server running!!!");
});
