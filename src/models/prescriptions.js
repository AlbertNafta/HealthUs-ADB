const db = require("./db.js");

const Prescription = function(prescription) {
    this.prescription_id = prescription.prescription_id;
    this.appointment_id = prescription.appointment_id;
    this.treatment_id = prescription.treatment_id;
};

Prescription.prescriptionList = function(req, res, next) {
    const treatment_id = req.params.id;

    // USE `adb_nhakhoa`;
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getPrescriptions(IN treatment_id VARCHAR(9))
    // BEGIN
    //     SELECT 
    //         P.PRESCRIPTION_ID,
    //         P.TREATMENT_ID,
    //         P.APPOINTMENT_ID,
    //         MAX(A.APPOINTMENT_DATE) AS APPOINTMENT_DATE,
    //         COUNT(DISTINCT M.MEDICINE_ID) AS Number_of_distinct_medicine,
    //         DE.FULL_NAME as FULL_NAME
    //     FROM 
    //         PRESCRIPTION P
    //     LEFT JOIN 
    //         APPOINTMENT A ON P.APPOINTMENT_ID = A.APPOINTMENT_ID
    //     LEFT JOIN 
    //         MEDICINE_IN_PRESCRIPTION M ON M.PRESCRIPTION_ID = P.PRESCRIPTION_ID
    //     LEFT JOIN 
    //         TREATMENT TR ON TR.TREATMENT_ID = P.TREATMENT_ID
    //     LEFT JOIN 
    //         DENTIST DE ON DE.Dentist_ID = TR.DENTIST_ID
    //     WHERE 
    //         P.TREATMENT_ID = treatment_id
    //     GROUP BY 
    //         P.PRESCRIPTION_ID, P.TREATMENT_ID, P.APPOINTMENT_ID;
    // END $$
    
    // DELIMITER ;
    
    let sql = 'CALL sp_getPrescriptions(?)';

    db.query(sql, [treatment_id], function(err, prescriptionData) {
        if (err) {
            return next(err);
        }
        res.render('prescriptionList', { prescriptionList: prescriptionData[0] });
    });
};

Prescription.prescriptionDetail = function(req, res, next) {
    const prescription_id = req.params.id;

    
    let sql = 'CALL sp_getMedicineInPrescription(?)';

    db.query(sql, [prescription_id], function(err, prescriptionData) {
        if (err) {
            return next(err);
        }
        console.log(prescriptionData);
        res.render('prescriptionDetail', { prescriptionDetail: prescriptionData[0] });
    });
};

Prescription.prescriptionList_ALL = function(req, res, next) {
    const patient_id = req.params.id;

    // USE `adb_nhakhoa`;
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getPrescriptions_all(IN patient_id VARCHAR(9))
    // BEGIN
    //     SELECT 
    //         P.PRESCRIPTION_ID,
    //         P.TREATMENT_ID,
    //         P.APPOINTMENT_ID,
    //         MAX(A.APPOINTMENT_DATE) AS APPOINTMENT_DATE,
    //         COUNT(DISTINCT M.MEDICINE_ID) AS Number_of_distinct_medicine,
    //         DE.FULL_NAME as FULL_NAME
    //     FROM 
    //         PRESCRIPTION P
    //     LEFT JOIN 
    //         APPOINTMENT A ON P.APPOINTMENT_ID = A.APPOINTMENT_ID
    //     LEFT JOIN 
    //         MEDICINE_IN_PRESCRIPTION M ON M.PRESCRIPTION_ID = P.PRESCRIPTION_ID
    //     LEFT JOIN 
    //         TREATMENT TR ON TR.TREATMENT_ID = P.TREATMENT_ID
    //     LEFT JOIN 
    //         DENTIST DE ON DE.Dentist_ID = TR.DENTIST_ID

    //     LEFT JOIN
    //         PATIENT PA ON PA.PATIENT_ID = TR.PATIENT_ID
    //     WHERE 
    //         PA.PATIENT_ID = patient_id
    //     GROUP BY 
    //         P.PRESCRIPTION_ID, P.TREATMENT_ID, P.APPOINTMENT_ID;
    // END $$
    
    // DELIMITER ;
    
    let sql = 'CALL sp_getPrescriptions_all(?)';

    db.query(sql, [patient_id], function(err, prescriptionData) {
        if (err) {
            return next(err);
        }
        res.render('prescriptionList_ALL', { prescriptionList: prescriptionData[0] });
    });
};

module.exports = Prescription;
