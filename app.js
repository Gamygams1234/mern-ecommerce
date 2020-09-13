const express = require("express");
const mongoose = require("mongoose");
// this is ggetting the user routes
const auth = require("./routes/auth");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

require("dotenv").config();

// db

mongoose
  .connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(console.log("MongoDB Connected..."))
  .catch((error) => {
    console.error(error);
  });
// middleware
//morgan will help with the console log in the terminal
app.use(morgan("dev"));
// body parser helps us parse the data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.get("/", (req, res) => {
  res.send("If she sees my stscks");
});

app.use("/api", auth);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
