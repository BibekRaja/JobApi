const express = require('express');

const router = express.Router();


const { isAuthenticated, isClient } = require('../middleware/UserJobAuth');
const { index, store } = require('../controller/JobApplied');
store





router.get("", isAuthenticated, isClient, index)
// router.get("/:id", getSingleJob)
router.post("", isAuthenticated, isClient, store)
// router.put("/:id", isAuthenticated, isEmployer, upload.array("images"), update)
// router.delete("/:id", isAuthenticated, isEmployer, remove)

module.exports = router