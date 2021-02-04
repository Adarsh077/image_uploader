const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const validateAddImage = catchAsync(async (req, _, next) => {
  const data = req.body;
  const errors = {};

  if (!data.imageName) {
    errors.imageName = "Image name is required.";
  }

  if (!data.image) {
    errors.image = "Image is required.";
  }

  if (Object.keys(errors).length > 0) throw new AppError(errors, 400);

  next();
});

module.exports = validateAddImage;
