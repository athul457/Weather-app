const app = require("./app");
const connectDB = require("./CONFIG/configDB");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3213;

const startDB = async () => {
  await connectDB();
  app.listen(PORT, console.log(`Database Running In Port Number ${PORT} 🚀🚀`));
};

startDB();
