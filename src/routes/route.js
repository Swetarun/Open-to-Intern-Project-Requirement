const express = require("express");
const router = express.Router();

const collegeController = require('../controller/collegeController');
const internController = require('../controller/internController');
const middle = require('../Middleware/valid')

router.post('/functionup/colleges', middle.validCollege, collegeController.createCollege);
router.post('/functionup/interns', middle.validIntern, internController.createIntern);
router.get('/functionup/collegeDetails', middle.validCollegeDetails, collegeController.collegeDetails);

module.exports = router;