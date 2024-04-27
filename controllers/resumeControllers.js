const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModels = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncError(async (req, res, next) => {
  const { resume } = await studentModels.findById(req.id).exec();
  res.json({ message: "resume", resume });
});

exports.addEducation = catchAsyncError(async (req, res, next) => {
  const studentUser = await studentModels.findById(req.id).exec();
  studentUser.resume.education.push({ ...req.body, id: uuidv4() });
  await studentUser.save();
  res.json({ message: "Education Added" });
});

exports.editEducation = catchAsyncError(async (req, res, next) => {
  const studentUser = await studentModels.findById(req.id).exec();
  const eduIndex = studentUser.resume.education.findIndex(
    (i) => i.id == req.params.eduid
  );
  studentUser.resume.education[eduIndex] = {
    ...studentUser.resume.education[eduIndex],
    ...req.body,
  };
  await studentUser.save();
  res.json({ message: "Education Added" });
});

exports.deleteEducation = catchAsyncError(async (req, res, next) => {
  const studentUser = await studentModels.findById(req.id).exec();
  const eduIndex = studentUser.resume.education.findIndex(
    (i) => i.id == req.params.eduid
  );
  studentUser.resume.education.splice(eduIndex, 1);
  await studentUser.save();
  res.json({ message: "Education Deleted" });
});

