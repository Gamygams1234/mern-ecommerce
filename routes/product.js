const express = require("express");
const router = express.Router();
// const { userSignupValidator } = require("../validator/index");

const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById, productById } = require("../controllers/params");
const { readProduct, deleteProduct, editProduct, listProducts, createProduct, relatedProducts } = require("../controllers/product");

router.post("/products/create/:userId", requireSignin, createProduct);

router.delete("/products/delete/:product_id/:userId", requireSignin, isAdmin, isAuth, deleteProduct);

router.put("/products/update/:product_id/:userId", requireSignin, isAdmin, isAuth, editProduct);

router.get("/products", listProducts);
router.get("/products/related/:product_id", productById, relatedProducts);
router.get("/products/:product_id", readProduct);

router.param("userId", userById);
router.param("product_id", productById);
module.exports = router;
