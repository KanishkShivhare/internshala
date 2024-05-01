const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModels = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: [3, "Firstname should have exceed 3 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      minlength: [3, "Lastname should have exceed 3 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxlength: [10, "Contact should be not exceed 10 characters"],
      minlength: [10, "Contact should have exceed 10 characters"],
    },
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
      required: [true, "password is required"],
      maxlength: [15, "password should be not exceed 15 characters"],
      minlength: [3, "password should have exceed 3 characters"],
      // match:
    },
    resetpasswordToken: {
      type: String,
      default: "0",
    },
    organizationname: {
      type: String,
      required: [true, "Organization Name is required"],
      minlength: [3, "Organization Name should have exceed 3 characters"],
    },
    organizationLogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.pexels.com/photos/20991828/pexels-photo-20991828/free-photo-of-a-woman-sitting-on-a-pile-of-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    },
    interships: [{ type: mongoose.Schema.Types.ObjectId, ref: "interships" }],
    jods: [{ type: mongoose.Schema.Types.ObjectId, ref: " jods" }],

  },
  { timestamps: true }
);

employeModels.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
});

employeModels.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeModels.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const employe = mongoose.model("employe", employeModels);

module.exports = employe;
