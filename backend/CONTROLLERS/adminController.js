const Admin = require("../MODELS/Admin");
const asyncHandler = require("express-async-handler");

/**
 * @desc    Create a new admin
 * @route   POST /api/v1/admin/register
 * @access  Public
 * @required name, email, password
 */

exports.createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Some Feilds Are Missing");
  }

  const adminExist = await Admin.findOne({ email });

  if (adminExist) {
    res.status(400);
    throw new Error("Admin Already Exist");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    status: "ok",
    message: "New Admin Created Succesfully",
    admin: {
      name: admin.name,
      email: admin.email,
      password: password,
    },
  });
});

/**
 * @desc    login  admin
 * @route   POST /api/v1/admin/login
 * @access  Public
 * @required email, password
 */

exports.loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("email and password required");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(404);
    throw new Error("admin not found");
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect password");
  }

  const token = admin.generateToken();
  res.status(200).json({
    status: "ok",
    message: "Login Succesfull ",
    token,
  });
});

/**
 * @desc    Get current admin profile
 * @route   GET /api/v1/admin/profile
 * @access  Private
 */
exports.getProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (admin) {
    res.status(200).json({
      status: "ok",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        profilePhoto: admin.profilePhoto,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update admin profile
 * @route   PUT /api/v1/admin/profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    
    // If a file is uploaded, use the constructed URL
    if (req.file) {
      admin.profilePhoto = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else {
       // Only update from body if no file uploaded (fallback for URL input if we keep it, 
       // but typically file upload replaces URL string logic)
       admin.profilePhoto = req.body.profilePhoto || admin.profilePhoto;
    }

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    res.status(200).json({
      status: "ok",
      message: "Profile Updated Successfully",
      admin: {
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        profilePhoto: updatedAdmin.profilePhoto,
        token: admin.generateToken(),
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
