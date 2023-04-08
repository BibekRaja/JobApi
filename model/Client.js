const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "required"],
        validate: {
            validator: async function () {
                let exists = await mongoose.model("Client").findOne({ email: this.email })
                if (exists) {
                    return false
                }
            },
            message: "email already use"
        }
    },
    mobile: {
        type: String,
        minLength: 10,
        maxLength: 10,
        required: [true, "required"],
        validate: {
            validator: async function () {
                let exists = await mongoose.model("Client").findOne({ mobile: this.mobile })
                if (exists) {
                    return false
                }
            },
            message: "mobile already use"
        }
    },
    password: {
        type: String,
        required: [true, "required"],
        minLength: 8,
        select: false
    }, role: {
        type: String,
        default: "Client"
    }

});

module.exports = mongoose.model("Client", ClientSchema)