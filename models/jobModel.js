const mongoose = require("mongoose");

const jobModels = new mongoose.Schema(
  {
    profile: String,
    skill: String,
    jobtype: {
      type: String,
      enum: ["In office", "Remote"],
    },
    openinigs: Number,
    description:String,
    preferences:String,
    salary: Number,
    perkas:String,
    assesments:String,
  },
  { timestamps: true }
);

jobModels.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
});

const job = mongoose.model("job", jobModels);

module.exports = job;
