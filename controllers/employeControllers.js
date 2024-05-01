const { catchAsyncError } = require("../middlewares/catchAsyncError");
const employeModels = require("../models/employeModel");
const intershipModels = require("../models/internshipModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendtoken");
const path = require("path");
const imageKit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Secure Employe homepage" });
});

// currentemploye
exports.currentemploye = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels.findById(req.id).exec();
  res.json({ employeuser });
});

//employeSignup
exports.employeSignup = catchAsyncError(async (req, res, next) => {
  const employeuser = await new employeModels(req.body).save();
  sendToken(employeuser, 201, res);
});

//employeSignin
exports.employeSignin = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels
    .findOne({
      email: req.body.email,
    })
    .select("+password")
    .exec();
  if (!employeuser)
    return next(
      new ErrorHandler("employe User Not Found With This Email Address", 401)
    );
  const isMatch = employeuser.comparePassword(req.body.password);
  if (!isMatch)
    return next(
      new ErrorHandler(
        "the page you are trying to access cannot be loaded until you log in with a valid Password",
        401
      )
    );
  // res.json(employeuser)
  sendToken(employeuser, 200, res);
});

// employeSignout
exports.employeSignout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully SignOut!" });
});

//employeSendmail
exports.employeSendmail = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels
    .findOne({ email: req.body.email })
    .exec();
  if (!employeuser)
    return next(
      new ErrorHandler("employe User Not Found With This Email Address", 401)
    );
  const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
    employeuser._id
  }`;

  sendmail(req, res, next, url);
  employeuser.resetpasswordToken = "1";
  await employeuser.save();

  res.json({ employeuser, url });
});

// employeForgetLink
exports.employeForgetLink = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels.findById(req.params.id).exec();
  if (!employeuser)
    return next(
      new ErrorHandler("employe User Not Found With This Email Address", 401)
    );

  if (employeuser.resetpasswordToken == 1) {
    employeuser.password = req.body.password;
    employeuser.resetpasswordToken = "0";
    await employeuser.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
    );
  }
  res.status(200).json({
    message: "Password has been successfully changed ",
  });
});

// employeresetpassword
exports.employeresetpassword = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels.findById(req.params.id).exec();

  // ********************** bhaiya se puchna h ****************************

  // const isMatch = employeuser.comparePassword(req.body.password);
  // if (!isMatch)
  //   return next(
  //     new ErrorHandler(
  //       "the page you are trying to access cannot be loaded until you log in with a valid Password",
  //       401
  //     )
  //   );

  employeuser.password = req.body.password;
  await employeuser.save();

  sendToken(employeuser, 201, res);

  res.status(200).json({
    message: "Password has been successfully changed ",
  });
});

// employeupdate
exports.employeupdate = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels
    .findByIdAndUpdate(req.params.id, req.body)
    .exec();
  res.status(200).json({
    success: true,
    message: "employe Updated Successfully",
    employeuser,
  });
});

// employelogo
exports.employelogo = catchAsyncError(async (req, res, next) => {
  const employeuser = await employeModels.findById(req.params.id).exec();
  const file = req.files.organizationLogo;
  const modifedfaileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employeuser.organizationLogo.fileId !== "") {
    await imageKit.deleteFile(employeuser.organizationLogo.fileId);
  }

  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifedfaileName,
  });

  employeuser.organizationLogo = { fileId, url };
  await employeuser.save();
  res.status(200).json({
    success: true,
    message: "logo Updated Successfully",
  });
});

// .....................internship......................

//  createinternship

exports.createinternship = catchAsyncError(async (req, res, next) => {
  const intership = await new intershipModels(req.body).save();
  intership.save();
  res.status(201).json({ success: true, intership });
});
