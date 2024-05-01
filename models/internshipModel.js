const mongoose = require("mongoose");

const intershipModels = new mongoose.Schema(
  {
    profile: String,
    skill: String,
    internshiptype: {
      type: String,
      enum: ["In office", "Remote"],
    },
    openinigs: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "performance based", "Unpaid"],
      },
      amount: Number,
    },
    perkas:String,
    assesments:String,
  },
  { timestamps: true }
);

intershipModels.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
});

const intership = mongoose.model("intership", intershipModels);

module.exports = intership;
