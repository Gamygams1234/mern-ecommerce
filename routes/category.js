const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator/index");
const { newCategory } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/checks");
const { userById } = require("../controllers/user");

router.post("/create-category/:userId", requireSignin, isAdmin, isAuth, newCategory);

router.param("userId", userById);

module.exports = router;
