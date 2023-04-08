const express = require('express');
const path = require('path')
const router = express.Router();
const multer = require('multer')
const { getjob, store, update, remove, getSingleJob } = require("../controller/Job");
const { isAuthenticated, isEmployer } = require('../middleware/UserJobAuth');
const { log } = require('console');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/job')
    },
    filename: function (req, file, cb) {
        let type = path.extname(file.originalname)

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + type
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

router.get("", getjob)
router.get("/:id", getSingleJob)
router.post("", isAuthenticated, isEmployer, upload.array("images"), store)
router.put("/:id", isAuthenticated, isEmployer, upload.array("images"), update)
router.delete("/:id", isAuthenticated, isEmployer, remove)

module.exports = router