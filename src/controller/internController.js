const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

const createIntern = async function (req, res) {
    try {
        req.body.name = req.body.name.replace(/\s+/g, ' ').trim();

        let cName= req.body.collegeName
        let collegeID = await collegeModel.findOne({ name: cName.toLowerCase() });
        req.body['collegeName'] = cName.toLowerCase();
        req.body['collegeId'] = collegeID;

        let Data = await internModel.create(req.body);
        res.status(201).send({ status: true, msg: "Created", Data: Data });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports = { createIntern };