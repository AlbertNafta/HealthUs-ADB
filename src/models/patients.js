const db = require("./db.js");

const Patient = function(patient){
    this.patient_id = patient.patient_id;
    this.full_name = patient.full_name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.allergies = patient.allergies;
};

Patient.listPatient = function(req, res, next) {
    db.query('CALL sp_patient()', function(err, data) {
        if (err) {
            return next(err);
        }
        res.render('patientList', { patientData: data[0] });
    });
};
Patient.listPatientPro = function(req, res, next) {


    const IDuser = req.params.id;
    let sql = 'CALL GetPatientInfo(?)';

    db.query(sql, [IDuser], function(err, patientData) {
        if (err) {
            return next(err);
        }
        console.log(patientData);
        res.render('patientProfile', { patientData: patientData[0] , patie:patientData[1]});
    });
};
function mapGender(input) {
    const lowerCaseInput = input.toLowerCase();
    if (lowerCaseInput === 'nam') {
        return 'M';
    } else if (lowerCaseInput === 'nữ') {
        return 'F';
    }
    // If input is not 'Nam' or 'Nữ', return the input value
    return input;
}
Patient.updatePatient=function(req,res,next){
    console.log(req.body);
    const full_name = req.body.full_name;
    if (!full_name) {
        return res.status(400).send('Full name cannot be null.');
    }
    let gender = req.body.gender;
    const allergies = req.body.allergies;
    const patient_id =req.params.id;
    gender=mapGender(gender);
    var sql = 'call updatePatient(?,?,?,?)';
    db.query(sql, [full_name,gender,allergies,patient_id], function(err, patientData) {
        if (err) {
            return next(err);
        }
        res.redirect('/patientList');
    });
};

Patient.addPatient=function(req,res,next){
    console.log(req.body);
    const patient_id =req.body.patient_id;
    const full_name = req.body.full_name; 
    let dob =req.body.dob;
    let gender = req.body.gender;
    const allergies = req.body.allergies;
    dob = (typeof dob === 'string') ? dob.split('/').reverse().join('-') : null;
    gender=mapGender(gender);
    var sql='call addPatient(?,?,?,?,?)';
    db.query(sql, [patient_id,full_name,dob,gender,allergies], function(err, result) {
        if (err) {
            const errorMessage = err.message || 'An error occurred while adding the patient.';
            return res.render('patientAdd', { message: errorMessage, errorField: 'patient_id' });
           
        }
        if (result.affectedRows > 0) {
            res.redirect('/patientList');
        } 
    });
}
Patient.deletePatient=function(req,res,next){

}
Patient.searchPatient = function(req, res, next) {
    console.log(req.query);
    var full_name = req.query.full_name;
    var patient_id = req.query.patient_id;

    // var sql = 'SELECT DISTINCT * FROM patient WHERE full_name LIKE ? AND patient_id LIKE ? LIMIT 30';
    var sql = 'CALL searchPatient(?, ?)';
    db.query(sql, ['%' + full_name + '%', '%' + patient_id + '%'], function(err, patientData) {
        if (err) {
            return next(err);
        }

        console.log(patientData);
        res.render('patientSearch', { patientData2: patientData[0] });
    });
};


module.exports = Patient;