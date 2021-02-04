const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

/* MIDDLEWARES 👇 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * We are sending image as base64 in [req.body] which is of json type
 * and express sets the size limit for json data
 * so in next line we are increasing it to 2MB
 *
 * Checkout https://stackoverflow.com/a/19965089/11288006 for more info
 */
app.use(express.json({ limit: "2mb" }));
app.use(cors());

/* Routes 🎯 */
app.use("/", require("./routes"));

app.all("*", (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/* Error handling 💥 */
app.use(globalErrorHandler);

module.exports = app;
