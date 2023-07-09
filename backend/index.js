const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>RebyB cdn<h1>");
});

const api = require("./routes/Api");
app.use("/api", api);

const port = process.env.PORT || 5005;

app.listen(port, (s) => {
  console.log("server started on http://localhost:" + port);
});
