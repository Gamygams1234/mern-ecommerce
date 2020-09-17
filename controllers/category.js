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

exports.updateCategory = (req, res) => {
  const { name } = req.body;
  console.log(name);
  let category = req.category;
  category.name = name;
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

exports.deleteCategory = (req, res) => {
  const category = req.category;
  if (!category) {
    return res.status(400).json({
      error: "Product not found",
    });
  }
  category.remove();
  return res.json({ msg: `The Category was removed` });
};

// this is to show all the categories
exports.getAllCategories = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
