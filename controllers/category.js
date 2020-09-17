const Category = require("../models/category");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
// making sure we can get our dot env file
require("dotenv").config();

exports.newCategory = (req, res) => {
  console.log("req.body", req.body);
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

exports.readCategory = (req, res) => {
  return res.json(req.category);
};
