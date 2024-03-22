const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModels = require("../models/studentModel");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.json({ message: "homepage" });
});
//studentSignup
exports.studentSignup = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels(req.body).save();
  res.status(201).json(studentuser);
});
