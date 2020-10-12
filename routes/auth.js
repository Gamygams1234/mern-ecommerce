const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator/index");

const { signUp, signIn, signOut } = require("../controllers/auth");

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
