const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

// db

mongoose
  .connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(console.log("MongoDB Connected..."))
  .catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("If she sees my stscks");
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
