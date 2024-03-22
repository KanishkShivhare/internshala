const mongoose = require("mongoose");

const studentModels = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      Select: false,
      maxLenght: [15, "password should be not exceed 15 characters"],
      minLenght: [3, "password should have exceed 6 characters"],
      // match:
    },
  },
  { timestamps: true }
);

const student = mongoose.model("student", studentModels);

module.exports = student
