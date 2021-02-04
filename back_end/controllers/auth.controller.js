const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isJWT } = require("validator").default;
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const UserDoc = require("../models/user.model");

exports.register = catchAsync(async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const user = await UserDoc.create(req.body);

  delete user._doc.password;
  delete user._doc.__v;

  const token = jwt.sign(user._doc, process.env.JWT_SALT);

  res.send({
    status: "success",
    body: { token },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.query;

  const user = await UserDoc.findOne({ email }).select("email password");

  if (!user) {
    const errMessage = { email: "Email is not registered" };
    throw new AppError(errMessage, 400);
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    const errMessage = { password: "Password is incorrect" };
    throw new AppError(errMessage, 400);
  }

  delete user._doc.password;
  const token = jwt.sign(user._doc, process.env.JWT_SALT);

  res.send({
    status: "success",
    body: { token },
  });
});
