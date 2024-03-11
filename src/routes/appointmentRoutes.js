const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { checkPatientRole } = require('../middleware/authentication');

    router.get('/appointmentList/:id',checkPatientRole,  appointmentController.appointList);
    router.get('/appointmentDetail/:treatment_id/:appointment_id',checkPatientRole,  appointmentController.appointmentDetail);
    router.get('/appointListAll', checkPatientRole, appointmentController.appointListAll);
    router.get('/navAppointmentMag', checkPatientRole, appointmentController.navAppointmentMag);
    router.get('/requestList', checkPatientRole, appointmentController.requestList);
    router.post('/appointmentDetail/:treatment_id/:appointment_id', checkPatientRole, appointmentController.updateAppoint);
    router.get('/appointmentistory/:id',checkPatientRole,  appointmentController.appointmentistory);
    router.get('/appointAdd/:id', checkPatientRole, appointmentController.appointAdd);
    router.post('/appointAdd', checkPatientRole, appointmentController.appointAddMore);
    router.get('/appointListAllSta', checkPatientRole, appointmentController.appointListAllSta);
    router.post('/appointListAllSta', checkPatientRole, appointmentController.appointListAllSta);









 
module.exports = router; 