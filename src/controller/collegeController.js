const collegeModel = require('../models/collegeModel');
const interModel = require('../models/internModel');

const createCollege = async function (req, res) {
    try {
        let saveData = await collegeModel.create(req.body);
        res.status(201).send({ status: true, msg: saveData });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.createCollege = createCollege;

const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;
        let interns = await interModel.findOne({ collegeName: collegeName }).select({ collegeId: 1 });
        let collegedata = await collegeModel.findOne({ _id: interns.collegeId.toString() }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });
        let internsData = await interModel.find({ collegeId: interns.collegeId }).select({ name: 1, email: 1, mobile: 1 });

        Object.assign(collegedata._doc, { interests: internsData })
        res.status(200).send({ data: collegedata, });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.collegeDetails = collegeDetails;