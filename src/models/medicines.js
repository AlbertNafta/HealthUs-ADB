const db = require("./db.js");

const Medicine = function(medicine){
    this.medicine_id = medicine.medicine_id;
    this.name = medicine.name;
    this.description = medicine.description;

};


Medicine.medicineList = function(req, res, next) {
    
//     CREATE PROCEDURE sp_getMedicine()
// BEGIN
//     -- Select FULL_NAME from DENTIST table and CLINIC_ADDRESS from CLINIC table based on given CLINIC_ID
//     SELECT
//       M.*
//     FROM
//         medicine M;
// END $$
    let sql= `call sp_getMedicine()`;
    
    db.query(sql, function(err, medicineList) {
        if (err) {
            return next(err);
        }
        res.render('medicineList', { medicineList: medicineList[0] });
    });
};

Medicine.medicineDetail = function(req, res, next) {
    const medicine_id_param = req.params.id;
    // USE `adb_nhakhoa`; -- Replace with your actual database name
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getMedicineDetail( IN medicine_id_param VARCHAR(9))
    // BEGIN
    //     -- Select FULL_NAME from DENTIST table and CLINIC_ADDRESS from CLINIC table based on given CLINIC_ID
    //     SELECT
    //       M.*
    //     FROM
    //         medicine M
    //     WHERE
    //         M.MEDICINE_ID = medicine_id_param;
    // END $$
    let sql = `CALL sp_getMedicineDetail('${medicine_id_param}')`;
    
    
    db.query(sql, function(err, medicineDetail) {
        if (err) {
            return next(err);
        }
        res.render('medicineDetail', { medicineDetail: medicineDetail[0] });
    });
};
Medicine.editMedicine = function(req,res,next){
    console.log(req.body);
    let inputN = req.body.inputNumber;
    console.log(req.body.inputNumber);
    console.log(inputN);
    const medicine_id = req.params.id;
    if (req.body.fix === "1"){
        var sql = 'call sp_edit_med_fix(?,?)';
        db.query(sql, [medicine_id, inputN], function(err, medicineDetail) {
            if (err) {
                return next(err);
            }
            res.redirect('/medicineList');
        });
    }
    else if (req.body.fix === "0"){
        var sql = 'call sp_edit_med(?,?)';
        db.query(sql, [medicine_id, inputN], function(err, medicineDetail) {
            if (err) {
                return next(err);
            }
            res.redirect('/medicineList');
        });
    }

   
};
module.exports = Medicine;
