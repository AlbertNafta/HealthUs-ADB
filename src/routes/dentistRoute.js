const express = require('express');
const router = express.Router();
const dentistController = require('../controllers/dentistController');
const { checkPatientRole } = require('../middleware/authentication');


    router.get('/dentistList',checkPatientRole, dentistController.dentistList);
    router.get('/dentistDetail/:id',checkPatientRole, dentistController.dentistDetail);

    router.get('/staffList', checkPatientRole,dentistController.staffList);
    router.get('/staffDetail/:id',checkPatientRole, dentistController.staffDetail);
    router.get('/detail/:id', dentistController.detail);

    router.get('/navSystemMag', checkPatientRole,dentistController.navSystemMag);
 



module.exports = router;