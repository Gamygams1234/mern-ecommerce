const express = require("express");
const router = express.Router();

// create method

router.get("/", (req, res) => {
  res.send("Hello Gamy");
});

module.exports = router;
