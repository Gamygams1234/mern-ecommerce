const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
// making sure we can get our dot env file

const fs = require("fs");
const formidable = require("formidable");

require("dotenv").config();

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

exports.productById = async (req, res) => {
  console.log(req.params.product_id);
  Product.findById(req.params.product_id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    res.json(product);
    next();
  });
};
