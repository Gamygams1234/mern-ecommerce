const mongoose = require("mongoose");
const crypto = require("crypto");
const { stringify } = require("querystring");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    hashed_password: { type: String, required: true },
    about: { type: String, required: true },
    salt: String,
    role: { type: Number, default: 0 },
    history: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
