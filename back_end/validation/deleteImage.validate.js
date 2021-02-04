const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const validateDeleteImage = catchAsync(async (req, _, next) => {
  const data = req.query;
  const errors = {};

  if (!data.imageId) {
    errors.imageId = "imageId is required.";
  }

  if (Object.keys(errors).length > 0) throw new AppError(errors, 400);

  next();
});

module.exports = validateDeleteImage;
