const express = require('express');
const router = express.Router();
const treatmentController = require('../controllers/treatmentController');
const { checkPatientRole } = require('../middleware/authentication');


router.get('/treatListperPatient/:id',checkPatientRole, treatmentController.treatListperPatient);
router.get('/treatment/:id',checkPatientRole,  treatmentController.treatmentDetail);
router.get('/unPaidTreatment/:id', checkPatientRole, treatmentController.unPaidTreatment);


module.exports = router;