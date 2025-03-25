const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim : true,
    },
    lastName: {
      type: String,
      required: true,
      trim : true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim : true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ], // projects in which user is involved
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
