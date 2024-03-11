const db = require("./db");

const Dentist = function(patient){
    this.patient_id = patient.patient_id;
    this.full_name = patient.full_name;
    this.dob = patient.dob;
    this.gender = patient.gender;
    this.allergies = patient.allergies;
};

Dentist.getAll = function (req, res, next) {
    const appointment_date = new Date(req.body.appointment_date)
    let weekDay = '0'

    if (appointment_date.getDay() == 0)
        weekDay = 8
    else {
        weekDay = (appointment_date.getDay() + 1).toString()
    }

    db.query("call sp_get_dentist(?,?,?, ?)", [req.body.clinic, req.body.appointment_date,
        weekDay, req.body.shift],
     function (err, data) {
        if(err) {
          next(err)
        }
        let tempUsername = req.session.username
        req.session.clinic = req.body.clinic
        req.session.appointment_date = req.body.appointment_date
        req.session.shift = req.body.shift
        req.session.treatment = req.body.treatment
        req.session.username = tempUsername
        
        res.render('bookDentist', { dentists: data[0]})
    });
};

Dentist.navSystemMag = function(req, res, next) {
    // No need for a database query in this case
    res.render('navSystemMag');
};

Dentist.staffList = function(req, res, next) {
    // USE `adb_nhakhoa`; -- Replace with your actual database name
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getStaff()
    // BEGIN
    //     -- Select all records from the STAFF table
    //     SELECT *
    //     FROM STAFF;
    // END $$
    
    // DELIMITER ;
    
    let sql= `call sp_getStaff()`;
    
    db.query(sql, function(err, staffList) {
        if (err) {
            return next(err);
        }
        res.render('staffList', { staffList: staffList[0] });
    });
};


Dentist.staffDetail = function(req, res, next) {
    const staffID = req.params.id;
    // USE `adb_nhakhoa`; -- Replace with your actual database name
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getStaffById(IN staff_id_param VARCHAR(9))
    // BEGIN
    //     -- Select staff information from the STAFF table based on the provided STAFF_ID
    //     SELECT *
    //     FROM STAFF
    //     WHERE STAFF_ID = staff_id_param;
    // END $$
    
    // DELIMITER ;
    let sql = `CALL sp_getStaffById('${staffID}')`;
    
    
    db.query(sql, function(err, staffDetail) {
        if (err) {
            return next(err);
        }
        res.render('staffDetail', { staffDetail: staffDetail[0] });
    });
};

Dentist.dentistList = function(req, res, next) {
//     CREATE PROCEDURE sp_getDentistAndClinicInfo()
// BEGIN
//     -- Select FULL_NAME from DENTIST table and CLINIC_ADDRESS from CLINIC table
//     -- along with an array of SCHEDULE_WEEKDAY and SCHEDULE_SHIFT for each dentist
//     SELECT
//         D.*,
//         C.CLINIC_ADDRESS,
//         GROUP_CONCAT(SCH.SCHEDULE_WEEKDAY) AS SCHEDULE_WEEKDAYS,
//         GROUP_CONCAT(SCH.SCHEDULE_SHIFT) AS SCHEDULE_SHIFTS
//     FROM
//         DENTIST D
//     JOIN
//         CLINIC C ON D.CLINIC = C.CLINIC_ID
//     LEFT JOIN
//         DENTIST_SCHEDULE SCH ON D.DENTIST_ID = SCH.DENTIST_ID
//     GROUP BY
//         D.DENTIST_ID;
// END

// DELIMITER ;
    
let sql = `call sp_getDentistAndClinicInfo()`;

db.query(sql, function(err, dentistList) {
    if (err) {
        return next(err);
    }
    // Process the result to convert comma-separated values into arrays
    // dentistList = dentistList.map(dentist => {
    //     return {
    //         ...dentist,
    //         SCHEDULE_WEEKDAYS: dentist.SCHEDULE_WEEKDAYS ? dentist.SCHEDULE_WEEKDAYS.split(',') : [],
    //         SCHEDULE_SHIFTS: dentist.SCHEDULE_SHIFTS ? dentist.SCHEDULE_SHIFTS.split(',') : []
    //     };
    // });
    console.log(dentistList);
    res.render('dentistList', { dentistList: dentistList });
});
};

Dentist.dentistDetail = function(req, res, next) { 
    const dentistID = req.params.id;

    // CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getDentistAndClinicInfo`()
    // BEGIN
    //     -- Select FULL_NAME from DENTIST table and CLINIC_ADDRESS from CLINIC table based on given CLINIC_ID
    //     SELECT
    //         D.*,
    //         SCH.*
    //     FROM
    //         DENTIST D
    //     JOIN
    //         DENTIST_SCHEDULE SCH ON D.DENTIST_ID = SCH.DENTIST_ID;
        
    // END
        
        let sql= `call sp_getDentistAndClinicInfoDetail('${dentistID}')`;
        let sql2= `call findDentistScheduleGrouped('${dentistID}')`;
        
        db.query(sql, function(err, dentistDetail) {
            if (err) {
                return next(err);
            }
            db.query(sql2, function(err, dentistDetail2) {
                if (err) {
                    return next(err);
                }
                console.log(dentistDetail2);
            res.render('dentistDetail', { dentistDetail: dentistDetail[0],  dentistDetail2: dentistDetail2[0]});
        });
        });
    };

Dentist.detail = function(req, res, next) {

    // Tách ở đâyyy
    const human = req.params.id;
    const firstThreeLettersSubstring = human.substring(0, 3);
    console.log(firstThreeLettersSubstring);
    if(firstThreeLettersSubstring == "DEN"){
        res.redirect(`/dentistDetail/${human}`);
    }
    if(firstThreeLettersSubstring == "STA"){

    // USE `adb_nhakhoa`; -- Replace with your actual database name
    // DELIMITER $$
    
    // CREATE PROCEDURE sp_getStaffById(IN staff_id_param VARCHAR(9))
    // BEGIN
    //     -- Select staff information from the STAFF table based on the provided STAFF_ID
    //     SELECT *
    //     FROM STAFF
    //     WHERE STAFF_ID = staff_id_param; 
    // END $$
    
    // DELIMITER ;
    let sql = `CALL sp_getStaffById('${human}')`;
    
    
    db.query(sql, function(err, staffDetail) {
        if (err) {
            return next(err);
        }
        res.render('staffDetail', { staffDetail: staffDetail[0] });
    });
}
else{
    res.redirect(`/patientProfile/${human}`);
}
};

module.exports = Dentist;