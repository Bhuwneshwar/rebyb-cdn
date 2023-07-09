const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>RebyB cdn<h1>");
});

const port = process.env.PORT || 5005

app.listen(port, (s) => {
  console.log("server started on http://localhost:"+port);
});
