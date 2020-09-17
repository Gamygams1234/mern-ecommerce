const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.userById = (req, res, next, _id) => {
  User.findById(_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};
exports.categoryById = (req, res, next, _id) => {
  Category.findById(_id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = category;
    next();
  });
};
