const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const createIntern = async function (req, res) {
    try {
        req.body.name = req.body.name.replace(/\s+/g, ' ').trim();

        let requestBody = req.body;
        let collegeID = await collegeModel.findOne({ name: requestBody.collegeName });
        requestBody['collegeId'] = collegeID;

        let Data = await internModel.create(requestBody);
        res.status(201).send({ status: true, msg: "Created", Data: Data });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports = { createIntern };