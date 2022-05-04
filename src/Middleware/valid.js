const collegeModel= require('../models/collegeModel')
const internModel= require('../models/internModel')

const validIntern = async function (req, res, next) {
    try{
    let requestBody = req.body
    if (Object.keys(requestBody).length == 0) {
        return res.status(400).send({ status: false, msg: "Please provide intern details" });
    }
    const { name, email, mobile, collegeName } = requestBody;

    // Validation starts
    if (!name) {
        return res.status(400).send({ status: false, message: "Name is required" });
    }
    if (!email) {
        return res.status(400).send({ status: false, message: "Email is required" });
    }
    if (!mobile) {
        return res.status(400).send({ status: false, message: "Mobile Number is required" });
    }
    if (!collegeName) {
        return res.status(400).send({ status: false, message: "College Name is required" });
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).send({ status: false, msg: "Check the format of email" })
    }
    let emailValidation = await internModel.findOne({ email: email })
    if (emailValidation) {
        return res.status(409).send({ status: false, msg: "This Email has been registered already" })
    }

    // let val = mobile.value
    if (Object.values(requestBody.mobile).length < 10) {
        return res.status(400).send({ status: false, msg: "Mobile Number should be 10 Digits" })
    }
    let mobileValidation = await internModel.findOne({ mobile: mobile })
    if (mobileValidation) {
        return res.status(409).send({ status: false, msg: "This Mobile has been registered already" })
    }

    let collegeID = await collegeModel.findOne({ name: requestBody.collegeName })
    if (!collegeID)
        return res.status(400).send({ status: false, msg: "This is not a valid College" });
        next();
}
catch (err) {
    res.status(500).send({ status: false, msg: err.message });
}
}

module.exports.validIntern= validIntern
