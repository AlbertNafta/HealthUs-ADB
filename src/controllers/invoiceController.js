const invoicesModel = require('../models/invoices');

// exports.prescriptionList = function(req, res, next) {
//     res.render('prescriptionList');
// };

exports.invoiceList = function(req,res,next){
    invoicesModel.invoiceList(req,res,next);
}

exports.invoiceDetail = function(req,res,next){
    invoicesModel.invoiceDetail(req,res,next);
}
