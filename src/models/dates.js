const db = require("./db");

const DateAppointment = function(date){
    this.dentist_id = date.dentist_id;
    this.schedule_weekday = date.schedule_weekday;
    this.shift = date.shift;
};

DateAppointment.getAll = function (result) {
    db.query("Select * from SCHEDULE limit 20", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          console.log('Schedule : ', res);
          result(null, res);
        }
    });
};

module.exports = DateAppointment;