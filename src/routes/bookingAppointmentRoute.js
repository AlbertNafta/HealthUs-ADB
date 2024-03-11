const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestController');

router.get("/", requestController.processBooking)
router.post("/bookDentist", requestController.showDentist);    
router.post("/bookOK", requestController.writeDownTreatment)

module.exports = router;