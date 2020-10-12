const User = require("../models/user");

const jwt = require("jsonwebtoken");

// making sure we can get our dot env file
require("dotenv").config();

// making the new user
exports.signUp = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Email is taken",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    // creating authentication for the user when they sign up
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 99999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

// signing user in
exports.signIn = (req, res) => {
  // checking for the two fields
  const { email, password } = req.body;
  // finding user by email
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "Invalid credentials",
      });
    }
    // check for user and password
    if (!user.authenticate(password)) {
      return res.status(400).json({
        err: "Invalid credentials",
      });
    }
    // create authencications
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // 24 ours til the token expires
    res.cookie("t", token, { expire: new Date() + 86400 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Success" });
};
