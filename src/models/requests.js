const db = require("./db");

const Request = function(request){
    this.request_id = request.request_id;
    this.patient_id = request.patient_id;
    this.send_date = request.send_date;
    this.wish_date = request.wish_date;
    this.notes = request.notes;
};

Request.newRequest = function (req, res, next) {
    let today = new Date()
    let today_date = today.getDate()
    let today_month = today.getMonth()
    let today_year = today.getFullYear()
    let currentDate = today_year + '-' + today_month + '-' + today_date
    
    db.query("call sp_insert_request(?,?,?)", [req.session.username, currentDate, req.session.appointment_date],
    function(err, data) {
        if (err) {
            return next(err);
        }
       
    });
    console.log("appoint");
}

module.exports = Request