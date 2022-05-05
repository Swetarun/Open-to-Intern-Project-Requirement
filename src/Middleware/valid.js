const emailValidator = require('email-validator');
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validator = require('validator');

const validCollege = async function (req, res, next) {
    try {
        let requestBody = req.body;
        if (!requestBody.name) {
            return res.status(400).send({ status: false, msg: "Plz Enter Name In Body !!!" });
        }
        let nameValidation = /^[a-zA-Z ]+$/
        if (!nameValidation.test(requestBody.name)) {
            return res.status(400).send({ status: false, message: "Name can't be a number" });
        }
        
        let checkname = await collegeModel.findOne({ name: requestBody.name });
        if (checkname) {
            return res.status(400).send({ status: false, msg: "Name Already In Use, Change The Name !!!" });
        }

        if (!requestBody.fullName) {
            return res.status(400).send({ status: false, msg: "Plz Enter FullName In Body !!!" });
        }
        if (!requestBody.logoLink) {
            return res.status(400).send({ status: false, msg: "Plz Enter LogoLink In Body !!!" });
        }

        if (!validator.isURL(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Plz Enter a valid url!!!" });
        }
        if ((requestBody.logoLink).match(/\.(jpeg|jpg|gif|png)$/) == null) {
            return res.status(400).send({ status: false, msg: "Plz Enter a valid LogoLink!!!" });
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const validIntern = async function (req, res, next) {
    try {
        let requestBody = req.body;
        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({ status: false, msg: "Please provide intern details" });
        }

        const { name, email, mobile, collegeName } = requestBody;
        // Validation starts
        if (!name) {
            return res.status(400).send({ status: false, message: "Name is required" });
        }
        let nameValidation = /^[A-z ]+$/
        if (!nameValidation.test(name)) {
            return res.status(400).send({ status: false, message: "Name can't be a number" });
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Email is required" });
        }
        if (!emailValidator.validate(email)) {
            return res.status(400).send({ status: false, msg: "Check the format of email" })
        }
        let emailValidation = await internModel.findOne({ email: email })
        if (emailValidation) {
            return res.status(409).send({ status: false, msg: "This Email has been registered already" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, message: "Mobile Number is required" });
        }
        if (Object.values(requestBody.mobile).length < 10 || (requestBody.mobile).length > 10) {
            return res.status(400).send({ status: false, msg: "Mobile Number should be 10 Digits" })
        }

        let mobileValidation = await internModel.findOne({ mobile: mobile })
        if (mobileValidation) {
            return res.status(409).send({ status: false, msg: "This Mobile has been registered already" })
        }
        let mob = /^[0-9 ]+$/
        if (!mob.test(mobile)) {
            return res.status(400).send({ status: false, message: "Mobile number should have digits only" });
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "College Name is required" });
        }
        let cName = collegeName.toLowerCase();
        let collegeID = await collegeModel.findOne({ name: cName });
        if (!collegeID) {
            return res.status(400).send({ status: false, msg: "This is not a valid College" });
        }
        
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
const validCollegeDetails = async function (req, res, next) {
    try {
        let collegeName = req.query.collegeName;
        if (!collegeName) {
            res.status(400).send({ status: false, msg: "Plz Enter CollegeName In Query !!!" });
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = { validCollegeDetails, validIntern, validCollege };