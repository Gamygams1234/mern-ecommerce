const express = require("express");
const router = express.Router();
const { userSignupValidator, userSignInValidator } = require("../validator/index");

const { signUp, signIn, signOut, requireSignin } = require("../controllers/user");
// create method

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", userSignInValidator, signIn);
router.get("/signout", signOut);
router.get("/hello", requireSignin, (req, res) => {
  res.send("<h1>hello</h1>");
});

module.exports = router;
