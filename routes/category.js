const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator/index");
const { newCategory, readCategory } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById, categoryById } = require("../controllers/params");

router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, newCategory);
router.get("/category/:categoryId", readCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
