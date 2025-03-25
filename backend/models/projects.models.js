const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    tasks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Task"
        }
    ],// Array of Tasks under project
    member : [
        {
            userId : {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User"
            },
            role : {
                type: String, 
                enum: ["Owner", "Member"], 
                default: "Member" 
            }
        }
    ]
},{timestamps : true});

const Project = mongoose.model("Project",projectSchema);

module.exports =  Project;