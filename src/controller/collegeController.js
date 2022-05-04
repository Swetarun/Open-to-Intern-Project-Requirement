const collegeModel = require('../models/collegeModel');

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