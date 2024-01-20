const express = require('express');
const authenticateToken = require('./middleware');
const{getVolunteerInfoController,therapistInfoController,therapistInfoBySpecialityController,recommendedTherapistInfo } = require('../controllers/volunteerController');
const router = express.Router();
router.get("/volunteers/volunteerInfo",authenticateToken,getVolunteerInfoController);
router.get("/volunteers/therapists",authenticateToken,therapistInfoController);
router.get("/volunteers/therapists/filtered",authenticateToken,therapistInfoBySpecialityController);
router.get("/volunteers/therapists/recommended",authenticateToken,recommendedTherapistInfo);
module.exports = router;