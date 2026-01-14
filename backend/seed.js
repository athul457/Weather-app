const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

// const connectDB = require("./CONFIG/configDB");
const Admin = require("./MODELS/Admin");
const users = require("./DATA/user");

const seedAdmins = async () => {
  try {
    const DB = process.env.DATABASE_URL.replace(
      "<db_password>",
      process.env.PASSWORD
    );
    await mongoose.connect(DB);
    console.log("✅ MongoDB Connected");

    await Admin.deleteMany();

    await Admin.insertMany(users);

    console.log("data seeded");
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

seedAdmins();

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Admin = require("./MODELS/Admin");
// const users = require("./DATA/user");

// // 1️⃣ Load env FIRST
// dotenv.config({ path: "./config.env" });

// // 2️⃣ Safety check
// if (!process.env.DATABASE || !process.env.PASSWORD) {
//   console.error("❌ Environment variables not loaded");
//   process.exit(1);
// }

// const seedAdmins = async () => {
//   try {
//     const DB = process.env.DATABASE.replace(
//       "<db_password>",
//       process.env.PASSWORD
//     );

//     await mongoose.connect(DB);
//     console.log("✅ MongoDB Connected");

//     await Admin.deleteMany();
//     await Admin.insertMany(users);

//     console.log("✅ Data seeded successfully");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Seeding failed:", err.message);
//     process.exit(1);
//   }
// };

// seedAdmins();
