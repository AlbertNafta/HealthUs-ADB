const medicineModel = require('../models/medicines');



exports.medicineList = function(req, res, next) { 
    medicineModel.medicineList(req,res,next);
}

exports.medicineDetail = function(req, res, next) { 
    medicineModel.medicineDetail(req,res,next);
}
exports.editMedicine = function(req, res, next) { 
    medicineModel.editMedicine(req,res,next);
}
