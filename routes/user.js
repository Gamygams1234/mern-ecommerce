const express = require("express");
const router = express.Router();
const { userSignupValidator, userSignInValidator } = require("../validator/index");

const { signUp, signIn } = require("../controllers/user");
// create method

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", userSignInValidator, signIn);

module.exports = router;
