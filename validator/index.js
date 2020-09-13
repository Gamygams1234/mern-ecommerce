exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be an email format.")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must be a valid email format containing an @.")
    .isLength({
      min: 4,
    });
  req.check("password", "Password is required").notEmpty();
  req.check("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters").matches(/\d/).withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // this will move to the next phase regardless of pass ofr fali
  next();
};
