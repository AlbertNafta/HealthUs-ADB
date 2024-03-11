const prescriptionModel = require('../models/prescriptions');

// exports.prescriptionList = function(req, res, next) {
//     res.render('prescriptionList');
// };

exports.prescriptionList = function(req,res,next){
    prescriptionModel.prescriptionList(req,res,next);
}
exports.prescriptionDetail = function(req,res,next){
    prescriptionModel.prescriptionDetail(req,res,next);
}

exports.prescriptionList_ALL = function(req,res,next){
    prescriptionModel.prescriptionList_ALL(req,res,next);
}