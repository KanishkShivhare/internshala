const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModels = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxlength: [15, "password should be not exceed 15 characters"],
      minlength: [3, "password should have exceed 6 characters"],
      // match:
    },
  },
  { timestamps: true }
);

studentModels.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
});

studentModels.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModels.methods.getjwttoken = function () {
  return jwt.sign({ id: this_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const student = mongoose.model("student", studentModels);

module.exports = student;
