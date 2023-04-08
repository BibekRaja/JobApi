const Client = require("../model/Client")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {


        let { name, email, mobile, password } = req.body;

        let hashed = await bcrypt.hash(password, 10);

        let client = await Client.create({
            name,
            email,
            mobile,
            password: hashed
        })
        let obj = client.toObject();
        delete obj.password;
        res.send({
            data: obj
        })
    } catch (err) {
        console.log(err.message);
        next(err)
    }
}
const login = async (req, res) => {

    let { email, password } = req.body;
    let client = await Client.findOne({ email }).select({ password: true, role: true, name: true, email: true })
    if (client) {
        let status = await bcrypt.compare(password, client.password);

        if (status) {
            let temp = client.toObject();
            delete temp.password;
            var token = jwt.sign(temp, 'shhhhh', { expiresIn: "7d" });
            return res.send({
                token,
                client: temp
            })
        }


    }
    res.status(401).send({
        msg: "Invalid Credentials"
    })


}

module.exports = {
    signup: signup,
    login: login
}

