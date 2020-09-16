const express = require("express");
const router = express.Router();
// const { userSignupValidator } = require("../validator/index");
const { createProduct } = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById, productById } = require("../controllers/params");
const { readProduct } = require("../controllers/product");

router.post("/products/create/:userId", requireSignin, isAdmin, isAuth, createProduct);
router.get("/products/:product_id", readProduct);

router.param("userId", userById);
router.param("product_id", productById);
module.exports = router;
