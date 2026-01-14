// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const errorHandler = require("./MIDDLEWARES/errorHandler");
// const adminRoute = require("./ROUTES/adminRoute");
// const app = express();

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());

// // admin
// app.use("/api/v1/admin", adminRoute);
// app.use("/uploads", express.static("uploads"));

// app.use(errorHandler);
// module.exports = app;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./MIDDLEWARES/errorHandler");
const adminRoute = require("./ROUTES/adminRoute");

const app = express();

app.use(
  cors({
    origin: "https://kaalavastha-app.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());

// admin routes
app.use("/api/v1/admin", adminRoute);

// static uploads
app.use("/uploads", express.static("uploads"));

// error handler (keep LAST)
app.use(errorHandler);

module.exports = app;
