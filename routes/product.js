const express = require("express");
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById, productById } = require("../controllers/params");
const { readProduct, deleteProduct, editProduct, listProducts, createProduct, relatedProducts, categoriesWithProducts, searchProducts, productPhoto, listSearch } = require("../controllers/product");

router.post("/products/create/:user_id", requireSignin, createProduct);
router.post("/products/by/search", searchProducts);

router.delete("/products/delete/:product_id/:user_id", requireSignin, isAdmin, isAuth, deleteProduct);

router.put("/products/update/:product_id/:user_id", requireSignin, isAdmin, isAuth, editProduct);

router.get("/products", listProducts);
router.post("/products/search", listSearch);
router.get("/products/photo/:product_id", productById, productPhoto);
router.get("/products/categories", categoriesWithProducts);
router.get("/products/related/:product_id", productById, relatedProducts);
router.get("/products/:product_id", productById, readProduct);

router.param("user_id", userById);
router.param("product_id", productById);
module.exports = router;
