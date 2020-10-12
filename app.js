const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// this is ggetting the user routes

const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const braintreeRoute = require("./routes/braintree");
const orderRoute = require("./routes/order");
const { requireSignin } = require("./controllers/checks");
const cors = require("cors");

const app = express();

require("dotenv").config();

// db

mongoose
  .connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(console.log("MongoDB Connected..."))
  .catch((error) => {
    console.error(error);
  });

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", braintreeRoute);
app.use("/api", orderRoute);

// serve static assets important for deployment on heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
