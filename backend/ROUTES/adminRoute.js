const express = require("express");
const adminRoute = express.Router();
const adminController = require("../CONTROLLERS/adminController");
const { protect } = require("../MIDDLEWARES/authMiddleware");
const upload = require("../MIDDLEWARES/uploadMiddleware");

// Register user

adminRoute.route("/register").post(adminController.createAdmin);
adminRoute.route("/login").post(adminController.loginAdmin);

adminRoute
  .route("/profile")
  .get(protect, adminController.getProfile)
  .put(protect, upload.single("profilePhoto"), adminController.updateProfile);

module.exports = adminRoute;
