const express = require("express");
const router = express.Router();
const { userSignupValidator, userSignInValidator } = require("../validator/index");

const { signUp, signIn, signOut, requireSignin } = require("../controllers/auth");
// create method

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", userSignInValidator, signIn);
router.get("/signout", signOut);

module.exports = router;
