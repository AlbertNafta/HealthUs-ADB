const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { checkPatientRole } = require('../middleware/authentication');

router.get('/invoiceList/:id', checkPatientRole, invoiceController.invoiceList);
router.get('/invoiceDetail/:id',checkPatientRole,  invoiceController.invoiceDetail);



module.exports = router;