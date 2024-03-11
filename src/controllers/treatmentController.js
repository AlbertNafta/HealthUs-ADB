const treatmentModel = require('../models/treatments');

// exports.listPatient = function(req, res, next) {
//     let sql = `SELECT * FROM patient LIMIT 5`;
//     patientModel.query(sql, function(err, data) {
//         if (err) {
//             return next(err);
//         }
//         console.log(data);
//         res.render('patientList', { patientData: data });
//     });
// };

exports.treatListperPatient = function(req,res,next){
    treatmentModel.treatListperPatient(req,res,next);
}
exports.treatmentDetail = function(req,res,next){
    treatmentModel.treatmentDetail(req,res,next);
}
exports.unPaidTreatment = function(req,res,next){
    treatmentModel.unPaidTreatment(req,res,next);
}