var jwt = require('jsonwebtoken');


const isClient = (req, res, next) => {
    let user = false;

    if (req.user.role == "Client") {
        user = true;
    }
    if (user) {
        next()
    } else {
        res.status(403).send({
            msg: "Forbidden !!! Only for Client"
        })
    }
}
const isEmployer = (req, res, next) => {
    let user = false;

    if (req.user.role == "Employer") {
        user = true;
    }
    if (user) {
        next()
    } else {
        res.status(403).send({
            msg: "Forbidden !!! Only for Employer"
        })
    }
}

const isAuthenticated = (req, res, next) => {
    try {

        let token = req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, 'shhhhh');
        // console.log(decoded);
        if (decoded) {
            req.user = decoded;
            next()
        }
    } catch (err) {
        res.status(401).send({
            msg: "Invalid Token"
        })
    }
}
module.exports = {
    isAuthenticated,
    isClient,
    isEmployer,

}
