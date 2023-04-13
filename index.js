const express = require('express');


require("./config/Database")
const clientauth_route = require("./route/ClientAuth")
const employerauth_route = require("./route/EmployersAuth")
const jobs_route = require("./route/Jobs")
const jobapplied_route = require("./route/JobApplied")
const app = express();
const cors = require("cors");

const PORT = process.env.Port || 8000

const swaggerUi = require('swagger-ui-express');
// const fs = require("fs")
// const YAML = require('yaml');
const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerDocument = require('./swagger.js')

// const file = fs.readFileSync('./api.yaml', 'utf8')
// const swaggerDocument = YAML.parse(file)

const option = {
    swaggerDefinition: {
        info: {
            title: 'Job API',
            version: '1'
        }
    },

    apis: ['index.js']
}


app.use(cors());
app.use(express.static('uploads'))
app.use(express.json())


var corsOptions = {
    origin: 'https://job-api-eosin.vercel.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}





const swaggerDoc = swaggerJSDoc(option)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


/**
 * @swagger
 * /api/jobs:
 *  get:
 *      tags:
 *          - Jobs
 *      description: get all jobs
 *      responses:
 *          200:
 *              description: Success
 *  post:
 *      tags:
 *          - Jobs
 *      description: create jobs
 *      responses:
 *          200:
 *              description: Success
 */

app.use("/api/client", clientauth_route, cors(corsOptions))
app.use("/api/employer", employerauth_route, cors(corsOptions))
app.use("/api/jobs", jobs_route, cors(corsOptions))
app.use("/api/jobapplied", jobapplied_route, cors(corsOptions))

/* 
error - middleware
*/
app.use("", (req, res) => {
    res.status(404).send({
        msg: "resource not found"
    })
})
app.use("", (err, req, res, next) => {

    if (err.name == "ValidationError") {
        let errors = [];
        let errors_entries = Object.entries(err.errors)
        errors_entries.forEach(err => {
            let obj = {
                msg: err[1].message,
                param: err[0]
            }
            errors.push(obj)
        })
        res.status(400).send({
            msg: "Validation Error",
            errors: errors
        })

    } else {

        res.status(500).send({
            msg: "Server Error"
        })
    }
})


app.listen(PORT, () => {
    console.log("server started");
})