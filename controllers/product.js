const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
// making sure we can get our dot env file
require("dotenv").config();

exports.createProduct = (req, res) => {
  console.log("req.body", req.body);
  const product = new Product(req.body);
  product.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    res.json({ data });
  });
};
