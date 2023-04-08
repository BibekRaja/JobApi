const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const JobAppliedSchema = new Schema({
    jobs: {
        type: [{
            name: {
                type: String,
                require: true,
            },
            offered_salary: {
                type: Number,
                require: true
            },
            // job_id: {
            //     type: ObjectId,
            //     ref: "Job",
            //     require: true
            // }
        }],
        validate: {
            validator: function (value) {
                if (value.length == 0) {
                    return false;
                }
            },
            message: " One Job should be applied"

        }
    },
    applied_by: {
        type: ObjectId,
        ref: "Client",
        require: true
    }


});

module.exports = mongoose.model("JobApplied", JobAppliedSchema)