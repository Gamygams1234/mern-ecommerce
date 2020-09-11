const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/user");
// create method

router.post("/signUp", signUp);

module.exports = router;
