const { isEmail } = require("validator").default;
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const validateLogin = catchAsync(async (req, _, next) => {
  const data = req.query;
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) throw new AppError(errors, 400);

  next();
});

module.exports = validateLogin;
