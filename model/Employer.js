const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let EmployersSchema = new Schema({

    name: {
        type: String,
        required: [true, "required"],

    },
    email: {
        type: String,
        reqiured: [true, "required"],
        validate: {
            validator: async function () {
                let exists = await mongoose.model("Employer").findOne({ email: this.email })
                if (exists) {
                    return false
                }
            },
            message: "email already use"
        }
    },
    website: {
        type: String,
        // required: [true, "required"]
    },
    mobile: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: [true, "required"],
        validate: {
            validator: async function () {
                let exists = await mongoose.model("Employer").findOne({ mobile: this.mobile })
                if (exists) {
                    return false
                }
            },
            message: "mobile already use"
        }
    },
    company: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: [true, "required"],
        minLength: 8,
        select: false
    }, role: {
        type: String,
        default: "Employer"
    }




});

module.exports = mongoose.model("Employer", EmployersSchema)