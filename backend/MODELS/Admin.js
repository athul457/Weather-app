const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
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
    type: String,
    required: [true, "password is required"],
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "admin",
  },
});

// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (enterdPassword) {
  return bcrypt.compare(enterdPassword, this.password);
};

adminSchema.methods.generateToken = function () {
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

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
