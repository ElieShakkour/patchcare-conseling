
const express = require('express');
const authenticateToken = require('./middleware');
const{ medicalRecordController,getUserMedicalRecordController } = require('../controllers/medicalRecordController');



const router = express.Router();
router.post("/medicalrecord",authenticateToken, medicalRecordController);
router.get("/medicalrecord/usermedicalrecord",authenticateToken, getUserMedicalRecordController);
module.exports = router;

