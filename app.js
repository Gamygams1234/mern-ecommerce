const express = require("express");

const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("If she sees my stscks");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
