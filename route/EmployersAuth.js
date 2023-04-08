const express = require('express');
// const Employer = require('../model/Employer');
const router = express.Router();
const { signup, login } = require("../controller/EmployersAuth")
const { body, validationResult } = require('express-validator');


router.post("/signup", body('email').isEmail(),
    body('name').exists(),
    body('mobile').isLength({ min: 10, max: 10 }).withMessage("Mobile Number must be 10 digits"),
    body('password').isLength({ min: 8 }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next()
        }
    }, signup)

router.post("/login", login)

module.exports = router