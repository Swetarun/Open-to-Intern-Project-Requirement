const collegeModel = require('../models/collegeModel');
const interModel = require('../models/internModel');

const createCollege = async function (req, res) {
    try {
        req.body.name = req.body.name.toLowerCase().trim()
        console.log(req.body.name)
        req.body.fullName = req.body.fullName.replace(/\s+/g, ' ').trim();

        let saveData = await collegeModel.create(req.body);
        res.status(201).send({ status: true, Data: saveData });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName.toLowerCase();
        let collegedata = await collegeModel.findOne({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });
        if (!collegedata) {
            res.status(400).send({ status: false, msg: "Plz Enter a valid CollegeName!!!" });
        }

        let internsData = await interModel.find({ collegeName: collegedata.name }).select({ name: 1, email: 1, mobile: 1 });
        if (internsData.length == 0) {
            internsData = "No Intern Applied For This College";
        }
        Object.assign(collegedata._doc, { interests: internsData });
        res.status(200).send({ data: collegedata, });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = { collegeDetails, createCollege };