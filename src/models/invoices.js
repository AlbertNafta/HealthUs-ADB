const db = require("./db.js");

const Invoice = function(invoice){
    this.invoice_id = invoice.invoice_id;
    this.treatment_id = invoice.treatment_id;
    this.appointment_id = invoice.appointment_id;
    this.paid_fee = invoice.paid_fee;
    this.fee = invoice.fee;
    this.change = invoice.change;
    this.payment_method = invoice.payment_method;
};

Invoice.invoiceList = function(req, res, next) {
    const patientID = req.params.id;
  
    let sql= `call sp_getInvoiceByPatientID('${patientID}')`;
    
    db.query(sql, function(err, invoiceList) {
        if (err) {
            return next(err);
        }
        console.log(invoiceList);
        res.render('invoiceList', { invoiceList: invoiceList[0] });
    });
};

Invoice.invoiceDetail = function(req, res, next) {
    const invoice_id = req.params.id;
  
    let sql= `call sp_getInvoiceDetailsByID('${invoice_id}')`;
    
    db.query(sql, function(err, invoiceDetail) {
        if (err) {
            return next(err);
        }
        console.log(invoiceDetail);
        res.render('invoiceDetail', { invoiceDetail: invoiceDetail[0] });
    });
};

module.exports = Invoice;
