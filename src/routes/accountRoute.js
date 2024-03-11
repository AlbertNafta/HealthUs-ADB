const accountController = require('../controllers/accountController');

const express = require('express');
const router = express.Router();

router.get('/account', accountController.findAll);
router.get('/account/:username', accountController.findOne);
router.patch('/account/:username', accountController.update);
router.delete('/account/:username', accountController.delete);


router.post('/signup', accountController.create);

module.exports = router;


