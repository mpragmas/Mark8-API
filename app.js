const express = require("express");

const globalErrorHandler = require("./controllers/errorController");
const productRouter = require("./routes/productRoutes");
const shopRouter = require("./routes/shopRoutes");
const userRouter = require("./routes/userRoutes");
const storeRouter = require("./routes/storeRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const AppError = require("./utils/appError");
const cors = require("cors");

const app = express();

app.use(express.json());

// Allow requests from frontend (Vite)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/shops", shopRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/category", categoryRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find this ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't in find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next();

  next(new AppError(`Can't in find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrorHandler);

module.exports = app;
