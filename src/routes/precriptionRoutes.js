const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { checkPatientRole } = require('../middleware/authentication');

router.get('/precriptionList/:id', checkPatientRole, prescriptionController.prescriptionList);
router.get('/prescription/:id',checkPatientRole,  prescriptionController.prescriptionDetail);
router.get('/prescriptionList_ALL/:id',checkPatientRole,  prescriptionController.prescriptionList_ALL);



module.exports = router;