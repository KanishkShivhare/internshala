const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModels = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendtoken");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.json({ message: "homepage" });
});

// currentuser
exports.currentuser = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels.findById(req.id).exec();
  res.json({ studentuser });
});

//studentSignup
exports.studentSignup = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels(req.body).save();
  res.status(201).json(studentuser);
  sendToken(studentuser, 201, res);
});

//studentSignin
exports.studentSignin = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!studentuser)
    return next(
      new ErrorHandler("Student User Not Found With This Email Address", 401)
    );
  const isMatch = studentuser.comparePassword(req.body.password);
  if (!isMatch)
    return next(
      new ErrorHandler(
        "the page you are trying to access cannot be loaded until you log in with a valid Password",
        401
      )
    );
  // res.json(studentuser)
  sendToken(studentuser, 200, res);
});

// studentSignout
exports.studentSignout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully SignOut!" });
});

exports.studentSendmail = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels
    .findOne({ email: req.body.email })
    .exec();
  if (!studentuser)
    return next(
      new ErrorHandler("Student User Not Found With This Email Address", 401)
    );
  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    studentuser._id
  }`;

  sendmail(req, res, next, url);

  res.json({ studentuser, url });
});
