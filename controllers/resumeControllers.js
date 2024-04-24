const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModels = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.resume = catchAsyncError(async (req, res, next) => {
  res.json({ message: "resume" });
});