const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// router.get('/me', authController.login);
router.post('/login', authController.login);
router.get('/login/:username', authController.verify);
router.delete('/logout', authController.logout);
router.use(authController.checkAuth);
module.exports = router;
