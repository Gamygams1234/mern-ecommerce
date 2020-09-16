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
