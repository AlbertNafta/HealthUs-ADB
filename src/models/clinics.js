const db = require("./db");

const Clinic = function(clinic){
    this.clinic_id = clinic.clinic_id;
    this.clinic_address = clinic.clinic_address;
};

Clinic.getAll = function (req, res, next) {
    db.query("Select * from CLINIC;", function (err, data) {
        if(err) {
          return next(err)
        }
        res.render('bookAppointment', { clinics: data })
    });
};

module.exports = Clinic;