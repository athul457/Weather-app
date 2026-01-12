const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./MIDDLEWARES/errorHandler");
const adminRoute = require("./ROUTES/adminRoute");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// admin
app.use("/api/v1/admin", adminRoute);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);
module.exports = app;
