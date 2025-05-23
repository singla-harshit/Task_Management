const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true,
    },
    detail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority : {
      type : String ,
      enum : ["Low","Medium","High"],
      default : "low",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const Task =  mongoose.model("Task", taskSchema);
module.exports = Task
