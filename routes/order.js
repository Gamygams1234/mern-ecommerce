const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/checks");

const { userById } = require("../controllers/params");
const { create, listOrders, orderById } = require("../controllers/order");

router.post("/order/create/:userId", requireSignin, isAuth, create);

router.get("/order/list/:userId", requireSignin, isAuth, listOrders);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
