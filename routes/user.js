const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator/index");

const { signUp } = require("../controllers/user");
// create method

router.post("/signUp", userSignupValidator, signUp);

module.exports = router;
