const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModels = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendtoken");
const path = require("path");
const imageKit = require("../utils/imagekit").initImageKit();

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
  const studentuser = await new studentModels(req.body).save();
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

//studentSendmail
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
  studentuser.resetpasswordToken = "1";
  await studentuser.save();

  res.json({ studentuser, url });
});

// studentForgetLink
exports.studentForgetLink = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels.findById(req.params.id).exec();
  if (!studentuser)
    return next(
      new ErrorHandler("Student User Not Found With This Email Address", 401)
    );

  if (studentuser.resetpasswordToken == 1) {
    studentuser.password = req.body.password;
    studentuser.resetpasswordToken = "0";
    await studentuser.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
    );
  }
  res.status(200).json({
    message: "Password has been successfully changed ",
  });
});

// studentresetpassword
exports.studentresetpassword = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels.findById(req.params.id).exec();

  // ********************** bhaiya se puchna h ****************************

  // const isMatch = studentuser.comparePassword(req.body.password);
  // if (!isMatch)
  //   return next(
  //     new ErrorHandler(
  //       "the page you are trying to access cannot be loaded until you log in with a valid Password",
  //       401
  //     )
  //   );

  studentuser.password = req.body.password;
  await studentuser.save();

  sendToken(studentuser, 201, res);

  res.status(200).json({
    message: "Password has been successfully changed ",
  });
});

// studentupdate
exports.studentupdate = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels
    .findByIdAndUpdate(req.params.id, req.body)
    .exec();
  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
    studentuser,
  });
});

// studentavatar
exports.studentavatar = catchAsyncError(async (req, res, next) => {
  const studentuser = await studentModels.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifedfaileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (studentuser.avatar.fileId !== "") {
    await imageKit.deleteFile(studentuser.avatar.fileId)
  }

  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifedfaileName,
  });

  studentuser.avatar = { fileId, url };
  await studentuser.save();
  res.status(200).json({
    success: true,
    message: "Avatar Updated Successfully",
  });
  
});
