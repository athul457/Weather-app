const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    default: "admin",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return bcrypt.hash(enterdPassword, this.password);
};

userSchema.methods.generatePassword = function () {
  return jwt.sign(
    {
      user_id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.SECRETE_ACCESS_KEY,
    { expiresIn: "1d" }
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
