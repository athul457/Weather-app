const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE_URL.replace(
      "<db_password>",
      process.env.PASSWORD
    );

    await mongoose.connect(DB);
    console.log("Database Connection Succesfull 😍😍");
  } catch (err) {
    console.error("Database Connection Failed 😔😔");
    process.exit(1);
  }
};

module.exports = connectDB;
