const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
// making sure we can get our dot env file

const fs = require("fs");
const formidable = require("formidable");
const lodash = require("lodash");
// this is where we are putting all the crud

require("dotenv").config();

//using this function to read with the param
exports.readProduct = (req, res) => {
  // taking out our photo  so we can read the info
  //might send it again
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  if (!product) {
    return res.status(400).json({
      error: "Product not found",
    });
  }
  product.remove();
  return res.json({ msg: "product was removed" });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        // this will immedaiately stop the upload and unleash the error if the file is too big
        return res.status(400).json({
          error: "The photo is too big! Has to be 1mb or less",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(data);
    });
  });
};

exports.editProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // this is the difference between the create and the update
    let product = req.product;
    product = lodash.assign(product, fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        // this will immedaiately stop the upload and unleash the error if the file is too big
        return res.status(400).json({
          error: "The photo is too big! Has to be 1mb or less",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json(data);
    });
  });
};

exports.listProducts = (req, res) => {
  // setting the values and the default
  console.log(req.query);
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      return res.json(data);
    });
};

exports.relatedProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 3;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(data);
    });
};

exports.categoriesWithProducts = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

exports.searchProducts = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.productPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  let filters = req.body;

  Product.find(filters)
    .select("-photo")
    .populate("category")
    .sort([["_id", "desc"]])

    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.productPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
