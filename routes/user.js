const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/checks");
const { readProfile, editProfile } = require("../controllers/user");
const { userById } = require("../controllers/params");
// create method

// putting our middleware to check if it is admin and if it is authenicated
router.get("/secret/:user_id", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/user/:user_id", requireSignin, isAuth, readProfile);
router.put("/user/:user_id", requireSignin, isAuth, editProfile);

router.param("user_id", userById);

module.exports = router;
