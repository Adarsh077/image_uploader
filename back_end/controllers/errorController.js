const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const errors = {};

  const duplicateFields = Object.keys(err.keyPattern);
  duplicateFields.forEach((field) => {
    errors[field] = `This ${field} is already taken.`;
  });

  return new AppError(JSON.stringify(errors), 400);
};

const handleValidationErrorDB = (err) => {
  const errors = {};

  const errorFields = Object.keys(err.errors);
  errorFields.forEach((field) => {
    errors[field] = err.errors[field].properties.message;
  });

  return new AppError(JSON.stringify(errors), 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    config: err,
    err: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  // eslint-disable-next-line no-console
  console.error("ERROR 💥", err);

  // 2) Send generic message
  return res.status(err.statusCode).json({
    status: "error",
    err: "Something went wrong!",
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorProd(err, req, res);
  }
};
