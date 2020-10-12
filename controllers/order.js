const Order = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
exports.create = (req, res) => {
  const order = new Order(req.body);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort({ createdAt: -1 })
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};
