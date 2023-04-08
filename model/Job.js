const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        require: true,
        enum: ["Frontend", "Backend", "Fullstack"],
        default: "Frontend"
    },
    job_level: {
        type: String,
        require: true,
        enum: ["Fresher", "Junior", "Mid", "Senior"],
        default: "Fresher"
    },
    number_of_vacancy: {
        type: Number,
        require: true,
        default: 1,

    },
    offered_salary: {
        type: Number,
        require: true,
        default: 0
    },
    deadline: {
        type: Date,
    },
    location: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Top", "Hot", "Featured", "Normal"],
        default: "Top"
    },
    created_at: {
        type: Date,
    },
    created_by: {
        type: ObjectId,
        ref: "Employer",
        require: true
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    },



});

module.exports = mongoose.model("Job", JobSchema)