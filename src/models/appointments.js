const db = require("../models/db.js");

const Appointment = function (appointment) {
  this.appointment_id = appointment.APPOINTMENT_ID;
  this.treatment_id = appointment.treatment_id;
  this.appointment_date = appointment.appointment_date;
  this.appointment_shift = appointment.appointment_shift;
  this.appointment_status = appointment.appointment_status;
};

Appointment.appointList = function (req, res, next) {
  const treatment_id = req.params.id;
  //     USE `adb_nhakhoa`;
  // DELIMITER $$

  // CREATE PROCEDURE sp_findAppointmentsByTreatmentID(
  //     IN treatment_id_param VARCHAR(9)
  // )
  // BEGIN
  //     -- Select appointments from APPOINTMENT table based on given TREATMENT_ID
  //     SELECT *
  //     FROM APPOINTMENT

  //     WHERE TREATMENT_ID = treatment_id_param;
  // END $$

  // DELIMITER ;

  let sql = "CALL sp_findAppointmentsByTreatmentID(?)";

  db.query(sql, [treatment_id], function (err, appointList) {
    if (err) {
      return next(err);
    }
    res.render("appointList", { appointList: appointList[0] });
  });
};

Appointment.appointListAll = function (req, res, next) {
  if (req.query.full_name) {
    let sql = "CALL sp_getAllAppointments_byName(?)";
    const full_name = req.query.full_name;
    console.log(full_name);
    db.query(sql, [full_name], function (err, data) {
      if (err) {
        return next(err);
      }
      res.render("appointListAll", { appointListAll: data[0] });
    });
  } else if (req.query.address) {
    let sql = "CALL sp_getAllAppointments_byAddress(?)";

    const address = req.query.address;
    console.log(address);
    db.query(sql, [address], function (err, data) {
      if (err) {
        return next(err);
      }
      res.render("appointListAll", { appointListAll: data[0] });
    });
  } else if (req.query.dentist) {
    let sql = "CALL sp_getAllAppointments_byDentist(?)";

    const dentist = req.query.dentist;
    db.query(sql, [dentist], function (err, data) {
      if (err) {
        return next(err);
      }
      res.render("appointListAll", { appointListAll: data[0] });
    });
  } else {
    db.query("CALL sp_getAllAppointments()", function (err, data) {
      if (err) {
        return next(err);
      }
      res.render("appointListAll", { appointListAll: data[0] });
    });
  }
};

Appointment.appointmentistory = function (req, res, next) {
  db.query("CALL sp_getAllAppointments()", function (err, data) {
    if (err) {
      return next(err);
    }
    res.render("appointListAll", { appointListAll: data[0] });
  });
};

Appointment.appointAdd = function (req, res, next) {

  const treatment_id = req.params.id;
  



  let sql = `CALL sp_treatmentDetail('${treatment_id}')`;
  
  
  db.query(sql, function(err, treatmentDetail) {
      if (err) {
          return next(err);
      }
      res.render('appointmentAdd', { treatmentDetail: treatmentDetail[0] });
  });
};

Appointment.appointmentDetail = function (req, res, next) {
  //   CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_findAppointmentByID`(
  //     IN treatment_id_param VARCHAR(9),
  //     IN appointment_id_param VARCHAR(9)
  // )
  // BEGIN
  //     -- Select appointment from APPOINTMENT table based on given TREATMENT_ID and APPOINTMENT_ID
  //     SELECT *
  //     FROM APPOINTMENT
  //     WHERE TREATMENT_ID = treatment_id_param AND APPOINTMENT_ID = appointment_id_param;
  //     -- Select treatment details based on given TREATMENT_ID
  //     SELECT *
  //     FROM TREATMENT
  //     WHERE TREATMENT_ID = treatment_id_param;
  // END

  //   USE `adb_nhakhoa`;
  //   DELIMITER $$

  //   CREATE PROCEDURE sp_findPrescriptionDetails(
  //       IN treatment_id_param VARCHAR(9),
  //       IN appointment_id_param VARCHAR(9)
  //   )
  //   BEGIN
  //       DECLARE prescription_id_var VARCHAR(9);

  //       -- Find prescription_id based on treatment_id and appointment_id
  //       SELECT PRESCRIPTION_ID
  //       INTO prescription_id_var
  //       FROM PRESCRIPTION
  //       WHERE TREATMENT_ID = treatment_id_param
  //         AND APPOINTMENT_ID = appointment_id_param
  //       LIMIT 1;

  //       -- Check if prescription_id is not null
  //       IF prescription_id_var IS NOT NULL THEN
  //           -- Select details from MEDICINE_IN_PRESCRIPTION and join with MEDICINE table
  //           SELECT MIP.*, M.NAME AS MEDICINE_NAME, M.DESCRIPTION AS MEDICINE_DESCRIPTION
  //           FROM MEDICINE_IN_PRESCRIPTION MIP
  //           JOIN MEDICINE M ON MIP.MEDICINE_ID = M.MEDICINE_ID
  //           WHERE MIP.PRESCRIPTION_ID = prescription_id_var;
  //       ELSE
  //           -- If prescription_id is null, return a message or handle as needed
  //           SELECT 'No prescription found for the given treatment and appointment.' AS Message;
  //       END IF;
  //   END $$

  //   DELIMITER ;

  const treatment_id = req.params.treatment_id;
  const appointment_id = req.params.appointment_id;

  let sqlAppointment = "CALL sp_findAppointmentByID(?, ?)";
  let sqlPrescription = "CALL sp_findPrescriptionDetails(?, ?)";

  db.query(
    sqlAppointment,
    [treatment_id, appointment_id],
    function (err, appointmentDetail) {
      if (err) {
        return next(err);
      }
      db.query(
        sqlPrescription,
        [treatment_id, appointment_id],
        function (err, prescriptionResult) {
          if (err) {
            return next(err);
          }
          res.render("appointmentDetail", {
            appointmentDetail: appointmentDetail[0],
            appointmentDetail1: appointmentDetail[1],
            prescriptionResult: prescriptionResult[0],
          });
        }
      );
    }
  );
};

module.exports = Appointment;

Appointment.navAppointmentMag = function (req, res, next) {
  // No need for a database query in this case
  res.render("navAppointmentMag");
};

Appointment.requestList = function (req, res, next) {
  db.query("CALL sp_getRequest()", function (err, data) {
    if (err) {
      return next(err);
    }
    res.render("tableRequest", { requestList: data[0] });
  });
};

Appointment.appointAddMore = function (req, res, next) {
  console.log(req.body);
  const treat = req.body.TREATMENT_ID;
  const dateTreat = req.body.dob;
  const shift = req.body.gender;
  const note = req.body.allergies
  db.query("CALL sp_addAppointmentPatient(?,?,?,?)",[treat,dateTreat,shift,note], function (err, data) {
    if (err) {
      return next(err);
    }
    res.redirect("/appointmentList/" + treat);
  });
};

function concatenateStrings(str1, str2) {
  return str1 + " " + str2;
}

Appointment.updateAppoint = function (req, res, next) {
  console.log(req.body);
  const treatment_id = req.params.treatment_id;
  const appointment_id = req.params.appointment_id;
  const NOTES = req.body.NOTES;
  const APPOINTMENT_DATE = req.body.APPOINTMENT_DATE;
  const APPOINTMENT_SHIFT = req.body.APPOINTMENT_SHIFT;
  const inputGroupSelect01 = req.body.inputGroupSelect01;
  const inputGroupSelect02 = req.body.inputGroupSelect02;
  let PRESCRIPTION_ID;
  if (req.body.PRESCRIPTION_ID) {
    if (req.body.PRESCRIPTION_ID.length == 9)
      PRESCRIPTION_ID = req.body.PRESCRIPTION_ID;
    else {
      PRESCRIPTION_ID = req.body.PRESCRIPTION_ID[0];
      console.log(req.body.PRESCRIPTION_ID.length);
    }
  } else {
    PRESCRIPTION_ID = "PRE000000";
  }
  console.log(PRESCRIPTION_ID);
  const DESCRIPTION = concatenateStrings(
    inputGroupSelect01,
    inputGroupSelect02
  );

  // Assuming you have an array of medicine data, replace this with your actual array
  const medicineDataArray = [];

  // Iterate through keys and construct the array
  for (let i = 0; req.body[`MEDICINE_NAME${i}`] !== undefined; i++) {
    console.log(req.body[`MEDICINE_NAME${i}`]);
    const medicineData = {
      medicine_name: req.body[`MEDICINE_NAME${i}`],
      new_quantity: req.body[`QUANTITY${i}`],
      medicine_id: req.body[`MEDICINE_ID${i}`] || null,
    };
    medicineDataArray.push(medicineData);
  }
  console.log(medicineDataArray);
  console.log(medicineDataArray.length);
  let sqlPres ="";
  if (req.body.fix === "0" || req.body.fix === null){
     sqlPres = "call sp_dentist_prescribe(?,?)"
  }
  else if (req.body.fix === "1"){
     sqlPres = "call sp_dentist_prescribe_fix(?,?)"
  }

  // Call the first stored procedure
  if (PRESCRIPTION_ID != "PRE000000") {
    var sql1 = "call sp_updateAppointmentAndTreatmentDetails(?,?,?,?,?,?)";
    db.query(
      sql1,
      [
        appointment_id,
        treatment_id,
        APPOINTMENT_DATE,
        APPOINTMENT_SHIFT,
        DESCRIPTION,
        NOTES,
      ],
      function (err1, patientData1) {
        if (err1) {
          return next(err1);
        }

        // Iterate over the array and call the second stored procedure for each entry
        for (const medicineData of medicineDataArray) {
          var sql2 = "call sp_updateMedicineInPrescription(?,?,?,?,?,?)";
          console.log("Med");
          console.log(medicineData.medicine_name);
          console.log(PRESCRIPTION_ID);
          db.query(
            sql2,
            [
              medicineData.medicine_name,
              PRESCRIPTION_ID,
              medicineData.new_quantity,
              treatment_id,
              appointment_id,
              medicineData.medicine_id,
            ],
            function (err2, patientData2) {
              if (err2) {
                return next(err2);
              }
              db.query(
                sqlPres,
                [
                  medicineData.medicine_name,
                  medicineData.new_quantity
                ],
                function (err2, patientData2) {
                  if (err2) {
                    return next(err2);
                  }}
              );
              // Continue or handle the result if needed
            }
            
          );
        }

        // Both stored procedures executed successfully
        res.redirect("#");
      }
    );

  } else {
    var sql1 = "call sp_updateAppointmentAndTreatmentDetails(?,?,?,?,?,?)";
    db.query(
      sql1,
      [
        appointment_id,
        treatment_id,
        APPOINTMENT_DATE,
        APPOINTMENT_SHIFT,
        DESCRIPTION,
        NOTES,
      ],
      function (err1, patientData1) {
        if (err1) {
          return next(err1);
        }

        // Iterate over the array and call the second stored procedure for each entry
        for (const medicineData of medicineDataArray) {
          var sql2 = "call sp_updateMedicineInPrescriptionAdd(?,?,?,?,?)";
          console.log("Med22");
          var sql3 = "CALL generatePrescriptionID(@newPrescriptionID)";
          let NewPrescriptionID;
          db.query(sql3, (error, results, fields) => {
            if (error) {
              console.error(error);
              throw error;
            }

            // Assuming that the stored procedure sets the newPrescriptionID in a session variable
            var sql4 = "SELECT @newPrescriptionID AS newPrescriptionID";
            db.query(sql4, (error, results, fields) => {
              if (error) {
                console.error(error);
                throw error;
              }

              const newPrescriptionID = results[0].newPrescriptionID;
              console.log("New Prescription ID:", newPrescriptionID);
              NewPrescriptionID = newPrescriptionID;
              // Continue with the rest of your code or handle the newPrescriptionID as needed
           
            db.query(
              sql2,
              [
                  medicineData.medicine_name,
                  newPrescriptionID,
                  medicineData.new_quantity,
                  treatment_id,
                  appointment_id,
              ],
              function (err2, patientData2) {
                  if (err2) {
                      return next(err2);
                  }
                  // Continue or handle the result if needed
              }
          ); 
        });
          });
        }

        // Both stored procedures executed successfully
        res.redirect("#");
      }
    );
  }
};

module.exports = Appointment;
