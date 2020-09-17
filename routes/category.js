const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator/index");
const { newCategory, readCategory, updateCategory, deleteCategory, getAllCategories } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById, categoryById } = require("../controllers/params");

router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, newCategory);

router.get("/category/all", getAllCategories);
router.get("/category/:categoryId", readCategory);

router.put("/category/update/:categoryId/:userId", requireSignin, isAuth, isAdmin, updateCategory);
router.delete("/category/delete/:categoryId/:userId", requireSignin, isAuth, isAdmin, deleteCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
