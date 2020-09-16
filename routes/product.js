const express = require("express");
const router = express.Router();
// const { userSignupValidator } = require("../validator/index");
const { createProduct } = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, createProduct);

router.param("userId", userById);

module.exports = router;
