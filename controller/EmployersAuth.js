const Employer = require("../model/Employer")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {


        let { name, email, mobile, password, website, description } = req.body;
        let hashed = await bcrypt.hash(password, 10);
        let employer = await Employer.create({
            name,
            email,
            mobile,
            password: hashed,
            website,
            description
        })
        let obj = employer.toObject();
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
    let employer = await Employer.findOne({ email }).select({ password: true, role: true, name: true, email: true })
    if (employer) {
        let status = await bcrypt.compare(password, employer.password);

        if (status) {
            let temp = employer.toObject();
            delete temp.password;
            var token = jwt.sign(temp, 'shhhhh', { expiresIn: "7d" });
            return res.send({
                token,
                employer: temp
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

