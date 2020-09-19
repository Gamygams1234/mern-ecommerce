const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    hashed_password: { type: String, required: true },
    about: { type: String, required: false },
    salt: String,
    role: { type: Number, default: 0 },
    history: { type: Array, default: [] },
  },
  { timestamps: true }
);

// virtual field
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  // this will give us the authentication
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  // this will encript our password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      // this is how we encrypt
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    } catch (err) {
      return "";
    }
  },
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
