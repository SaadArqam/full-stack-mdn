const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));

app.use(express.json());

app.use("/book", require("./books/bookRoutes"));
app.use("/author", require("./author/authorRoutes"));
app.use("/genre", require("./genre/genreRoutes"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
