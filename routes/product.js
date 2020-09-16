const express = require("express");
const router = express.Router();
// const { userSignupValidator } = require("../validator/index");
const { createProduct, productById } = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById } = require("../controllers/user");

router.post("/products/create/:userId", requireSignin, isAdmin, isAuth, createProduct);
router.get("/products/:product_id", productById);

router.param("userId", userById);

module.exports = router;
