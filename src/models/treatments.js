const db = require("./db.js");

const Treatment = function(treatment){
    this.treatment_id = treatment.treatment_id;
    this.dentist_id = treatment.dentist_id;
    this.assistant_id = treatment.assistant_id;
    this.patient_id = treatment.patient_id;
    this.description = treatment.description;
    this.status = treatment.status;
};


Treatment.treatListperPatient = function(req, res, next) {
    const patientID = req.params.id;
  
    // use `adb_nhakhoa`;
    // DELIMITER $$
    // DELIMITER //
    
    // CREATE PROCEDURE sp_treatment(IN patient_id INT)
    // BEGIN
    //             SELECT 
//     TREATMENT.*, 
//     D1.FULL_NAME AS DentistName, 
//     APPOINTMENT.APPOINTMENT_DATE,
//     D2.FULL_NAME AS AssistantName,
//     D1.CLINIC as place
// FROM 
//     TREATMENT
// LEFT JOIN 
//     DENTIST D1 ON TREATMENT.DENTIST_ID = D1.DENTIST_ID
// LEFT JOIN 
//     DENTIST D2 ON TREATMENT.ASSISTANT_ID = D2.DENTIST_ID
// LEFT JOIN 
//     APPOINTMENT ON TREATMENT.TREATMENT_ID = APPOINTMENT.TREATMENT_ID
// WHERE 
//     TREATMENT.PATIENT_ID = patient_id and
//     APPOINTMENT.APPOINTMENT_ID = 'APP01';
// END
    
    // DELIMITER ;
    let sql= `call sp_treatment('${patientID}')`;
    
    db.query(sql, function(err, treatmentData) {
        if (err) { 
            return next(err);
        }
        res.render('treatmentListperPatient', { treatmentData: treatmentData[0] });
    });
};

Treatment.treatmentDetail = function(req, res, next) {
    const patientID = req.params.id;
  
    // USE `adb_nhakhoa`;
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_treatmentDetail(IN treatment_id VARCHAR(9))
    // BEGIN
    //     SELECT 
    //         TREATMENT.*, 
    //         APPOINTMENT.APPOINTMENT_DATE,
    //         D1.FULL_NAME AS DentistName,
    //         D2.FULL_NAME AS AssistantName,
    //         PATIENT.FULL_NAME AS PatientName,
    //          CL.CLINIC_ADDRESS as ClinicAddress
    //     FROM 
    //         TREATMENT
    //     LEFT JOIN 
    //         APPOINTMENT ON TREATMENT.TREATMENT_ID = APPOINTMENT.TREATMENT_ID
    //     LEFT JOIN 
    //         DENTIST D1 ON TREATMENT.DENTIST_ID = D1.DENTIST_ID
    //      LEFT JOIN 
    //         CLINIC CL ON DENTIST.CLINIC = CL.CLINIC_ID
    //     LEFT JOIN 
    //         DENTIST D2 ON TREATMENT.ASSISTANT_ID = D2.DENTIST_ID
    //     LEFT JOIN
    //         PATIENT ON TREATMENT.PATIENT_ID = PATIENT.PATIENT_ID
    //     WHERE 
    //         TREATMENT.TREATMENT_ID = treatment_id AND
    //         APPOINTMENT.APPOINTMENT_ID = 'APP01';
    // END $$
    
    // DELIMITER ;


    let sql = `CALL sp_treatmentDetail('${patientID}')`;
    
    
    db.query(sql, function(err, treatmentDetail) {
        if (err) {
            return next(err);
        }
        res.render('treatmentDetail', { treatmentDetail: treatmentDetail[0] });
    });
};


Treatment.newTreatment = function (req, res, next) {
    db.query("call sp_insert_treatment(?,?,?,?,?)", [req.body.dentist, req.session.username,
    req.session.treatment, req.session.appointment_date, req.session.shift]);
    console.log(req.body.dentist);
}

Treatment.review = function(req, res, next) {
    const dataArray = [req.body, req.session];

  // Log the array
  console.log("Data Array:");
  console.log(dataArray);


    let sql = `CALL sp_reviewRequest(?,?,?,?,?,?)`;
    
    
    db.query(sql,[req.session.username,req.session.clinic,req.session.appointment_date,req.session.shift,req.body.dentist,req.session.treatment], function(err, unPaidTreatment) {
        if (err) {
            return next(err);
        }
        console.log(unPaidTreatment);
        res.render('reviewRequest', { unPaidTreatment:unPaidTreatment[0] });
    });
};

Treatment.unPaidTreatment = function(req, res, next) {
    const patientID = req.params.id;


    let sql = `CALL sp_findUnpaidInvoicesWithDetails('${patientID}')`;
    
    
    db.query(sql, function(err, unPaidTreatment) {
        if (err) {
            return next(err);
        }
        console.log(unPaidTreatment);
        res.render('unPaidTreatment', { unPaidTreatment: unPaidTreatment[0] });
    });
};

module.exports = Treatment;