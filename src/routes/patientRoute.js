const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { checkPatientRole } = require('../middleware/authentication');

router.get('/patientAdd', (req, res) =>{
    res.render('patientAdd')
})
router.post('/patientAdd',checkPatientRole, patientController.addPatient);
router.get('/patientProfile/:id',  patientController.listPatientPro);
router.post('/patientProfile/:id',checkPatientRole, patientController.updatePatient);
router.get('/patientList', checkPatientRole, patientController.listPatient);
router.get('/patientSearch',checkPatientRole,  patientController.searchPatient);

module.exports = router; 